import { Lecture } from ".";
import {
  Entity,
  BaseEntity,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn("text")
  user: string;

  @ManyToMany(() => Lecture)
  @JoinTable()
  lectures: Lecture[];
}
