import { api } from "./api";


export const getAllItems = (offset, limit) => {
  return api
    .get(`/item/?limit=${limit}&offset=${offset}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getItemsByName = (name) => {
  return api
    .get(`/item/${name}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getCategory = () => {
  return api
    .get(`/item-category/`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};