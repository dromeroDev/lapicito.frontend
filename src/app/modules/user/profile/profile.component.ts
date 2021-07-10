import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/core/models/usuario';
import { UserService } from 'src/app/core/services/user.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { IPublicacion } from 'src/app/core/models/publicacion';
import { PublishmentService } from 'src/app/core/services/publishment.service';
import { SpaceService } from 'src/app/core/services/space.service';
import { IEspacio } from 'src/app/core/models/espacio';
import { AvatarEditComponent } from './avatar-edit/avatar-edit.component';
import { PortadaEditComponent } from './portada-edit/portada-edit.component';
import { StorageService } from 'src/app/core/services/storage.service';
import { LapicitoService } from 'src/app/core/services/lapicito.service';
import { LapicitoRecivedComponent } from '../../lapicito/lapicito-recived/lapicito-recived.component';

const CLIENT_ID_LAPICITO = '2974784228505657';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUsuario;
  publishments: IPublicacion[];
  spaces: IEspacio[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private publishmentService: PublishmentService,
    private spaceService: SpaceService,
    private modalService: NgbModal,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userService.getDatosPerfil(params.id).subscribe((res) => {
        this.user = res;
        if (this.user.portada_url.includes('null')) {
          this.user.portada_url = 'assets/images/portada-empty.jpg';
        }
      });

      this.publishmentService
        .getPublishmentsByIdUser(params.id)
        .subscribe((res) => {
          this.publishments = res;
        });

      this.spaceService.getSpacesByIdUser(params.id).subscribe((res) => {
        this.spaces = res;
      });
    });
  }

  showPublishmentDetail(id) {
    this.router.navigate(['/publishment/' + id]);
  }

  showSpaceDetail(id) {
    this.router.navigate(['/space/' + id]);
  }

  getUrlMP() {
    return (
      'https://auth.mercadopago.com.ar/authorization?client_id=' +
      CLIENT_ID_LAPICITO +
      '&response_type=code&platform_id=mp&redirect_uri=http://localhost:4200/callback'
    );
  }

  desvincularMP() {
    this.userService.desvincularMP(this.user.mp_user_id).subscribe((res) => {
      this.userService.getDatosPerfil(this.user.id).subscribe((res) => {
        this.user = res;
      });
    });
  }

  openEditProfile() {
    const options: NgbModalOptions = {
      animation: true,
      backdrop: 'static',
      size: 'lg',
    };
    const modalRef = this.modalService.open(ProfileEditComponent, options);
    modalRef.componentInstance.user = this.user;
    modalRef.closed.subscribe((res) => {
      this.userService.getDatosPerfil(this.user.id).subscribe((res) => {
        this.user = res;
        localStorage.setItem('usuario', JSON.stringify(res));
        this.storageService.emitChange();
      });
    });
  }

  openEditAvatar() {
    if (!this.isViewer()) {
      const options: NgbModalOptions = {
        animation: true,
        backdrop: 'static',
      };
      const modalRef = this.modalService.open(AvatarEditComponent, options);
      modalRef.componentInstance.user = this.user;
      modalRef.closed.subscribe((res) => {
        this.userService.getDatosPerfil(this.user.id).subscribe((res) => {
          this.user = res;
          localStorage.setItem('usuario', JSON.stringify(res));
          this.storageService.emitChange();
        });
      });
    }
  }

  openEditPortada() {
    const options: NgbModalOptions = {
      animation: true,
      backdrop: 'static',
      size: 'lg',
    };
    const modalRef = this.modalService.open(PortadaEditComponent, options);
    modalRef.componentInstance.user = this.user;
    modalRef.closed.subscribe((res) => {
      this.userService.getDatosPerfil(this.user.id).subscribe((res) => {
        this.user = res;
      });
    });
  }

  isViewer() {
    return this.user.id.toString() !== localStorage.getItem('id_usuario');
  }

  showDonaciones() {
    const options: NgbModalOptions = {
      animation: true,
      backdrop: 'static',
      size: 'lg',
    };
    const modalRef = this.modalService.open(LapicitoRecivedComponent, options);
    modalRef.componentInstance.user = this.user;
  }
}
