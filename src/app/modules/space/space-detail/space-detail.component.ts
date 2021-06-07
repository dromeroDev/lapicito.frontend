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
        this.publishmentService
          .getPublishmentsBySpace(this.space.id)
          .subscribe((res) => {
            this.publishments = res;
          });
      });
    });
  }

  showPublishmentDetail(id: number) {
    this.router.navigate(['/publishment/' + id]);
  }
}
