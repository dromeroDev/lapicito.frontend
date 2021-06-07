import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPublicacion } from 'src/app/core/models/publicacion';
import { PublishmentService } from 'src/app/core/services/publishment.service';

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
    private publishmentService: PublishmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.publishmentService.getById(params.id).subscribe((res) => {
        this.publishment = res;
      });
    });
  }
}
