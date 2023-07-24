import { useQuery } from "react-query";
import styles from "./pokemonDetails.module.css";
import {
  getPokemonAbilities,
  getPokemonDetails,
  getPokemonEvolution,
  getPokemonSpecies,
} from "../../../../../utils/apiPokemons";
import { useParams } from "react-router-dom";
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
import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../../../context/PokemonContext";

const PokemonDetails = () => {
  const { name } = useParams();
  const { data } = useQuery(["details", name], () => getPokemonDetails(name));
  const { data: species } = useQuery(["species", name], () =>
    getPokemonSpecies(name)
  );
  const { currentIndex, handleNextCard, handlePreviousCard } =
    useContext(PokemonContext);

  // console.log("las species", species);
  // console.log("la data", data)

  // const evolutesFrom = species && species.evolves_from_species.name;
  // console.log("evoluciona de:", evolutesFrom);

  const description = species && species.flavor_text_entries;
  console.log("la descripcion", description);
  const remove = (text) => {
    return text.replace(/[^\x20-\x7E]/g, " ");
  };

  // Para extraer el id y pasarlo a la api
  const url = species && species.evolution_chain.url;
  const regex = /\/(\d+)\/$/;
  const match = species && url.match(regex);
  const id = match ? match[1] : null;
  // console.log("el numero", id);

  const { data: chain } = useQuery(["evolution", id], () =>
    getPokemonEvolution(id)
  );
  // console.log("la chain", chain)

  //Para obtener los nombres de los Pokémons evolucionados
  // const pokemonName = data && data.species.name;

  // console.log("el nombre del pokemon", pokemonName);
  const [firstEvoImg, setFirstEvoImg] = useState("");
  const [secondEvoImg, setSecondEvoImg] = useState("");

  const firstEvolution = chain && chain.chain.evolves_to[0].species?.name;
  // console.log("primera evo", firstEvolution);

  const secondEvolution =
    chain && chain.chain.evolves_to[0].evolves_to[0].species?.name;
  // console.log("la segunda evo", secondEvolution);

  const getFirstEvoImg = async () => {
    try {
      const data = await getPokemonDetails(firstEvolution);
      const img = data?.sprites?.other["official-artwork"].front_default;
      setFirstEvoImg(img);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (firstEvolution) {
      getFirstEvoImg(firstEvolution);
    }
  });

  const getSecondEvoImg = async () => {
    try {
      const data = await getPokemonDetails(secondEvolution);
      const img = data?.sprites?.other["official-artwork"].front_default;
      setSecondEvoImg(img);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (secondEvolution) {
      getSecondEvoImg(secondEvolution);
    }
  });

  // const isFinalEvolution = () => {
  //   // Check if there's a second evolution and if the current Pokémon is the second evolution
  //   if (secondEvolution && data.species.name === secondEvolution) {
  //     return true;
  //   }

  //   // Check if there's a first evolution and if the current Pokémon is the first evolution
  //   if (firstEvolution && data.species.name === firstEvolution) {
  //     // Check if there's a second evolution (to prevent displaying "Final Evolution" when there's only one evolution)
  //     return !secondEvolution;
  //   }

  //   // If none of the above conditions match, then it's not the final evolution
  //   return false;
  // };

  // const pokemonEvolution = [pokemonName, firstEvolution, secondEvolution]
  // console.log("la evolucion", pokemonEvolution)

  // const evolution_chain = () => {
  //   if  (pokemonName === data.species.name ) {
  //     pokemonEvolution.splice(pokemonName)
  //   } else if {
  //     (pokemonName === firstEvolution || data.species.name ){
  //       pokemonEvolution.splice(firstEvolution)
  //     }
  //   } else {

  //   }

  //   }
  // }

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

  return (
    <>
      {data && species && chain && (
        <div className={styles.outlet}>
          {/* <div className={styles.title}>
            <h1 className={styles.name}>{data.species.name}</h1>
            <h1>in detail</h1>
          </div> */}
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
              <div className={styles.evolution}>
                <h2 className={styles.evolutionTitle}>Evolutes to:</h2>
                <div className={styles.pokeEvolution}>
                  {firstEvolution && (
                    <div>
                      <h3>{firstEvolution}</h3>
                      <img
                        src={firstEvoImg}
                        className={`${styles.mini} ${
                          pokemonType ? styles[`Pokemon-${pokemonType}`] : ""
                        }`}
                      ></img>
                    </div>
                  )}

                  {secondEvolution && (
                    <div>
                      <h3>{secondEvolution}</h3>
                      <img
                        src={secondEvoImg}
                        className={`${styles.mini} ${
                          pokemonType ? styles[`Pokemon-${pokemonType}`] : ""
                        }`}
                      ></img>
                    </div>
                  )}

                  {/* {isFinalEvolution() && <h2>Final evolution</h2>} */}
                </div>
              </div>
              <div className={styles.description}>
                <div className={styles.descTitle}>
                <h2>{data.species.name}</h2>
                <h2 className={styles.inDetail}>in detail:</h2>
                </div>
                <h5>
                  {remove(description[0].flavor_text)}{" "}
                  {remove(description[2].flavor_text)}
                  {remove(description[3].flavor_text)} <br /><br />{" "}
                  {remove(description[6].flavor_text)}{" "}
                  {remove(description[8].flavor_text)} <br /><br />
                  {remove(description[12].flavor_text)}{" "}
                  {remove(description[71].flavor_text)}
                </h5>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            {currentIndex !== 0 && (
              <button onClick={handlePreviousCard}>PREVIOUS</button>
            )}

            {currentIndex < 14 && (
              <button onClick={handleNextCard}>NEXT</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonDetails;
