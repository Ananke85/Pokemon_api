import { api } from "./api";


// export const getAllLocations = () => {
//   return api
//     .get("/location/?limit=12&offset=0")
//     .then((res) => res.data)
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const getAllLocations = (offset, limit) => {
  return api
    .get(`/location/?limit=${limit}&offset=${offset}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getLocationByName = (name) => {
  return api
    .get(`/location/${name}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getAllRegions = (offset, limit) => {
  return api
    .get(`/region/?limit=${limit}&offset=${offset}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getRegionByName = (name) => {
  return api
    .get(`/region/${name}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getLocationArea = (id) => {
  return api
    .get(`/location-area/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

