import styles from "../pokePage.module.css";
import { getAllPokemons } from "../../../../utils/apiPokemons";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../../Spinner/Spinner";

const Pokemons = () => {
  const { data, isLoading } = useQuery(["pokes"], getAllPokemons);
  const limit = 11;
  const [offset, setOffset] = useState(0);
  const [pokeList, setPokeList] = useState([]);
  const mobDimension = 376;
  const [mobileScreen, setMobileScreen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      setMobileScreen(window.innerWidth <= mobDimension);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobDimension]);

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
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles.description}>
            <h1>Pokémons</h1>
            <p>
              Pokémon are the creatures that inhabit the world of the Pokémon
              games. They can be caught using Pokéballs and trained by battling
              with other Pokémon. Each Pokémon belongs to a specific species but
              may take on a variant which makes it differ from other Pokémon of
              the same species, such as base stats, available abilities and
              typings.{" "}
            </p>
          </div>

          <div className={styles.pageOutlet}>
            <div className={styles.list}>
              {pokeList &&
                pokeList.map((pokemon, id) => (
                  <div key={id}>
                    <Link to={`/pokemons/pokemon/${pokemon.name}`}>
                      {pokemon.name}
                    </Link>
                  </div>
                ))}
              <div className={styles.loadingButtons}>
                {pokeList && offset > 0 && (
                  <button onClick={loadLessPokemons}>LESS</button>
                )}
                {pokeList && data?.next != null && (
                  <button onClick={loadMorePokemons}>MORE</button>
                )}
              </div>
            </div>
            <Outlet />
            {mobileScreen && <button onClick={scrollToTop}>Back to Top</button>}
          </div>
        </>
      )}
    </>
  );
};

export default Pokemons;
