import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuarioNuevo } from 'src/app/core/models/usuario-nuevo';
import { UserStoreService } from 'src/app/core/services/user-store.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      reemail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  // validatorReEmail(): ValidatorFn {
  //   return (FormGroup: f): { [key: string]: any } | null =>
  //   control.value?.toLowerCase() === 'blue'
  //       ? null : {wrongColor: control.value};
  // }

  createUserNew() {
    let userNew: IUsuarioNuevo = {
      nombre: this.form.get('nombre').value,
      apellido: this.form.get('apellido').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      roles: [],
      userName: this.form.get('userName').value,
    };

    return userNew;
  }

  validateEmail() {
    if (
      !this.form.get('reemail').getError('required') &&
      this.form.get('email').value !== this.form.get('reemail').value
    ) {
      this.form.controls.reemail.setErrors({ reemail: true });
    } else {
      this.form.controls.reemail.setErrors(null);
    }
  }

  validatePassword() {
    if (
      !this.form.get('repassword').getError('required') &&
      this.form.get('password').value !== this.form.get('repassword').value
    ) {
      this.form.controls.repassword.setErrors({ repassword: true });
    } else {
      this.form.controls.repassword.setErrors(null);
    }
  }

  register() {
    const body = this.createUserNew();
    this.userService.register(body).subscribe((res) => {
      const bodyLogin = {
        userName: this.form.get('userName').value,
        password: this.form.get('password').value,
      };
      this.userService.login(bodyLogin).subscribe((res) => {
        localStorage.setItem('token', res['token']);
        localStorage.setItem('id_usuario', res['id_usuario']);
        this.userService.getDatosPerfil(res['id_usuario']).subscribe((data) => {
          this.userStoreService.usuarioLogueado = data;
          if (res['tieneCategorias']) {
            this.router.navigate(['/feed']);
          } else {
            this.router.navigate(['/preference']);
          }
        });
      });
    });
  }
}
