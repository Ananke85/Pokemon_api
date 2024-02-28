import { useQuery } from "react-query";
import styles from "./pokemonDetails.module.css";
// import { useContext } from "react";
// import { PokemonContext } from "../../../../context/PokemonContext";
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
import PokemonEvolution from "./PokemonEvolution";
import PokemonStats from "./PokemonStats";

const PokemonDetails = () => {
  const { name } = useParams();
  const { data } = useQuery(["details", name], () => getPokemonDetails(name));
  // const { index, handleNextCard, handlePreviousCard } =
  //   useContext(PokemonContext);

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

  return (
    <>
      {data && (
        <div className={styles.outlet}>
          {/* <div className={styles.buttonWrrapper}>
              {index && index[0]?.name !== name && (
                <span
                  onClick={handlePreviousCard}
                  className="icon-point-left"
                ></span>
              )}
            </div> */}

          <div className={styles.containerCard}>
            <div
              className={`${styles.card} ${
                pokemonType ? styles[`Pokemon-${pokemonType}`] : ""
              }`}
            >
              <div className={styles.pokeName}>
                <h5>{data.species.name}</h5>
                <h5>{data.base_experience} HP</h5>
                {pokemonType && (
                  <img
                    className={styles.icon}
                    src={getTypeIconPath(pokemonType)}
                    alt={`${pokemonType} type`}
                  />
                )}
              </div>
              <div className={styles.backgroundImage}>
                <img
                  className={styles.image}
                  src={data?.sprites?.other["official-artwork"].front_default}
                  alt={data.species.name}
                />
              </div>

              <div className={styles.details}>
                <h6 className={styles.type}>{pokemonType} pokémon</h6>
                <h6>HT: {data.height} dm</h6>
                <h6>WT: {data.weight} hg</h6>
              </div>

              {primaryAbilityData && (
                <div className={styles.abilities}>
                  <div className={styles.abDescription}>
                    <h6>Primary ability:</h6>
                    <h6 className={styles.abilityTitle}>{primaryAbility}</h6>
                  </div>
                  <div className={styles.abDetails}>
                    {primaryAbilityData.effect_entries
                      .filter((entry) => entry.language.name === "en")
                      .map((entry, idx) => (
                        <p key={idx}>{entry.short_effect}</p>
                      ))}
                  </div>
                </div>
              )}

              {hiddenAbilityData && (
                <div className={styles.abilitiesHidden}>
                  <div className={styles.abDescription}>
                    <h6>Hidden ability:</h6>
                    <h6 className={styles.abilityTitle}>{hiddenAbility}</h6>
                  </div>
                  <div className={styles.abDetails}>
                    {hiddenAbilityData.effect_entries
                      .filter((entry) => entry.language.name === "en")
                      .map((entry, idx) => (
                        <p key={idx}>{entry.short_effect}</p>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <img src={backCard} className={styles.back} alt="Back Card" />
          </div>
          <div className={styles.evoStats}>
            {data && <PokemonEvolution />}
            {data && <PokemonStats />}
          </div>
          {/* <div className={styles.buttonWrrapper}>
              {index && index[13]?.name !== name && (
                // <button onClick={handleNextCard}><span className="icon-point-right"></span></button>
                <span
                  onClick={handleNextCard}
                  className="icon-point-right"
                ></span>
              )}
            </div> */}
        </div>
      )}
    </>
  );
};

export default PokemonDetails;
