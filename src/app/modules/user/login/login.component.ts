import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

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

  constructor(private activeModal: NgbActiveModal, private router: Router, private authService: SocialAuthService) {}

  ngOnInit(): void {
    this.formBuild();
    this.authService.authState.subscribe(
    data =>{
      this.userLogged = data;
      this.isLogged = (this.userLogged != null);
    });
  }

  formBuild() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  close() {
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.dismiss();
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data=>{
        this.socialUser = data;
        this.isLogged = true;
        this.router.navigate(['/feed']);
      }
    );
    this.close();
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data =>{
        this.socialUser = data;
        this.isLogged = true;
        this.router.navigate(['/feed']);
      }
    );
    this.close();
  }

  logOut(): void{
    this.authService.signOut();
  }
}
