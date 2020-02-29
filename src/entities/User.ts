import { Lecture } from ".";
import { Entity, PrimaryColumn, BaseEntity, ManyToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn("text")
  id: string;

  @ManyToMany(
    () => Lecture,
    lecture => lecture.users
  )
  lectures: Lecture[];
}
