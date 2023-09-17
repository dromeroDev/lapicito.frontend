import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IUsuario } from 'src/app/core/models/usuario';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
  form: UntypedFormGroup;
  @Input() public user: IUsuario;

  constructor(
    private activeModal: NgbActiveModal,
    private serviceUsuario: UserService
  ) {}

  ngOnInit(): void {
    this.formBuild();
  }

  formBuild() {
    this.form = new UntypedFormGroup({
      nombre: new UntypedFormControl(this.user.nombre, [Validators.required]),
      apellido: new UntypedFormControl(this.user.apellido, [Validators.required]),
      userName: new UntypedFormControl(this.user.userName, [Validators.required]),
      email: new UntypedFormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      telefono: new UntypedFormControl(this.user.telefono),
    });
  }

  close() {
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  save() {
    const body = {
      apellido: this.form.controls.apellido.value,
      email: this.form.controls.email.value,
      nombre: this.form.controls.nombre.value,
      telefono: this.form.controls.telefono.value,
      userName: this.form.controls.userName.value,
    };
    this.serviceUsuario.savePerfil(body, this.user.id).subscribe(
      (res) => {
        console.log(res);
        this.close();
      },
      (err) => {
        alert(err.mensaje);
      }
    );
  }
}
