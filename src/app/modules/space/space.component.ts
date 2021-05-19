import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
})
export class SpaceComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  showPublishments() {
    this.router.navigate(['/feed']);
  }
}
