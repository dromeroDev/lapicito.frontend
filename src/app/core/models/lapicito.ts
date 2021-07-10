import { IUsuario } from './usuario';

export interface ILapicito {
  cantidad: number;
  usuarioEmisor: IUsuario;
  comentario: string;
}
