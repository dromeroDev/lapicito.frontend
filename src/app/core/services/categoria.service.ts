import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoria } from '../models/categoria';
import { environment as env } from '../../../environments/environment';

const BASE_URL = env.url_server + '/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(
      env.ambiente == 'prepro' ? BASE_URL + '/listar' : BASE_URL
    );
  }
}
