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
  id: string;

  @ManyToMany(
    () => Lecture,
    lecture => lecture.users
  )
  @JoinTable()
  lectures: Lecture[];

  sendAlarm(lectureId: string) {
    const lecture = this.lectures.find(({ id }) => id === lectureId);

    if (!lecture) return;

    console.log({
      to: this.id,
      message: `${lecture.name} ${lecture.professor} ${lecture.time} 자리났어요.`
    });
  }

  async removeLecture(lectureId: string) {
    this.lectures = this.lectures.filter(({ id }) => id !== lectureId);
    return this.save();
  }
}
