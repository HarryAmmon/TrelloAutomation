import {
  GetBoardId,
  GetListIdOnBoard,
  CreateCardForList,
  GetLabelIdOnBoard,
} from "./trelloAPI.js";
import fs from "fs";

console.log("app.js running");

GetBoardId("University - Sem 2").then((result) => {
  const prom1 = GetLabelIdOnBoard(result, "CI660");
  const prom2 = GetListIdOnBoard(result, "Backlog");
  const prom3 = fs.promises.readFile("./weekNumber.json", "utf8");
  Promise.all([prom1, prom2, prom3])
    .then((result) => {
      let jsonString = JSON.parse(result[2]);
      const createLectureCard = CreateCardForList(
        result[1],
        `CI660 Lecture ${jsonString.week}`,
        result[0]
      );
      const createTutorialCard = CreateCardForList(
        result[1],
        `CI660 Tutorial ${jsonString.week}`,
        result[0]
      );
      Promise.all([createLectureCard, createTutorialCard]).then((result) => {
        jsonString.week += 1;
        jsonString = JSON.stringify(jsonString);
        fs.promises.writeFile("./weekNumber.json", jsonString, "utf8");
      });
    })
    .catch((error) => console.log(error));
});
