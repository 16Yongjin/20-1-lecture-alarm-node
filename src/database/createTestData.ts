import { User, Lecture } from "../entities";

const seedLectures = (): Promise<Lecture[]> => {
  const lectures = [
    Lecture.create({
      id: "V41002101",
      index: 0,
      name: "컴퓨터수학",
      professor: "이민나",
      time: "월 1 2 3",
      course_id: "ATMB3_H1"
    }),
    Lecture.create({
      id: "J11004101",
      index: 0,
      name: "러시아.투르크.몽골의민족과종교",
      professor: "이난아",
      time: "월 7 8",
      course_id: "AAR01_H1"
    }),
    Lecture.create({
      id: "J11002101",
      index: 2,
      name: "서양문학과대중문화",
      professor: "임형진",
      time: "수 7 8",
      course_id: "AAR01_H1"
    }),
    Lecture.create({
      id: "U72207302",
      index: 1,
      name: "컴퓨터프로그래밍",
      professor: "이선순",
      time: "금 4 5 6",
      course_id: "308_H1"
    }),
    Lecture.create({
      id: "U71189101",
      index: 2,
      name: "애니메이션일본어1",
      professor: "최현필",
      time: "월 1 2",
      course_id: "355_H1"
    }),
    Lecture.create({
      id: "U71187101",
      index: 1,
      name: "드라마일본어1",
      professor: "송연희",
      time: "목 9 10",
      course_id: "355_H1"
    })
  ];

  return Lecture.save(lectures);
};

const seedUser = (lectures: Lecture[]): Promise<User[]> => {
  const alarms = [
    User.create({
      user: "1",
      lectures: lectures.slice(0, 2)
    }),
    User.create({
      user: "2",
      lectures: lectures.slice(1, 3)
    }),
    User.create({
      user: "3",
      lectures: lectures.slice(4)
    })
  ];

  return User.save(alarms);
};

const createTestData = async (): Promise<void> => {
  const lectures = await seedLectures();
  const alarms = await seedUser(lectures);
};

export default createTestData;
