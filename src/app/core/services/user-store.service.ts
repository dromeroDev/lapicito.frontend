import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { IUsuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  usuarioLogueado: IUsuario;
  constructor(private modalService: NgbModal) {}

  openLogin() {
    const options: NgbModalOptions = {
      animation: true,
      backdrop: 'static',
    };
    const modalRef = this.modalService.open(LoginComponent, options);
  }
}
