import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEspacio } from 'src/app/core/models/espacio';
import { IPublicacion } from 'src/app/core/models/publicacion';
import { PublishmentService } from 'src/app/core/services/publishment.service';
import { SpaceService } from 'src/app/core/services/space.service';

@Component({
  selector: 'app-space-detail',
  templateUrl: './space-detail.component.html',
  styleUrls: ['./space-detail.component.scss'],
})
export class SpaceDetailComponent implements OnInit {
  space: IEspacio;
  publishments: IPublicacion[];
  follower: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spaceService: SpaceService,
    private publishmentService: PublishmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.spaceService.getById(params.id).subscribe((res) => {
        this.space = res;
        if (this.space.portada_url.includes('null')) {
          this.space.portada_url = 'assets/images/portada-empty.jpg';
        }
        this.publishmentService
          .getPublishmentsBySpace(this.space.idEspacio)
          .subscribe((res) => {
            this.publishments = res;
          });
      });

      this.spaceService
        .isFollower(params.id, localStorage.getItem('id_usuario'))
        .subscribe((res) => {
          this.follower = res;
        });
    });
  }

  showPublishmentDetail(id: number) {
    this.router.navigate(['/publishment/' + id]);
  }

  isAdmin() {
    return (
      this.space.usuarioPerfilDto.id.toString() ===
      localStorage.getItem('id_usuario')
    );
  }

  isViewer() {
    return (
      this.space.usuarioPerfilDto.id.toString() !==
      localStorage.getItem('id_usuario')
    );
  }

  follow() {
    this.spaceService
      .follow(this.space.idEspacio, localStorage.getItem('id_usuario'))
      .subscribe((res) => {
        this.spaceService.getById(this.space.idEspacio).subscribe((res) => {
          this.space = res;
        });
        this.spaceService
          .isFollower(this.space.idEspacio, localStorage.getItem('id_usuario'))
          .subscribe((res) => {
            this.follower = res;
          });
      });
  }

  unfollow() {
    this.spaceService
      .unfollow(this.space.idEspacio, localStorage.getItem('id_usuario'))
      .subscribe((res) => {
        this.spaceService.getById(this.space.idEspacio).subscribe((res) => {
          this.space = res;
        });
        this.spaceService
          .isFollower(this.space.idEspacio, localStorage.getItem('id_usuario'))
          .subscribe((res) => {
            this.follower = res;
          });
      });
  }
}
