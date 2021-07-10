import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategoria } from 'src/app/core/models/categoria';
import { IEspacio } from 'src/app/core/models/espacio';
import { IPublicacion } from 'src/app/core/models/publicacion';
import { IItemRanking, IRanking } from 'src/app/core/models/ranking';
import { IUsuario } from 'src/app/core/models/usuario';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { PublishmentService } from 'src/app/core/services/publishment.service';
import { RankingService } from 'src/app/core/services/ranking.service';
import { SpaceService } from 'src/app/core/services/space.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  categorias: ICategoria[];
  categoriaSelected: ICategoria;
  publishments: IPublicacion[];
  spaces: IEspacio[];
  mySpaces: IEspacio[];
  searchType: string = 'publishment';
  searchValue: string;
  rankings: IRanking[] = [];

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private publishmentService: PublishmentService,
    private spaceService: SpaceService,
    private rankingService: RankingService
  ) {}

  ngOnInit(): void {
    this.getCategoriesByUser();
    this.getMySpaces();
  }

  showPublishmentDetail(id: number) {
    this.router.navigate(['/publishment/' + id]);
  }

  showSpaceDetail(id: number) {
    this.router.navigate(['/space/' + id]);
  }

  getCategoriesByUser() {
    const idUser = localStorage.getItem('id_usuario');
    this.categoriaService.getByUser(idUser).subscribe((res) => {
      this.categorias = res['categorias'];
      this.getPublishmentsByCategories();
      this.getRankings();
    });
  }

  getMySpaces() {
    this.spaceService
      .getSpacesByIdUser(localStorage.getItem('id_usuario'))
      .subscribe((res) => {
        this.mySpaces = res;
      });
  }

  getRankings() {
    const body = {
      categorias: this.getIdsCategorias(),
    };
    this.rankingService.getUsuariosMasDonados(body).subscribe((res) => {
      this.generateRankingUsuariosMasDonados(res);
      this.rankingService
        .getPublicacionesMasValoradas(body)
        .subscribe((res) => {
          this.generateRankingPublicacionesMasValoradas(res);
        });
    });
  }

  generateRankingUsuariosMasDonados(usuarios: IUsuario[]) {
    let ranking: IRanking = {
      title: 'Usuarios mas donados',
      items: [],
    };
    usuarios.forEach((usuario, index) => {
      let item: IItemRanking = {
        position: index,
        description: usuario.userName,
        value: usuario.cantidad_lapicitos,
      };
      ranking.items.push(item);
    });
    this.rankings.push(ranking);
  }

  generateRankingPublicacionesMasValoradas(publicaciones: IPublicacion[]) {
    let ranking: IRanking = {
      title: 'Publicaciones mas valoradas',
      items: [],
    };
    publicaciones.forEach((publicacion, index) => {
      let item: IItemRanking = {
        position: index + 1,
        description: publicacion.titulo,
        value: publicacion.valoracionDtoList.length,
      };
      ranking.items.push(item);
    });
    this.rankings.push(ranking);
  }

  getIdsCategorias() {
    const arrayIds = [];
    if (this.categoriaSelected) {
      arrayIds.push(this.categoriaSelected.idCategoria);
    } else {
      this.categorias.forEach((categoria) => {
        arrayIds.push(categoria.idCategoria);
      });
    }
    return arrayIds;
  }

  changeCategorySelected(categoriaSelected?: ICategoria) {
    if (this.searchType == 'publishment') {
      this.getPublishmentsByCategories(categoriaSelected);
    } else {
      this.getSpacesByCategories(categoriaSelected);
    }
  }

  getPublishmentsByCategories(categoriaSelected?: ICategoria) {
    this.spaces = null;
    this.categoriaSelected = categoriaSelected ? categoriaSelected : null;
    this.searchValue = '';
    const body = {
      categorias: this.getIdsCategorias(),
    };
    this.publishmentService.getPublishmentsByCategories(body).subscribe(
      (res) => {
        this.publishments = res;
      },
      (err) => {
        alert('No hay publicaciones para la categoria seleccionada');
        this.publishments = [];
      }
    );
  }

  getSpacesByCategories(categoriaSelected?: ICategoria) {
    this.publishments = null;
    this.categoriaSelected = categoriaSelected ? categoriaSelected : null;
    this.searchValue = '';
    const body = {
      categorias: this.getIdsCategorias(),
    };
    this.spaceService.getSpacesByCategories(body).subscribe(
      (res) => {
        this.spaces = res;
      },
      (err) => {
        alert('No hay espacios para la categoria seleccionada');
        this.spaces = [];
      }
    );
  }

  goToPreference() {
    this.router.navigateByUrl('preference');
  }

  isAdminSpace(idUser) {
    return idUser.toString() === localStorage.getItem('id_usuario');
  }

  search() {
    const body = {
      categorias: this.getIdsCategorias(),
    };
    if (this.searchType == 'publishment') {
      this.publishmentService
        .search(body, this.searchValue)
        .subscribe((res) => {
          this.publishments = res;
        }),
        (err) => {
          alert('No hay publicaciones para la categoria seleccionada');
          this.publishments = [];
        };
    } else if (this.searchType == 'space') {
      this.spaceService.search(body, this.searchValue).subscribe((res) => {
        this.spaces = res;
      }),
        (err) => {
          alert('No hay espacios para la categoria seleccionada');
          this.publishments = [];
        };
    }
  }
}
