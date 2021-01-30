import { GetBoardId, GetListsOnBoard, CreateCardForList } from "./trelloAPI.js";

console.log("app.js running");
GetBoardId("University - Sem 2").then((result) => {
  GetListsOnBoard(result, "Backlog").then((result) => {
    CreateCardForList(result, "Test List").then((result) => {
      console.log(result);
    });
  });
});
