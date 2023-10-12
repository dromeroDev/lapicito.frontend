import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ICategoria } from 'src/app/core/models/categoria';
import { IEspacio } from 'src/app/core/models/espacio';
import { IPublicacion } from 'src/app/core/models/publicacion';
import { IItemRanking, IRanking } from 'src/app/core/models/ranking';
import { IUsuario } from 'src/app/core/models/usuario';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { PublishmentService } from 'src/app/core/services/publishment.service';
import { RankingService } from 'src/app/core/services/ranking.service';
import { SpaceService } from 'src/app/core/services/space.service';
import { RankingTopComponent } from './ranking-top/ranking-top.component';

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
  showPublishment: number = 9;
  showSpaces: number = 9;
  msjSinResultados: boolean = false;

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private publishmentService: PublishmentService,
    private spaceService: SpaceService,
    private rankingService: RankingService,
    private modalService: NgbModal
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
          this.rankingService.getEspaciosMasSeguidos(body).subscribe((res) => {
            this.generateRankingEspaciosMasSeguidos(res);
            this.rankingService
              .getPublicacionesMasDescargadas(body)
              .subscribe((res) => {
                this.generateRankingPublicacionesMasDescargadas(res);
              });
          });
        });
    });
  }

  generateRankingUsuariosMasDonados(usuarios: IUsuario[]) {
    let ranking: IRanking = {
      title: 'Usuarios más donados',
      items: [],
    };
    usuarios.forEach((usuario, index) => {
      let item: IItemRanking = {
        position: index + 1,
        description: usuario.userName,
        value: usuario.cantidad_lapicitos,
        link: '/user/' + usuario.id,
      };
      ranking.items.push(item);
    });
    if (ranking.items.length > 0) {
      this.rankings.push(ranking);
    }
  }

  generateRankingPublicacionesMasValoradas(publicaciones: IPublicacion[]) {
    let ranking: IRanking = {
      title: 'Publicaciones más valoradas',
      items: [],
    };
    publicaciones.forEach((publicacion, index) => {
      let item: IItemRanking = {
        position: index + 1,
        description: publicacion.titulo,
        value: publicacion.valoracionDtoList.length,
        link: '/publishment/' + publicacion.idPublicacion,
      };
      ranking.items.push(item);
    });
    if (ranking.items.length > 0) {
      this.rankings.push(ranking);
    }
  }

  generateRankingEspaciosMasSeguidos(espacios: IEspacio[]) {
    let ranking: IRanking = {
      title: 'Espacios con más seguidores',
      items: [],
    };
    espacios.forEach((espacio, index) => {
      let item: IItemRanking = {
        position: index + 1,
        description: espacio.titulo,
        value: espacio.cantidadMiembrosEspacio,
        link: '/space/' + espacio.idEspacio,
      };
      ranking.items.push(item);
    });
    if (ranking.items.length > 0) {
      this.rankings.push(ranking);
    }
  }

  generateRankingPublicacionesMasDescargadas(publicaciones: IPublicacion[]) {
    let ranking: IRanking = {
      title: 'Publicaciones con más descargas',
      items: [],
    };
    publicaciones.forEach((publicacion, index) => {
      let item: IItemRanking = {
        position: index + 1,
        description: publicacion.titulo,
        value: publicacion.cantidadDeDescargas,
        link: '/publishment/' + publicacion.idPublicacion,
      };
      ranking.items.push(item);
    });
    if (ranking.items.length > 0) {
      this.rankings.push(ranking);
    }
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
      this.showPublishment = 9;
      this.getPublishmentsByCategories(categoriaSelected);
    } else {
      this.showSpaces = 9;
      this.getSpacesByCategories(categoriaSelected);
    }
  }

  getPublishmentsByCategories(categoriaSelected?: ICategoria) {
    this.spaces = null;
    this.categoriaSelected = categoriaSelected ? categoriaSelected : null;
    this.searchValue = '';
    this.showPublishment = 9;
    const body = {
      categorias: this.getIdsCategorias(),
    };
    this.publishmentService.getPublishmentsByCategories(body).subscribe(
      (res) => {
        this.publishments = res;
        this.msjSinResultados = false;
      },
      (err) => {
        this.msjSinResultados = true;
        this.publishments = null;
      }
    );
  }

  getSpacesByCategories(categoriaSelected?: ICategoria) {
    this.publishments = null;
    this.categoriaSelected = categoriaSelected ? categoriaSelected : null;
    this.searchValue = '';
    this.showSpaces = 9;
    const body = {
      categorias: this.getIdsCategorias(),
    };
    this.spaceService.getSpacesByCategories(body).subscribe(
      (res) => {
        this.spaces = res;
        this.msjSinResultados = false;
      },
      (err) => {
        this.msjSinResultados = true;
        this.spaces = null;
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
      this.showPublishment = 9;
      this.publishmentService
        .search(body, this.searchValue)
        .subscribe((res) => {
          this.publishments = res;
          this.msjSinResultados = false;
        }),
        (err) => {
          this.publishments = null;
          this.msjSinResultados = true;
        };
    } else if (this.searchType == 'space') {
      this.showSpaces = 9;
      this.spaceService.search(body, this.searchValue).subscribe((res) => {
        this.spaces = res;
        this.msjSinResultados = false;
      }),
        (err) => {
          this.spaces = null;
          this.msjSinResultados = true;
        };
    }
  }

  showMorePublishment() {
    this.showPublishment += 9;
  }

  showMoreSpaces() {
    this.showSpaces += 9;
  }

  openTop10(ranking) {
    const options: NgbModalOptions = {
      animation: true,
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(RankingTopComponent, options);
    modalRef.componentInstance.ranking = ranking;
  }
}
