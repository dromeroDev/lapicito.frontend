import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { IUsuario } from 'src/app/core/models/usuario';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean;
  msjError: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
    private authService: SocialAuthService,
    private userService: UserService,
    private storageService: StorageService //public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.formBuild();
    this.authService.authState.subscribe((data) => {
      this.userLogged = data;
      this.isLogged = this.userLogged != null;
    });
  }

  formBuild() {
    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
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
            if (res['tieneCategorias']) {
              this.router.navigate(['/feed']);
            } else {
              this.router.navigate(['/preference']);
            }
          });
      },
      (error) => {
        //this.toastService.show('I am a standard toast');
        this.msjError = true;
      }
    );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      this.socialUser = data;
      this.isLogged = true;
      this.router.navigate(['/feed']);
      this.close();
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      this.socialUser = data;
      this.isLogged = true;
      this.router.navigate(['/feed']);
      this.close();
    });
  }

  logOut(): void {
    this.authService.signOut();
  }
}
