import { useQuery } from "react-query";
import styles from "../pokePage.module.css";
import { getAllPokemons } from "../../../../utils/apiPokemons";
import { Link, Outlet } from "react-router-dom";

const Pokemons = () => {
  const { data: pokemons } = useQuery(["pokemons"], getAllPokemons);
  console.log("los pokemons", pokemons);

  return (
    <>
    <h6>
          Pokémon are the creatures that inhabit the world of the Pokémon games.
          They can be caught using Pokéballs and trained by battling with other
          Pokémon. Each Pokémon belongs to a specific species but may take on a
          variant which makes it differ from other Pokémon of the same species,
          such as base stats, available abilities and typings.{" "}
        </h6>
      <div className={styles.pageOutlet}>
        
        <div className={styles.list}>
          {pokemons &&
            pokemons.results.map((pokemon) => (
              <Link
                key={pokemon.name}
                to={`/pokemons/pokemon/${pokemon.name}`}
                className={styles.element}
              >
                {pokemon.name}{" "}
              </Link>
            ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Pokemons;
