import { useQuery } from "react-query";
import styles from "./pokemonDetails.module.css";
import {
  getPokemonAbilities,
  getPokemonDetails,
  getPokemonEvolution,
  getPokemonSpecies,
} from "../../../../../utils/apiPokemons";
import { Link, useParams } from "react-router-dom";
import normalIcon from "../../../../assets/type_normal.png";
import fireIcon from "../../../../assets/type_fire.png";
import waterIcon from "../../../../assets/type_water.png";
import grassIcon from "../../../../assets/type_grass.png";
import electricIcon from "../../../../assets/type_electric.png";
import iceIcon from "../../../../assets/type_ice.png";
import fightingIcon from "../../../../assets/type_fighting.png";
import poisonIcon from "../../../../assets/type_poison.png";
import groundIcon from "../../../../assets/type_ground.png";
import flyingIcon from "../../../../assets/type_flying.png";
import psychicIcon from "../../../../assets/type_psychic.png";
import bugIcon from "../../../../assets/type_bug.png";
import rockIcon from "../../../../assets/type_rock.png";
import ghostIcon from "../../../../assets/type_ghost.png";
import dragonIcon from "../../../../assets/type_dragon.png";
import darkIcon from "../../../../assets/type_dark.png";
import steelIcon from "../../../../assets/type_steel.png";
import fairyIcon from "../../../../assets/type_fairy.png";
import backCard from "../../../../assets/back_card.png";
import pikachu from "../../../../assets/pikachu.png";

import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../../../context/PokemonContext";

