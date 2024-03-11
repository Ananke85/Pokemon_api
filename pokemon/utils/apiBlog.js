import { apiBlog } from "./api";

export const getAllPosts = () => {
  return apiBlog
    .get("/pokenews/?limit=6")
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};


export const getPostById = ({ queryKey }) => {
  return apiBlog
    .get(`/pokenews/${queryKey[1]}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};
