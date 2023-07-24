import { useQuery } from "react-query";
import styles from "../pokePage.module.css";
import { getAllPokemons } from "../../../../utils/apiPokemons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Pokemons = () => {
  const { data: pokemons } = useQuery(["pokemons"], getAllPokemons);
  const location = useLocation(); // Get the current location

  const isScreenLessThan1040px = window.innerWidth < 1040;
  // Scroll to the top of the opened details section when the location changes
  useEffect(() => {
    const openedDetail = document.getElementById("opened-detail");
    if (openedDetail) {
      openedDetail.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

//  console.log("los pokemons", pokemons)

  return (
    <>
      <div className={styles.description}>
        <h5>
          Pokémon are the creatures that inhabit the world of the Pokémon games.
          They can be caught using Pokéballs and trained by battling with other
          Pokémon. Each Pokémon belongs to a specific species but may take on a
          variant which makes it differ from other Pokémon of the same species,
          such as base stats, available abilities and typings.{" "}
        </h5>
      </div>

      <div className={styles.pageOutlet}>
        <div className={styles.list}>
          {pokemons &&
            pokemons.results.map((pokemon) => (
              <div key={pokemon.name} className={styles.item}>
                <Link
                  to={`/pokemons/pokemon/${pokemon.name}`}
                  className={styles.element}
                >
                  {pokemon.name}
                </Link>
                {isScreenLessThan1040px &&
                  location.pathname === `/pokemons/pokemon/${pokemon.name}` && (
                    <Outlet pokemons={pokemons} />
                  )}
              </div>
            ))}
        </div>
        {!isScreenLessThan1040px && <Outlet pokemons={pokemons} />}
      </div>
    </>
  );
};

export default Pokemons;
