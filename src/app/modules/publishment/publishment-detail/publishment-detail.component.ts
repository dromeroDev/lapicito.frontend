import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IPublicacion } from 'src/app/core/models/publicacion';
import { PublishmentService } from 'src/app/core/services/publishment.service';
import { LapicitoComponent } from 'src/app/shared/components/lapicito/lapicito.component';
import { ValorationCreateComponent } from './valoration-create/valoration-create.component';

@Component({
  selector: 'app-publishment-detail',
  templateUrl: './publishment-detail.component.html',
  styleUrls: ['./publishment-detail.component.scss'],
})
export class PublishmentDetailComponent implements OnInit {
  publishment: IPublicacion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private publishmentService: PublishmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.publishmentService.getById(params.id).subscribe((res) => {
        this.publishment = res;
      });
    });
  }

  openCreateValoration() {
    const options: NgbModalOptions = {
      animation: true,
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(ValorationCreateComponent, options);
    modalRef.componentInstance.publishment = this.publishment;
    modalRef.closed.subscribe((res) => {
      this.publishmentService
        .getById(this.publishment.idPublicacion)
        .subscribe((res) => {
          this.publishment = res;
        });
    });
  }

  getArrayStars(stars) {
    return Array(stars)
      .fill(0)
      .map((x, i) => i);
  }

  getArrayEmptyStars(stars) {
    return Array(5 - stars)
      .fill(0)
      .map((x, i) => i);
  }

  isNotUserLogged() {
    return this.publishment.usuario.id !== +localStorage.getItem('id_usuario');
  }

  loguearDescarga() {
    if (
      this.publishment.usuario.id.toString() !==
      localStorage.getItem('id_usuario')
    ) {
      this.publishmentService
        .loguearDescarga(this.publishment.idPublicacion)
        .subscribe((res) => {
          this.ngOnInit();
        });
    }
  }

  openDonarLapicito() {
    const options: NgbModalOptions = {
      animation: true,
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(LapicitoComponent, options);
    modalRef.componentInstance.idReceptor = this.publishment.usuario.id;
    modalRef.closed.subscribe((res) => {
      this.publishmentService
        .getById(this.publishment.idPublicacion)
        .subscribe((res) => {
          this.publishment = res;
        });
    });
  }
}
