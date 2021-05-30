import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategoria } from '../models/categoria';
import { environment as env } from '../../../environments/environment';

const BASE_URL = env.url_server + '/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  private addCheckToCategoria(categoria: ICategoria) {
    categoria.checked = false;
    return categoria;
  }

  getAll(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(BASE_URL).pipe(
      map((data) => {
        return data.map((cat) => this.addCheckToCategoria(cat));
      })
    );
  }

  getByUser(idUser): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(BASE_URL + '/usuario/' + idUser);
  }

  saveByUser(body) {
    return this.http.post(BASE_URL + '/usuario', body);
  }
}
