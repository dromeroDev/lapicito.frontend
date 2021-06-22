import { ICategoria } from './categoria';
import { IRol } from './rol';

export interface IUsuario {
  id: number;
  nombre: string;
  apellido: string;
  userName: string;
  email: string;
  telefono?: number;
  avatar_url?: string;
  portada_url?: string;
  cantidad_lapicitos: number;
  roles: IRol[];
  categorias: ICategoria[];
  promedioUsuario: number;
  mp_user_id: number;
}
