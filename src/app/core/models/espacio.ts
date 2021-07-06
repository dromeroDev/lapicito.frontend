import { ICategoria } from './categoria';
import { IUsuario } from './usuario';

export interface IEspacio {
  id: number;
  idEspacio: number;
  descripcion: string;
  portada_url: string;
  categoria: ICategoria;
  usuarioPerfilDto: IUsuario;
}
