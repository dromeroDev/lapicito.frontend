import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/core/models/usuario';
import { UserService } from 'src/app/core/services/user.service';

const ACCESS_TOKEN =
  'TEST-2974784228505657-061323-b4b54f78a886aeff45e6c9d9febdca07-49668766';

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

  generarCredencialesMP() {
    const body = {
      client_secret: ACCESS_TOKEN,
      grant_type: 'authorization_code',
      code: 'TG-60cbc798e584b80008f44617-49668766',
      redirect_uri: 'http://localhost:4200/callback',
    };
    this.userService.generarCredencialesMP(body).subscribe((res) => {
      console.log(res);
    });
  }
}
