import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { IEspacio } from '../models/espacio';

const BASE_URL = env.url_server + '/espacio';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  constructor(private http: HttpClient) {}

  getSpacesByCategories(body): Observable<IEspacio[]> {
    return this.http.post<IEspacio[]>(BASE_URL + '/categorias', body);
  }

  getById(id): Observable<IEspacio> {
    return this.http.get<IEspacio>(BASE_URL + '/' + id);
  }

  getSpacesByIdUser(id): Observable<IEspacio[]> {
    return this.http.get<IEspacio[]>(BASE_URL + '/usuario/' + id);
  }
}
