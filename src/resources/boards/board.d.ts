export interface IBoardInfo {
  id: string;
  title: string;
  columns: IColumnInfo[];
}

export interface IColumnInfo {
  id: string;
  title: string;
  order: number;
}
