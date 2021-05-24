import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoria } from '../models/categoria';
import { environment as env } from '../../../environments/environment';

const BASE_URL = env.url_server + '/categoria';
const auth_token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkcm9tZXJvIiwiaWF0IjoxNjIxODEyNDc0LCJleHAiOjE2MjE4NDg0NzR9.pWcEDUex7cdVoWw4T_m_OswqKLLdl51OW3rZ2xm-VmrBDEVc44RjAeyCcsFEL7nKNSfxlyiTj7gQyS_pbBBJ2A';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ICategoria[]> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });
    return this.http.get<ICategoria[]>(
      env.ambiente == 'prepro' ? BASE_URL + '/listar' : BASE_URL,
      {
        headers: header,
      }
    );
  }
}
