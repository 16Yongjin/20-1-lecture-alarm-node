import { Entity, Column, PrimaryColumn, BaseEntity, ManyToMany } from "typeorm";

@Entity()
export class Lecture extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  index: number;

  @Column()
  name: string;

  @Column()
  professor: string;

  @Column()
  time: string;

  @Column()
  course_id: string;
}
