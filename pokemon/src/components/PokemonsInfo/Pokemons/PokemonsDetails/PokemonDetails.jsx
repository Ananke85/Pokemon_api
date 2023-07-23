import { useQuery } from "react-query";
import styles from "./pokemonDetails.module.css";
import {
  getPokemonAbilities,
  getPokemonDetails,
} from "../../../../../utils/apiPokemons";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { name } = useParams();
  const { data } = useQuery(["details", name], () => getPokemonDetails(name));

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

  console.log("el tipo", pokemonType);

  console.log("la data", data);

  return (
    <>
      {data && (
        <div className={styles.outlet}>
          {/* <div className={styles.title}>
            <h1 className={styles.name}>{data.species.name}</h1>
            <h1>in detail</h1>
          </div> */}
          <div
            className={`${styles.card} ${
              pokemonType ? styles[`Pokemon-${pokemonType}`] : ""
            }`}
          >
            <div className={styles.pokeName}>
              <h3>{data.species.name}</h3>
              <h4>Experience: {data.base_experience} HP</h4>
            </div>

            <img
              className={styles.image}
              src={data.sprites.other["official-artwork"].front_default}
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
              <div className={styles.abilities}>
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
        </div>
      )}
    </>
  );
};

export default PokemonDetails;
