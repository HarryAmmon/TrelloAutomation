import axios from "axios";
import fs from "fs";
import { resolve } from "path";

const key = process.env.TRELLOKEY;
const token = process.env.TRELLOTOKEN;

const instance = axios.create({
  baseURL: "https://api.trello.com/",
  params: { key, token },
});

export const GetBoardId = (name) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .get("1/members/me/boards", {
          params: { fields: ["id", "name"] },
        })
        .then((result) => {
          result.data.forEach((item) => {
            if (item.name === name) {
              resolve(item.id);
            }
          });
        });
    } catch (error) {
      reject(new Error(error));
    }
  });
};

export const GetListsOnBoard = (boardID) => {
  return new Promise((resolve, reject) => {
    try {
      instance.get(`1/boards/${boardID}/lists`).then((result) => {
        resolve(result.data);
      });
    } catch (error) {
      reject(new Error(error));
    }
  });
};

const createCardForList = (listID, name) => {
  instance
    .post(`1/cards`, null, { params: { idList: listID, name: name } })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

let jsonData;

// fs.readFile("./weekNumber.json", "utf8", (errors, data) => {
//   jsonData = JSON.parse(data);
//   console.log(jsonData);
//   createCardForList(
//     "5fb014e4235f1b4a300c8b09",
//     `Complete CI609 Lectures, Week ${jsonData.week}`
//   );
//   createCardForList(
//     "5fb014e4235f1b4a300c8b09",
//     `Complete CI615 Lectures, Week ${jsonData.week}`
//   );
//   createCardForList(
//     "5fb014e4235f1b4a300c8b09",
//     `Complete CI646 Lectures, Week ${jsonData.week}`
//   );
//   jsonData.week = jsonData.week + 1;
//   const jsonString = JSON.stringify(jsonData);
//   fs.writeFile("./weekNumber.json", jsonString, "utf8", (err, data) =>
//     console.log(data)
//   );
// });

// getBoards()

//getListOnBoard("5fb014d48b3b3b5c59736070");
