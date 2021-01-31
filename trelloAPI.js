import axios from "axios";

const key = process.env.TRELLO_KEY;
const token = process.env.TRELLO_TOKEN;

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

export const GetListIdOnBoard = (boardID, listName) => {
  return new Promise((resolve, reject) => {
    try {
      instance.get(`1/boards/${boardID}/lists`).then((result) => {
        result.data.forEach((list) => {
          if (list.name === listName) {
            resolve(list.id);
          }
        });
        resolve(undefined);
      });
    } catch (error) {
      reject(new Error(error));
    }
  });
};

export const GetLabelIdOnBoard = (boardID, labelName) => {
  return new Promise((resolve, reject) => {
    try {
      instance.get(`1/boards/${boardID}/labels`).then((result) => {
        result.data.forEach((label) => {
          if (label.name === labelName) {
            resolve(label.id);
          }
        });
        resolve(undefined);
      });
    } catch (error) {
      reject(new Error(error));
    }
  });
};

export const CreateCardForList = (listId, cardName, labelId) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post(`1/cards`, null, {
          params: { idList: listId, name: cardName, idLabels: [labelId] },
        })
        .then((response) => resolve(response.data.id));
    } catch (error) {
      reject(new Error(error));
    }
  });
};
