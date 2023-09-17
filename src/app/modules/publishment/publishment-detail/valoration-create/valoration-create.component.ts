import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPublicacion } from 'src/app/core/models/publicacion';
import { PublishmentService } from 'src/app/core/services/publishment.service';

@Component({
  selector: 'app-valoration-create',
  templateUrl: './valoration-create.component.html',
  styleUrls: ['./valoration-create.component.scss'],
})
export class ValorationCreateComponent implements OnInit {
  form: UntypedFormGroup;
  @Input() publishment: IPublicacion;
  stars = [
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
  ];
  starsSelected: number;

  constructor(
    private activeModal: NgbActiveModal,
    private publishmentService: PublishmentService
  ) {}

  ngOnInit(): void {
    this.formBuild();
  }

  formBuild() {
    this.form = new UntypedFormGroup({
      comentario: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });
  }

  close() {
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  hoverStarIn(star) {
    if (!this.starsSelected || this.starsSelected < star.id) star.active = true;
  }

  hoverStarOut(star) {
    if (!this.starsSelected || this.starsSelected < star.id)
      star.active = false;
  }

  selectStars(starSelected) {
    this.stars.forEach((star) => {
      if (star.id <= starSelected.id) {
        star.active = true;
      } else {
        star.active = false;
      }
    });
    this.starsSelected = starSelected.id;
  }

  save() {
    const body = {
      cantidad_estrellas: this.starsSelected,
      comentario: this.form.controls.comentario.value,
      id_publicacion: this.publishment.idPublicacion,
      id_usuario: localStorage.getItem('id_usuario'),
    };

    this.publishmentService.valorarPublicacion(body).subscribe((res) => {
      console.log(res);
      this.close();
    });
  }
}
