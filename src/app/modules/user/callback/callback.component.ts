import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

const CLIENT_SECRET_LAPICITO =
  'TEST-2974784228505657-061323-b4b54f78a886aeff45e6c9d9febdca07-49668766';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      const param = res;
      console.log(param.code);
      this.generarCredencialesMP(param.code);
    });
  }

  generarCredencialesMP(code) {
    const body = {
      client_secret: CLIENT_SECRET_LAPICITO,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:4200/callback',
    };
    this.userService.generarCredencialesMP(body).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/user/' + localStorage.getItem('id_usuario'));
    });
  }
}
