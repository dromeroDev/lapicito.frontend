import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILapicito } from 'src/app/core/models/lapicito';
import { IUsuario } from 'src/app/core/models/usuario';
import { LapicitoService } from 'src/app/core/services/lapicito.service';

@Component({
  selector: 'app-lapicito-recived',
  templateUrl: './lapicito-recived.component.html',
  styleUrls: ['./lapicito-recived.component.scss'],
})
export class LapicitoRecivedComponent implements OnInit {
  lapicitos: ILapicito[];
  @Input() public user: IUsuario;

  constructor(
    private lapicitoSercive: LapicitoService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.lapicitoSercive.getLapicitosByUser(this.user.id).subscribe((res) => {
      this.lapicitos = res;
    });
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
