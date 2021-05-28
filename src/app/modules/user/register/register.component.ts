import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUsuarioNuevo } from 'src/app/core/models/usuario-nuevo';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      reemail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  createUserNew() {
    let userNew: IUsuarioNuevo = {
      nombre: this.form.get('nombre').value,
      apellido: this.form.get('apellido').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      roles: [],
      userName: this.form
        .get('email')
        .value.substring(0, this.form.get('email').value.indexOf('@')),
    };

    return userNew;
  }

  register() {
    const body = this.createUserNew();
    this.userService.register(body).subscribe((res) => {
      alert('usuario creado');
    });
  }
}
