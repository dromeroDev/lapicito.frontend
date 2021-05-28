import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { IUsuarioNuevo } from '../models/usuario-nuevo';

const BASE_URL = env.url_server + '/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(body: IUsuarioNuevo) {
    return this.http.post(BASE_URL + '/registrar', body);
  }
}
