import { useEffect, useState } from "react";
import {
  getPokemonDetails,
  getPokemonEvolution,
  getPokemonSpecies,
} from "../../../../../utils/apiPokemons";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import pikachu from "../../../../assets/pikachu.png";
import styles from "./pokemonDetails.module.css";

const PokemonEvolution = () => {
  const { name } = useParams();
  const { data } = useQuery(["details", name], () => getPokemonDetails(name));
  const { data: species } = useQuery(["species", name], () =>
    getPokemonSpecies(name)
  );

  const remove = (text) => {
    return text.replace(/[^\x20-\x7E]/g, " ");
  };

  // Para extraer el id y pasarlo a la api
  const url = species && species.evolution_chain.url;
  const regex = /\/(\d+)\/$/;
  const match = species && species && url.match(regex);
  const id = match ? match[1] : null;

  const { data: chain } = useQuery(["evolution", id], () =>
    getPokemonEvolution(id)
  );

  // Pokemon Evolution
  const pokemonName = data && data?.species?.name;

  const firstPokemon = chain && chain?.chain?.species?.name;
  const secondPokemon = chain && chain?.chain?.evolves_to[0]?.species?.name;
  const thirdPokemon =
    chain && chain?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;

  const evolutionHandler = (initialPokemonEvolution, pokemonName) => {
    const [firstPokemon, secondPokemon, thirdPokemon] = initialPokemonEvolution;

    if (thirdPokemon === pokemonName) {
      return [];
    } else if (secondPokemon === pokemonName) {
      return thirdPokemon ? [thirdPokemon] : [];
    } else if (firstPokemon === pokemonName) {
      return thirdPokemon ? [secondPokemon, thirdPokemon] : [secondPokemon];
    } else {
      return initialPokemonEvolution;
    }
  };

  const pokemonEvolution = evolutionHandler(
    [firstPokemon, secondPokemon, thirdPokemon],
    pokemonName
  );

  const [firstEvoImg, setFirstEvoImg] = useState("");
  const [secondEvoImg, setSecondEvoImg] = useState("");
  const [, setImagesLoaded] = useState(false);

  // Fetch and set the first evolution image URL
  useEffect(() => {
    const getFirstEvoImg = async () => {
      try {
        if (secondPokemon) {
          const data = await getPokemonDetails(secondPokemon);
          const img = data?.sprites?.other["official-artwork"].front_default;
          setFirstEvoImg(img);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFirstEvoImg();
  }, [secondPokemon]);

  // Fetch and set the second evolution image URL
  useEffect(() => {
    const getSecondEvoImg = async () => {
      try {
        if (thirdPokemon) {
          const data = await getPokemonDetails(thirdPokemon);
          const img = data?.sprites?.other["official-artwork"].front_default;
          setSecondEvoImg(img);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSecondEvoImg();
  }, [thirdPokemon]);

  // Check if both image URLs are ready
  useEffect(() => {
    if (firstEvoImg && secondEvoImg) {
      setImagesLoaded(true);
    }
  }, [firstEvoImg, secondEvoImg]);

  const pokemonType = data && data.types[0]?.type.name;
  const description = species && species.flavor_text_entries;

  return (
    <>
      <div className={styles.rightColumn}>
        <div>
          {pokemonEvolution.length > 0 && (
            <div className={styles.evolution}>
              <h4>Evolutes to:</h4>
              <div className={styles.pokeEvolution}>
                {pokemonEvolution.map((pokemon, index) => (
                  <div key={index}>
                    <h5>{pokemon}</h5>
                    <Link to={`/pokemons/pokemon/${pokemon}`}>
                      {pokemon === secondPokemon && firstEvoImg && (
                        <img
                          src={firstEvoImg}
                          className={`${styles.mini} ${
                            pokemonType ? styles[`Pokemon-${pokemonType}`] : ""
                          }`}
                          alt={pokemon}
                        />
                      )}
                    </Link>
                    <Link to={`/pokemons/pokemon/${pokemon}`}>
                      {pokemon === thirdPokemon && secondEvoImg && (
                        <img
                          src={secondEvoImg}
                          className={`${styles.mini} ${
                            pokemonType ? styles[`Pokemon-${pokemonType}`] : ""
                          }`}
                          alt={pokemon}
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pokemonEvolution.length === 0 && (
              <div className={styles.topEvolution}>
                <p>TOP</p>
                <img src={pikachu} alt="Top Evolution" />
                <p>EVOLUTION</p>
              </div>
          )}
        </div>

        {species && description ? (
          <div className={styles.description}>
            <div className={styles.descTitle}>
              <h4>{data.species.name}</h4>
              <h4 className={styles.inDetail}>in detail:</h4>
            </div>
            <p>
              {remove(description[0].flavor_text)}{" "}
              {remove(description[2].flavor_text)}
              {remove(description[3].flavor_text)} <br />
              <br /> {remove(description[6].flavor_text)}{" "}
              {remove(description[8].flavor_text)}
              {remove(description[12].flavor_text)}{" "}
              {remove(description[28].flavor_text)}
            </p>
          </div>
        ) : (
          <h5 className={styles.noDescription}>No description available</h5>
        )}
      </div>
    </>
  );
};

export default PokemonEvolution;
