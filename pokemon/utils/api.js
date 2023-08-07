import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: { "Content-Type": "application/json" },
});

export const apiBlog = axios.create({
  baseURL: "http://localhost:3005",
});
