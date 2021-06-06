import { ICategoria } from './categoria';

export interface IEspacio {
  id: number;
  descripcion: string;
  portada_url: string;
  categoria: ICategoria;
}
