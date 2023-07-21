import { useQuery } from "react-query";
import styles from "./pokemonDetails.module.css";
import { getPokemonDetails } from "../../../../../utils/apiPokemons";

const PokemonDetails = () => {
  const { data } = useQuery(["names"], getPokemonDetails);

  console.log("los nombres", data);

  return (
    <>
      {data && (
        <div className={styles.outlet}>
          <div className={styles.title}>
            <h1 className={styles.name}>{data.species.name}</h1>
            <h1>al detalle</h1>
          </div>

          <img src={data.sprites.other["official-artwork"].front_default}></img>
        </div>
      )}
    </>
  );
};

export default PokemonDetails;
