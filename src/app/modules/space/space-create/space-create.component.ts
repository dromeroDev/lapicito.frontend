import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategoria } from 'src/app/core/models/categoria';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { SpaceService } from 'src/app/core/services/space.service';

@Component({
  selector: 'app-space-create',
  templateUrl: './space-create.component.html',
  styleUrls: ['./space-create.component.scss'],
})
export class SpaceCreateComponent implements OnInit {
  selectedFile = null;
  form: FormGroup;
  filePath: string;
  categorias: ICategoria[];

  constructor(
    private activeModal: NgbActiveModal,
    private spaceService: SpaceService,
    private categoryService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      img: new FormControl(null),
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.maxLength(600),
      ]),
      categoria: new FormControl('', Validators.required),
    });

    this.categoryService.getAll().subscribe((res) => {
      this.categorias = res;
    });
  }

  close() {
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      img: file,
    });

    this.form.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  save() {
    const data: FormData = new FormData();
    data.append('portada_file', this.selectedFile);
    data.append('titulo', this.form.controls.titulo.value);
    data.append('descripcion', this.form.controls.descripcion.value);
    data.append('id_categoria', this.form.controls.categoria.value);
    data.append('id_usuario', localStorage.getItem('id_usuario'));

    this.spaceService.save(data).subscribe((event) => {
      this.selectedFile = undefined;
      this.close();
    });
  }
}
