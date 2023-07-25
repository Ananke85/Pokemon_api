import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPokemonSpecies } from "../../../../../utils/apiPokemons";


const Prueba = () => {

  const { name } = useParams();
  const { data: species } = useQuery(["species", name], () =>
    getPokemonSpecies(name)
  );

console.log("las species", species)

  return (
    <>
    <h1>probando</h1>
    </>
  )
}


export default Prueba
