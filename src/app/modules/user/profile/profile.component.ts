import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/core/models/usuario';
import { UserService } from 'src/app/core/services/user.service';

const CLIENT_ID_LAPICITO = '2974784228505657';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUsuario;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userService.getDatosPerfil(params.id).subscribe((res) => {
        this.user = res;
      });
    });
  }

  showPublishmentDetail() {
    this.router.navigate(['/publishment/1']);
  }

  showSpaceDetail() {
    this.router.navigate(['/space/1']);
  }

  getUrlMP() {
    return (
      'https://auth.mercadopago.com.ar/authorization?client_id=' +
      CLIENT_ID_LAPICITO +
      '&response_type=code&platform_id=mp&redirect_uri=http://localhost:4200/callback'
    );
  }
}
