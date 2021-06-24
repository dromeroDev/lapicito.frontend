import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { IPublicacion } from '../models/publicacion';

const BASE_URL = env.url_server + '/publicacion';

@Injectable({
  providedIn: 'root',
})
export class PublishmentService {
  constructor(private http: HttpClient) {}

  getPublishmentsByCategories(body): Observable<IPublicacion[]> {
    return this.http.post<IPublicacion[]>(BASE_URL + '/categorias', body);
  }

  getById(id): Observable<IPublicacion> {
    return this.http.get<IPublicacion>(BASE_URL + '/' + id);
  }

  getPublishmentsBySpace(id): Observable<IPublicacion[]> {
    return this.http.get<IPublicacion[]>(BASE_URL + '/espacio/' + id);
  }

  getPublishmentsByIdUser(id): Observable<IPublicacion[]> {
    return this.http.get<IPublicacion[]>(BASE_URL + '/usuario/' + id);
  }

  valorarPublicacion(body) {
    return this.http.post(env.url_server + '/valoracion', body);
  }
}
