import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategoria } from 'src/app/core/models/categoria';
import { IPublicacion } from 'src/app/core/models/publicacion';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { PublishmentService } from 'src/app/core/services/publishment.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  categorias: ICategoria[];
  categoriaSelected: ICategoria;
  publishments: IPublicacion[];

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private publishmentService: PublishmentService
  ) {}

  ngOnInit(): void {
    this.getCategoriesByUser();
  }

  showSpaces() {
    this.router.navigate(['/space']);
  }

  showPublishmentDetail() {
    this.router.navigate(['/publishment/1']);
  }

  getCategoriesByUser() {
    const idUser = localStorage.getItem('id_usuario');
    this.categoriaService.getByUser(idUser).subscribe((res) => {
      this.categorias = res['categorias'];
      this.getPublishmentsByCategories();
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

  getPublishmentsByCategories(categoriaSelected?: ICategoria) {
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

  goToPreference() {
    this.router.navigateByUrl('preference');
  }
}
