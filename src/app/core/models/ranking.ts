export interface IRanking {
  title: string;
  items: IItemRanking[];
}

export interface IItemRanking {
  position: number;
  value: number;
  description: string;
}
