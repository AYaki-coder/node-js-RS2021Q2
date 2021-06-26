import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IColumnInfo } from '../resources/boards/board';

@Entity({ name: 'board' })
export default class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 100 })
  title!: string;

  @Column('json')
  columns!: IColumnInfo[];

  static toResponse(board: Board): Board {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
