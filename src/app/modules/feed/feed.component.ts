import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategoria } from 'src/app/core/models/categoria';
import { IEspacio } from 'src/app/core/models/espacio';
import { IPublicacion } from 'src/app/core/models/publicacion';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { PublishmentService } from 'src/app/core/services/publishment.service';
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

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private publishmentService: PublishmentService,
    private spaceService: SpaceService
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
    });
  }

  getMySpaces() {
    this.spaceService
      .getSpacesByIdUser(localStorage.getItem('id_usuario'))
      .subscribe((res) => {
        this.mySpaces = res;
      });
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
    const body = {
      categorias: this.getIdsCategorias(),
    };
    this.spaceService.getSpacesByCategories(body).subscribe(
      (res) => {
        this.spaces = res;
      },
      (err) => {
        alert('No hay publicaciones para la categoria seleccionada');
        this.spaces = [];
      }
    );
  }

  goToPreference() {
    this.router.navigateByUrl('preference');
  }
}
