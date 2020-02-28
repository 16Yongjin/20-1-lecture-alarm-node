import request from "request-promise";
import cheerio from "cheerio";

// import dotenv from "dotenv";

// dotenv.config();

const url = "https://wis.hufs.ac.kr/src08/jsp/lecture/LECTURE2020L.jsp";

const buildForm = (courseId: string) => {
  return {
    ag_ledg_year: "2020",
    ag_ledg_sessn: "1",
    ag_org_sect: "A",
    campus_sect: courseId.slice(0, 2),
    gubun: courseId.startsWith("A") ? "1" : "2",
    ag_crs_strct_cd: courseId,
    ag_compt_fld_cd: courseId
  };
};

const fetchCourseHtml = (courseId: string) =>
  request.post(url, { form: buildForm(courseId) });

const infos = {
  0: "index",
  3: "id",
  4: "name",
  11: "professor",
  14: "time",
  15: "people"
};

type Lecture = {
  index: number;
  id: string;
  name: string;
  professor: string;
  time: string;
  people: string;
};

const trim = (str: string) =>
  str
    .trim()
    .replace(/\s{2,}/, "")
    .replace(/\s?\(.+$/, "");

function fromEntries<T>(entries: [keyof T, T[keyof T]][]): T {
  return entries.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    <T>{}
  );
}

export const getLectures = async (courseId: string) => {
  const html = await fetchCourseHtml(courseId);
  const $ = cheerio.load(html);

  const trs = $("#premier1 tr");

  const lectures = $(trs)
    .map((idx, tr) => {
      if (!idx) return;

      const tds = $(tr).children("td");

      const lecture = fromEntries(
        Object.entries(infos).map(([key, value]) => [
          value,
          trim(tds.eq(Number(key)).text())
        ])
      );

      return lecture;
    })
    .get();

  console.log(lectures);
};

getLectures("AAR01_H1");
