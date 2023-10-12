import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IRanking } from '../../../core/models/ranking';

@Component({
  selector: 'app-ranking-top',
  templateUrl: './ranking-top.component.html',
  styleUrls: ['./ranking-top.component.scss'],
})
export class RankingTopComponent implements OnInit {
  @Input() ranking: IRanking;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  close() {
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  getImageLapicitoRanking(position: number) {
    switch (position) {
      case 1:
        return 'assets/images/ranking-oro.png';
        break;
      case 2:
        return 'assets/images/ranking-plata.png';
        break;
      case 3:
        return 'assets/images/ranking-bronce.png';
        break;
      default:
        return 'assets/images/logo_new2.png';
        break;
    }
  }
}
