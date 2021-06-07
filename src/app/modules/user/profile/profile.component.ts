import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/core/models/usuario';
import { UserService } from 'src/app/core/services/user.service';

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
}
