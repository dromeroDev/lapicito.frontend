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

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
    private authService: SocialAuthService,
    private userService: UserService
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
    const body = {
      userName: this.form.get('userName').value,
      password: this.form.get('password').value,
    };
    this.userService.login(body).subscribe((res) => {
      localStorage.setItem('token', res['token']);
      localStorage.setItem('id_usuario', res['id_usuario']);
      this.close();
      this.router.navigate(['/preference']);
    });
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
