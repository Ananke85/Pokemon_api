import { api } from "./api";

export const getAllPokemons = () => {
  return api
    .get("/pokemon/?limit=15&offset=0")
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getPokemonDetails = (name) => {
  return api
    .get(`/pokemon/${name}/`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getPokemonAbilities = (ability) => {
  return api
    .get(`/ability/${ability}/`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getPokemonSpecies = (name) => {
  return api
    .get(`/pokemon-species/${name}/`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getPokemonEvolution = (id) => {
  return api
    .get(`/evolution-chain/${id}/`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};


export const getAllBerries = () => {
  return api
    .get("/berry/?limit=15&offset=0")
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};
