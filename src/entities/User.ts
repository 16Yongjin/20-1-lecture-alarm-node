import { Lecture } from ".";
import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToMany,
  JoinTable
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn("text")
  id: string;

  @ManyToMany(
    () => Lecture,
    lecture => lecture.users
  )
  @JoinTable()
  lectures: Lecture[];

  async removeLecture(lectureId: string) {
    console.log("remove user alarm");
    console.log("user", this);

    await User.createQueryBuilder()
      .relation(User, "lectures")
      .of({ id: this.id })
      .remove(lectureId);

    const user = User.findOne(this.id);
    console.log(user);
  }
}
