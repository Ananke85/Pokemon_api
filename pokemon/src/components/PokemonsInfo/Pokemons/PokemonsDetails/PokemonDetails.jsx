import { useQuery } from "react-query";
import styles from "./pokemonDetails.module.css";
import {
  getPokemonAbilities,
  getPokemonDetails,
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
import { useContext } from "react";
import { PokemonContext } from "../../../../context/PokemonContext";

const PokemonDetails = () => {
  const { name } = useParams();
  const { data } = useQuery(["details", name], () => getPokemonDetails(name));
  const { currentIndex, handleNextCard, handlePreviousCard } = useContext(PokemonContext);

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

  // console.log("la data", data)

  return (
    <>
      {data && (
        <div className={styles.outlet}>
          {/* <div className={styles.title}>
            <h1 className={styles.name}>{data.species.name}</h1>
            <h1>in detail</h1>
          </div> */}
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
                    <h5>Primary ability:</h5>
                    <h5 className={styles.abilityTitle}>{primaryAbility}.</h5>
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
                    <h5>Hidden ability:</h5>
                    <h5 className={styles.abilityTitle}>{hiddenAbility}.</h5>
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
