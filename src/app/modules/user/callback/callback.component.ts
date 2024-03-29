import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

const CLIENT_SECRET_LAPICITO =
  'TEST-2974784228505657-061323-b4b54f78a886aeff45e6c9d9febdca07-49668766';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      const param = res;
      console.log(param.code);
      this.generarCredencialesMP(param.code);
    });
  }

  generarCredencialesMP(code) {
    /* const body = {
      client_id: '2974784228505657',
      client_secret: CLIENT_SECRET_LAPICITO,
      grant_type: 'authorization_code',
      code: code,
      test_token: true,
      redirect_uri: 'https://dromerodev.github.io/lapicito.frontend/callback',
    };
    this.userService.generarCredencialesMP(body).subscribe((res) => {
      console.log(res); */
    /* const body = {
        access_token: res['access_token'],
        idUsuario: localStorage.getItem('id_usuario'),
        live_mode: res['live_mode'],
        public_key: res['public_key'],
        refresh_token: res['refresh_token'],
        scope: res['scope'],
        token_type: res['token_type'],
        user_id: res['user_id'],
      }; */
    const body = {
      access_token:
        'TEST-2974784228505657-101223-08e76a12dbcc82a47df78dd75c129bd4-49668766',
      token_type: 'Bearer',
      expires_in: 15552000,
      scope: 'offline_access read write',
      user_id: 49668766,
      idUsuario: localStorage.getItem('id_usuario'),
      refresh_token: 'TG-6528bce0d077a9000188703c-49668766',
      public_key: 'TEST-8179540e-8f9f-4050-8236-7d965250046f',
    };
    this.userService.vincularMP(body).subscribe((res) => {
      this.router.navigateByUrl('/user/' + localStorage.getItem('id_usuario'));
    });
    //});
  }
}
