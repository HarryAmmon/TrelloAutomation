import { GetBoardId, GetListsOnBoard } from "./trelloAPI.js";

console.log("app.js running");
GetBoardId("University - Sem 2").then((result) => {
  GetListsOnBoard(result, "Backlog").then((result) => {
    console.log(result);
  });
});
