import { api } from "./api";


// export const getAllBerries = () => {
//   return api
//     .get("/berry/?limit=12&offset=0")
//     .then((res) => res.data)
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const getAllBerries = (offset, limit) => {
  return api
    .get(`/berry/?limit=${limit}&offset=${offset}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getAllPokemons = (offset, limit) => {
  return api
    .get(`/pokemon/?offset=${offset}&limit=${limit}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getBerriesDetails = (name) => {
  return api
    .get(`/berry/${name}/`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};