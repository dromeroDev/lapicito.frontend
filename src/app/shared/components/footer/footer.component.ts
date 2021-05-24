import { Component, OnInit } from '@angular/core';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  ambiente = env.ambiente;

  constructor() {}

  ngOnInit(): void {}
}
