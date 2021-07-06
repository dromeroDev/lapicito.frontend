import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LapicitoService } from 'src/app/core/services/lapicito.service';

@Component({
  selector: 'app-lapicito',
  templateUrl: './lapicito.component.html',
  styleUrls: ['./lapicito.component.scss'],
})
export class LapicitoComponent implements OnInit {
  form: FormGroup;
  @Input() idReceptor: number;

  constructor(
    private activeModal: NgbActiveModal,
    private lapicitoService: LapicitoService
  ) {}

  ngOnInit(): void {
    this.formBuild();
  }

  formBuild() {
    this.form = new FormGroup({
      lapicitos: new FormControl(0, [Validators.required, Validators.min(1)]),
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
    };
    this.lapicitoService.donar(body).subscribe((res) => {
      window.location.href = res['mensaje'];
    });
  }
}
