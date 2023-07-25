import styles from "../pokePage.module.css";
import { getAllPokemons } from "../../../../utils/apiPokemons";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Pokemons = () => {
  const limit = 14;
  const [offset, setOffset] = useState(0);
  const [pokeList, setPokeList] = useState([]);
  const isScreenLessThan1040px = window.innerWidth < 1040;

  useEffect(() => {
    getAllPokemons(offset, limit)
      .then((data) => setPokeList(data.results))
      .catch((error) => console.log(error));
  }, [offset, limit]);

  const loadMorePokemons = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };
  const loadLessPokemons = () => {
    setOffset((prevOffset) => prevOffset - limit);
  };

  useEffect(() => {
    loadMorePokemons();
  }, []);
  useEffect(() => {
    loadLessPokemons();
  }, []);

  return (
    <>
      <div className={styles.description}>
        <h4>
          Pokémon are the creatures that inhabit the world of the Pokémon games.
          They can be caught using Pokéballs and trained by battling with other
          Pokémon. Each Pokémon belongs to a specific species but may take on a
          variant which makes it differ from other Pokémon of the same species,
          such as base stats, available abilities and typings.{" "}
        </h4>
      </div>

      <div className={styles.pageOutlet}>
        <div className={styles.list}>
          {pokeList &&
            pokeList.map((pokemon, id) => (
              <div key={id} className={styles.item}>
                <Link
                  to={`/pokemons/pokemon/${pokemon.name}`}
                  className={styles.element}
                >
                  {pokemon.name}
                </Link>
                {isScreenLessThan1040px &&
                  location.pathname === `/pokemons/pokemon/${pokemon.name}` && (
                    <Outlet />
                  )}
              </div>
            ))}
          <div className={styles.loadingButtons}>
            {pokeList && offset > 0 && (
              <button onClick={loadLessPokemons}>LESS</button>
            )}
            <button onClick={loadMorePokemons}>MORE</button>
          </div>
        </div>
        {!isScreenLessThan1040px && <Outlet />}
      </div>
    </>
  );
};

export default Pokemons;
