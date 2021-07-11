import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { IEspacio } from '../models/espacio';
import { IPublicacion } from '../models/publicacion';
import { IUsuario } from '../models/usuario';

const BASE_URL = env.url_server + '/ranking';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor(private http: HttpClient) {}

  getUsuariosMasDonados(body): Observable<IUsuario[]> {
    return this.http.post<IUsuario[]>(BASE_URL + '/usuario', body);
  }

  getPublicacionesMasValoradas(body): Observable<IPublicacion[]> {
    return this.http.post<IPublicacion[]>(
      BASE_URL + '/publicacionValorada',
      body
    );
  }

  getEspaciosMasSeguidos(body): Observable<IEspacio[]> {
    return this.http.post<IEspacio[]>(BASE_URL + '/espacioSeguido', body);
  }

  getPublicacionesMasDescargadas(body): Observable<IPublicacion[]> {
    return this.http.post<IPublicacion[]>(
      BASE_URL + '/publicacionDescargada',
      body
    );
  }
}
