import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  modo: string = 'light';

  constructor() {}

  ngOnInit(): void {
    const btnSwitch = document.querySelector('#switch');

    btnSwitch.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        this.modo = 'dark';
      } else {
        this.modo = 'light';
      }
      btnSwitch.classList.toggle('active');
    });
  }

  getImageLogo() {
    return this.modo === 'light'
      ? 'assets/images/logo_green.png'
      : 'assets/images/logo_green_dark.png';
  }
}
