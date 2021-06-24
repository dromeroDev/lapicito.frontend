import { IEspacio } from './espacio';
import { IUsuario } from './usuario';
import { IValoracion } from './valoracion';

export interface IPublicacion {
  id: number;
  idPublicacion: number;
  titulo: string;
  descripcion: string;
  url_adjunto: string;
  es_anuncio: boolean;
  activo: boolean;
  fecha_alta: string;
  usuario: IUsuario;
  espacio: IEspacio;
  valoracionDtoList: IValoracion[];
}
