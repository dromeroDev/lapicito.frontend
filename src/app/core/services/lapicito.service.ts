import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LapicitoService {
  constructor(private http: HttpClient) {}

  donar(body) {
    return this.http.post(
      env.url_server + '/mercadoPago/createAndRedirect',
      body
    );
  }
}
