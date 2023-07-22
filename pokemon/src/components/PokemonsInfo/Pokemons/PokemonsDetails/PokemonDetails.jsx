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

  return (
    <>
      {data && (
        <div className={styles.outlet}>
          <div className={styles.title}>
            <h1 className={styles.name}>{data.species.name}</h1>
            <h1>in detail</h1>
          </div>
          <div className={styles.card}>
            <h3>{data.species.name}</h3>
            <img
              src={data.sprites.other["official-artwork"].front_default}
            ></img>
            <h4>Experience: {data.base_experience}</h4>
            <h4>Height: {data.height}</h4>

            <h4>Weight: {data.weight}</h4>
            {primaryAbilityData && (
              <div className={styles.abilities}>
                <h4>Primary ability: </h4>
                <h4 className={styles.abilityTitle}>{primaryAbility}.</h4>
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
                <h4>Hidden ability:</h4>
                <h4 className={styles.abilityTitle}>{hiddenAbility}.</h4>
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
