import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/core/models/usuario';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  modo: string = 'light';
  userLogged: IUsuario;

  isLogged: boolean;

  constructor(
    public userStoreService: UserStoreService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.storageService.watchStorage().subscribe((data: string) => {
      this.userLogged = JSON.parse(localStorage.getItem('usuario'));
    });
    const user = localStorage.getItem('usuario');
    if (user) {
      this.storageService.emitChange();
    }
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
      ? 'assets/images/logo_new2.svg'
      : 'assets/images/logo_green_dark.png';
  }

  openLogin() {
    this.isLogged = true;
    this.userStoreService.openLogin();
  }

  logOut(): void {
    this.router.navigateByUrl('home');
  }
}
