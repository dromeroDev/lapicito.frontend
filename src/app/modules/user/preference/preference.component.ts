import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategoria } from 'src/app/core/models/categoria';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss'],
})
export class PreferenceComponent implements OnInit {
  categorias: ICategoria[];
  categoriasSeleccionadas: ICategoria[] = [];

  constructor(
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    const idUser = localStorage.getItem('id_usuario');
    this.categoriaService.getAll().subscribe((data) => {
      this.categorias = data;
      this.categoriaService.getByUser(idUser).subscribe((res) => {
        res['categorias'].forEach((categoria) => {
          this.seleccionarCategoria(categoria);
        });
      });
    });
  }

  existInArray(categoriaSelected: ICategoria) {
    return this.categoriasSeleccionadas.findIndex((categoria) => {
      return categoria.idCategoria === categoriaSelected.idCategoria;
    });
  }

  changeCheckCategoria(categoria, checked) {
    const index = this.categorias.findIndex((cat) => {
      return cat.idCategoria === categoria.idCategoria;
    });
    this.categorias[index].checked = checked;
  }

  seleccionarCategoria(categoria: ICategoria) {
    const indexSelected = this.existInArray(categoria);

    if (indexSelected >= 0) {
      this.categoriasSeleccionadas.splice(indexSelected, 1);
      this.changeCheckCategoria(categoria, false);
    } else {
      this.categoriasSeleccionadas.push(categoria);
      this.changeCheckCategoria(categoria, true);
    }
  }

  save() {
    const body = {
      categorias: this.categoriasSeleccionadas,
      id_usuario: localStorage.getItem('id_usuario'),
    };

    this.categoriaService.saveByUser(body).subscribe((res) => {
      this.router.navigateByUrl('/feed');
    });
  }
}