const PokemonDetails = () => {
  const { name } = useParams();
  const { data } = useQuery(["details", name], () => getPokemonDetails(name));
  const { data: species } = useQuery(["species", name], () =>
    getPokemonSpecies(name)
  );

  const { index, handleNextCard, handlePreviousCard } =
    useContext(PokemonContext);

  const description = species && species.flavor_text_entries;

  // console.log("la descripcion", description);
  const remove = (text) => {
    return text.replace(/[^\x20-\x7E]/g, " ");
  };

  // Para extraer el id y pasarlo a la api
  const url = species && species.evolution_chain.url;
  const regex = /\/(\d+)\/$/;
  const match = species && species && url.match(regex);
  const id = match ? match[1] : null;
  // console.log("el numero", id);

  const { data: chain } = useQuery(["evolution", id], () =>
    getPokemonEvolution(id)
  );
  // console.log("la chain", chain)

  // Pokemon Evolution
  const pokemonName = data && data?.species?.name;

  const firstPokemon = chain && chain?.chain?.species?.name;
  // console.log("el primer pokemon", firstPokemon)

  const secondPokemon = chain && chain?.chain?.evolves_to[0]?.species?.name;
  // console.log("primera evo", secondPokemon);

  const thirdPokemon =
    chain && chain?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;
  // console.log("la segunda evo", thirdPokemon);

  const evolutionHandler = (initialPokemonEvolution, pokemonName) => {
    const [firstPokemon, secondPokemon, thirdPokemon] = initialPokemonEvolution;

    if (thirdPokemon === pokemonName) {
      return [];
    } else if (secondPokemon === pokemonName) {
      return [thirdPokemon];
    } else if (firstPokemon === pokemonName) {
      return [secondPokemon, thirdPokemon];
    } else {
      return initialPokemonEvolution;
    }
  };

  const pokemonEvolution = evolutionHandler(
    [firstPokemon, secondPokemon, thirdPokemon],
    pokemonName
  );

  // console.log("la evolucion resultante", pokemonEvolution);

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

  // Pokemon Abilities
  const primaryAbility = data && data.abilities[0]?.ability.name;
  const hiddenAbility = data && data.abilities[1]?.ability.name;

  const { data: primaryAbilityData } = useQuery(
    ["abilities", primaryAbility],
    () => getPokemonAbilities(primaryAbility)
  );
  const { data: hiddenAbilityData } = useQuery(
    ["abilities", hiddenAbility],
    () => getPokemonAbilities(hiddenAbility)
  );

  // Pokemon type and icon
  const pokemonType = data && data.types[0]?.type.name;

  const pokemonIcon = {
    normal: normalIcon,
    fire: fireIcon,
    water: waterIcon,
    grass: grassIcon,
    electric: electricIcon,
    ice: iceIcon,
    fighting: fightingIcon,
    poison: poisonIcon,
    ground: groundIcon,
    flying: flyingIcon,
    psychic: psychicIcon,
    bug: bugIcon,
    rock: rockIcon,
    ghost: ghostIcon,
    dragon: dragonIcon,
    dark: darkIcon,
    steel: steelIcon,
    fairy: fairyIcon,
  };

  const getTypeIconPath = (pokemonType) => {
    return pokemonIcon[pokemonType.toLowerCase()] || "";
  };

  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const min = 10;
    const max = 200;
    const attack = Math.floor(Math.random() * (max - min + 1)) + min;
    const defense = Math.floor(Math.random() * (max - min + 1)) + min;
    const power = Math.floor(Math.random() * (max - min + 1)) + min;
    const speed = Math.floor(Math.random() * (max - min + 1)) + min;

    setRandomNumber({ attack, defense, power, speed });
  }, []);

  return (
    <>
      {data && chain && (
        <div className={styles.outlet}>
          <div className={styles.firstRow}>
            <div className={styles.container}>
              <div
                className={`${styles.card} ${
                  pokemonType ? styles[`Pokemon-${pokemonType}`] : ""
                }`}
              >
                <div className={styles.pokeName}>
                  <h2>{data.species.name}</h2>
                  <h2>{data.base_experience} HP</h2>
                  {pokemonType && (
                    <img
                      className={styles.icon}
                      src={getTypeIconPath(pokemonType)}
                      alt={`${pokemonType} type`}
                    ></img>
                  )}
                </div>

                <img
                  className={styles.image}
                  src={data?.sprites?.other["official-artwork"].front_default}
                ></img>

                <div className={styles.details}>
                  <h4 className={styles.type}>{pokemonType} pokémon</h4>
                  <h4>HT: {data.height} dm</h4>
                  <h4>WT: {data.weight} hg</h4>
                </div>

                {primaryAbilityData && (
                  <div className={styles.abilities}>
                    <div className={styles.abDescription}>
                      <h4>Primary ability:</h4>
                      <h4 className={styles.abilityTitle}>{primaryAbility}</h4>
                    </div>
                    <p>
                      {primaryAbilityData.effect_entries
                        .filter((entry) => entry.language.name === "en")
                        .map((entry) => (
                          <div key={entry.name}>{entry.short_effect}</div>
                        ))}
                    </p>
                  </div>
                )}

                {hiddenAbilityData && (
                  <div className={styles.abilitiesHidden}>
                    <div className={styles.abDescription}>
                      <h4>Hidden ability:</h4>
                      <h4 className={styles.abilityTitle}>{hiddenAbility}</h4>
                    </div>
                    <p>
                      {hiddenAbilityData.effect_entries
                        .filter((entry) => entry.language.name === "en")
                        .map((entry) => (
                          <div key={entry.name}>{entry.short_effect}</div>
                        ))}
                    </p>
                  </div>
                )}
              </div>
              <img src={backCard} className={styles.back}></img>
            </div>

            <div className={styles.rightColumn}>
              {pokemonEvolution.length > 0 && (
                <div className={styles.evolution}>
                  <h2 className={styles.evolutionTitle}>Evolutes to:</h2>
                  <div className={styles.pokeEvolution}>
                    {pokemonEvolution.map((pokemon, index) => (
                      <div key={index}>
                        <h3>{pokemon}</h3>
                        <Link to={`/pokemons/pokemon/${pokemon}`}>
                          {pokemon === secondPokemon && firstEvoImg && (
                            <img
                              src={firstEvoImg}
                              className={`${styles.mini} ${
                                pokemonType
                                  ? styles[`Pokemon-${pokemonType}`]
                                  : ""
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
                                pokemonType
                                  ? styles[`Pokemon-${pokemonType}`]
                                  : ""
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
                <div className={styles.evolution}>
                  <div className={styles.topEvolution}>
                    <h1>TOP</h1>
                    <img src={pikachu} alt="Top Evolution" />
                    <h1>EVOLUTION</h1>
                  </div>
                </div>
              )}

              {species && (
                <div className={styles.description}>
                  <div className={styles.descTitle}>
                    <h2>{data.species.name}</h2>
                    <h2 className={styles.inDetail}>in detail:</h2>
                  </div>
                  <h5>
                    {remove(description[0].flavor_text)}{" "}
                    {remove(description[2].flavor_text)}
                    {remove(description[3].flavor_text)} <br />
                    <br /> {remove(description[6].flavor_text)}{" "}
                    {remove(description[8].flavor_text)}
                    <br />
                    {remove(description[12].flavor_text)}{" "}
                    {remove(description[71].flavor_text)}
                  </h5>
                </div>
              )}
            </div>
          </div>

          <div className={styles.buttons}>
            {index[0].name !== name && (
              <button onClick={handlePreviousCard}>PREVIOUS</button>
            )}
            {index[14].name !== name && (
              <button onClick={handleNextCard}>NEXT</button>
            )}
          </div>

          <div className={styles.statsContainer}>
            <h3>
              {randomNumber && (
                <div className={styles.stats}>
                  <div>Attack</div> <div> {randomNumber.attack}</div>
                </div>
              )}
            </h3>
            <h3>
              {randomNumber && (
                <div className={styles.stats}>
                  <div>Defense</div> <div> {randomNumber.defense}</div>
                </div>
              )}
            </h3>
            <h3>
              {randomNumber && (
                <div className={styles.stats}>
                  <div>Power</div> <div> {randomNumber.power}</div>
                </div>
              )}
            </h3>
            <h3>
              {randomNumber && (
                <div className={styles.stats}>
                  <div>Speed</div> <div> {randomNumber.speed}</div>
                </div>
              )}
            </h3>

            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonDetails;

// const firstEvolution = (pokemonEvolution, pokemonName) => {
//   if (pokemonEvolution[0] === pokemonName) {
//     return [secondPokemon, thirdPokemon]
//   } else {
//     return pokemonEvolution
//   }
// };

// const secondEvolution = (pokemonEvolution, pokemonName) => {
//   if (pokemonEvolution[1] === pokemonName) {
//     return [thirdPokemon]
//   } else {
//     return pokemonEvolution
//   }
// };

// const finalEvolution = (pokemonEvolution, pokemonName) => {
//   if (pokemonEvolution[2] === pokemonName) {
//     return []
//   } else {
//     return pokemonEvolution
//   }
// };

// const evolutesFrom = species && species.evolves_from_species.name;
// console.log("evoluciona de:", evolutesFrom);
