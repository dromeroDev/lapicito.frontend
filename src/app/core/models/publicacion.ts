import { IEspacio } from './espacio';
import { IUsuario } from './usuario';

export interface IPublicacion {
  id: number;
  titulo: string;
  descripcion: string;
  url_adjunto: string;
  es_anuncio: boolean;
  activo: boolean;
  fecha_alta: string;
  usuario: IUsuario;
  espacio: IEspacio;
}
