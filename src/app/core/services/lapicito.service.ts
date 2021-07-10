import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { ILapicito } from '../models/lapicito';

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

  save(body) {
    return this.http.post(env.url_server + '/lapicito', body);
  }

  getLapicitosByUser(idUser): Observable<ILapicito[]> {
    return this.http.get<ILapicito[]>(
      env.url_server + '/lapicito/usuario/' + idUser
    );
  }
}
