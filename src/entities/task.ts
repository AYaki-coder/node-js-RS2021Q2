import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 100 })
  title!: string;

  @Column('int')
  order!: number;

  @Column('varchar', { length: 300 })
  description!: string;

  @Column('varchar', { length: 100, nullable: true })
  userId!: string | null;

  @Column('varchar', { length: 100 })
  boardId!: string;

  @Column('varchar', { length: 100, nullable: true })
  columnId!: string | null;

  static toResponse(task: Task): Task {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
