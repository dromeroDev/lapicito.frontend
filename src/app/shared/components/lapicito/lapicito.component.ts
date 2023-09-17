import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LapicitoService } from 'src/app/core/services/lapicito.service';

@Component({
  selector: 'app-lapicito',
  templateUrl: './lapicito.component.html',
  styleUrls: ['./lapicito.component.scss'],
})
export class LapicitoComponent implements OnInit {
  form: UntypedFormGroup;
  @Input() idReceptor: number;

  constructor(
    private activeModal: NgbActiveModal,
    private lapicitoService: LapicitoService
  ) {}

  ngOnInit(): void {
    this.formBuild();
  }

  formBuild() {
    this.form = new UntypedFormGroup({
      lapicitos: new UntypedFormControl(0, [Validators.required, Validators.min(1)]),
      comentario: new UntypedFormControl('', [Validators.required]),
    });
  }

  close() {
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  donar() {
    const body = {
      cantidadLapicitos: this.form.controls.lapicitos.value,
      id_Receptor: this.idReceptor,
      id_donador: localStorage.getItem('id_usuario'),
      comentario: this.form.controls.comentario.value,
    };
    this.lapicitoService.donar(body).subscribe((res) => {
      window.location.href = res['mensaje'];
    });
  }
}
