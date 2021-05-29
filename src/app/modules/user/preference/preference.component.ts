import { Component, OnInit } from '@angular/core';
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

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.getAll().subscribe((data) => {
      this.categorias = data;
    });
  }

  existInArray(categoriaSelected: ICategoria) {
    return this.categoriasSeleccionadas.findIndex((categoria) => {
      return categoria.idCategoria === categoriaSelected.idCategoria;
    });
  }

  seleccionarCategoria(categoria: ICategoria) {
    const indexSelected = this.existInArray(categoria);

    if (indexSelected >= 0) {
      this.categoriasSeleccionadas.splice(indexSelected, 1);
    } else {
      this.categoriasSeleccionadas.push(categoria);
    }
  }

  save() {
    const body = {
      categorias: this.categoriasSeleccionadas,
      id_usuario: localStorage.getItem('id_usuario'),
    };

    this.categoriaService.saveByUser(body).subscribe((res) => {});
  }
}
