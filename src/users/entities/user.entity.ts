import { Task } from '../../tasks/entities/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReturnUserDto } from '../dto/return-user.dto';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 30 })
  name!: string;

  @Column('varchar', { length: 20 })
  login!: string;

  @Column('varchar', { length: 301 })
  password!: string;

  @OneToMany(() => Task, (task) => task.userId)
  tasks: Task[];

  static toResponse(user: User): ReturnUserDto {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
