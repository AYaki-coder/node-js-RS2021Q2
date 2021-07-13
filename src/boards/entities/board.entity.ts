import { Task } from 'src/tasks/entities/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IColumnInfo } from '../column.interface';

@Entity({ name: 'board' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 100 })
  title!: string;

  @Column('json')
  columns!: IColumnInfo[];

  @OneToMany(() => Task, (task) => task.boardId)
  tasks: Task[];
}
