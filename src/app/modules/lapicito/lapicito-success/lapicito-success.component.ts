import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LapicitoService } from 'src/app/core/services/lapicito.service';

@Component({
  selector: 'app-lapicito-success',
  templateUrl: './lapicito-success.component.html',
  styleUrls: ['./lapicito-success.component.scss'],
})
export class LapicitoSuccessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private lapicitoService: LapicitoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const body = {
        cantidadLapicitos: +params.quantity,
        comentario: params.comentario,
        id_Receptor: params.id_receptor,
        id_donador: params.id_donador,
      };
      this.lapicitoService.save(body).subscribe((res) => {});
    });
  }
}
