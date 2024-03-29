import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PublishmentService } from 'src/app/core/services/publishment.service';
import { SpaceService } from 'src/app/core/services/space.service';
import { SpaceCreateComponent } from '../../space/space-create/space-create.component';

@Component({
  selector: 'app-publishment-create',
  templateUrl: './publishment-create.component.html',
  styleUrls: ['./publishment-create.component.scss'],
})
export class PublishmentCreateComponent implements OnInit {
  step: number = 1;
  spaces: any[];
  spaceSelected: any;
  form: UntypedFormGroup;
  selectedFile = null;

  constructor(
    private spaceService: SpaceService,
    private publishmentService: PublishmentService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spaceService
      .getSpacesByIdUser(localStorage.getItem('id_usuario'))
      .subscribe((res) => {
        this.spaces = res;
      });
    this.formBuild();
  }

  formBuild() {
    this.form = new UntypedFormGroup({
      titulo: new UntypedFormControl('', Validators.required),
      descripcion: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
    });
  }

  showCreateSpace() {
    const options: NgbModalOptions = {
      animation: true,
      backdrop: 'static',
      size: 'lg',
    };
    const modalRef = this.modalService.open(SpaceCreateComponent, options);
    //modalRef.componentInstance.publishment = this.publishment;
    modalRef.closed.subscribe((res) => {
      this.spaceService
        .getSpacesByIdUser(localStorage.getItem('id_usuario'))
        .subscribe((res) => {
          this.spaces = res;
        });
    });
  }

  cleanForm() {
    this.form.controls.titulo.setValue('');
    this.form.controls.descripcion.setValue('');
    this.form.controls.file.setValue(null);
  }

  getTituloSpace() {
    const spaceFind = this.spaces.find((space) => {
      return space.viewEspacioDto.idEspacio.toString() === this.spaceSelected;
    });
    return spaceFind.viewEspacioDto.titulo;
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      if (!this.validateFileType(event.target.files[0])) {
        this.toastr.error('El tipo de archivo no es valido!');
        return;
      }

      if (!this.validateFileSize(event.target.files[0])) {
        this.toastr.error(
          'El archivo es demasiado grande. El tamaño máximo permitido es de 50 MB.'
        );
        return;
      }

      this.selectedFile = event.target.files[0];
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          file: reader.result,
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  validateFileType(file: File) {
    const allowedFileTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    return allowedFileTypes.includes(file.type);
  }

  validateFileSize(file: File) {
    return file.size <= 50 * 1024 * 1024;
  }

  save() {
    if (this.selectedFile) {
      const data: FormData = new FormData();
      data.append('publicacion_file', this.selectedFile);
      data.append('titulo', this.form.controls.titulo.value);
      data.append('descripcion', this.form.controls.descripcion.value);
      data.append('id_espacio', this.spaceSelected);
      data.append('id_usuario', localStorage.getItem('id_usuario'));

      this.publishmentService.save(data).subscribe((event) => {
        this.step = 3;
      });
    } else {
      this.toastr.error('Seleccione un archivo de tipo valido!');
    }
  }
}
