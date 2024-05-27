import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: { "Content-Type": "application/json" },
});

export const API_URL= 
window.location.hostname === "lorenaspokesite.netlify.app" 
? "https://pokemonapi-production-e47d.up.railway.app"
: "http://localhost:3005"

export const apiBlog = axios.create({
  baseURL: API_URL,
  // baseURL: "http://localhost:3005",
});
