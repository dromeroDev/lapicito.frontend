import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  modo: string = 'light';
  userLogged: SocialUser;
  isLogged: boolean;

  constructor(
    private userStoreService: UserStoreService,
    private authService: SocialAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((data) => {
      this.userLogged = data;
      this.isLogged = this.userLogged != null;
    });
  }

  ngAfterViewInit() {
    const btnSwitch = document.querySelector('#switch');

    btnSwitch.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        this.modo = 'dark';
      } else {
        this.modo = 'light';
      }
      btnSwitch.classList.toggle('active-light');
    });
  }

  getImageLogo() {
    return this.modo === 'light'
      ? 'assets/images/logo_green.png'
      : 'assets/images/logo_green_dark.png';
  }

  openLogin() {
    this.userStoreService.openLogin();
  }

  logOut(): void {
    this.authService.signOut().then((data) => {
      this.router.navigate(['/home']);
    });
  }
}
