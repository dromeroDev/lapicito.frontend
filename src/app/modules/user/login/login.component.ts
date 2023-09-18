import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IUsuario } from 'src/app/core/models/usuario';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  isLogged: boolean;
  msjError: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService //public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.formBuild();
  }

  formBuild() {
    this.form = new UntypedFormGroup({
      userName: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', Validators.required),
    });
  }

  close() {
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  login() {
    this.msjError = false;
    const body = {
      userName: this.form.get('userName').value,
      password: this.form.get('password').value,
    };
    this.userService.login(body).subscribe(
      (res) => {
        localStorage.setItem('token', res['token']);
        localStorage.setItem('id_usuario', res['id_usuario']);
        this.userService
          .getDatosPerfil(res['id_usuario'])
          .subscribe((data: IUsuario) => {
            this.storageService.setItem('usuario', JSON.stringify(data));

            this.close();
            this.router.navigate(['/preference']);
            /* if (res['tieneCategorias']) {
              this.router.navigate(['/feed']);
            } else {
              this.router.navigate(['/preference']);
            } */
          });
      },
      (error) => {
        //this.toastService.show('I am a standard toast');
        this.msjError = true;
      }
    );
  }
}
