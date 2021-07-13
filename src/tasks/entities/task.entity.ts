import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 100 })
  title!: string;

  @Column('int')
  order!: number;

  @Column('varchar', { length: 300 })
  description!: string;

  @Column('varchar', { nullable: true })
  userId!: string | null;

  @Column('varchar', { nullable: true })
  boardId!: string;

  @Column('varchar', { nullable: true })
  columnId!: string | null;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: string | null;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'boardId' })
  board: string | null;
}
