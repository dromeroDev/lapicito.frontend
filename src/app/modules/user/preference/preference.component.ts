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

  seleccionarCategoria(categoria: ICategoria) {
    this.categoriasSeleccionadas.push(categoria);
    console.log(this.categoriasSeleccionadas);
  }
}
