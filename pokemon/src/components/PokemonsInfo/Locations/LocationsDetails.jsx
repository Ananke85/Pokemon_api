import { useQuery } from "react-query";
import {
  getLocationArea,
  getLocationByName,
} from "../../../../utils/apiLocations";
import { Link } from "react-router-dom";
import styles from "./locations.module.css";

// eslint-disable-next-line react/prop-types
const LocationsDetails = ({ name }) => {
  const { data } = useQuery(["location-details", name], () =>
    getLocationByName(name)
  );
  const id = data && data.id;
  const { data: location } = useQuery(["location", id], () =>
    getLocationArea(id)
  );

 

  return (
    <>
      {data && (
        <div className={styles.detailsList}>
          <p>Game index: {data?.game_indices[0]?.game_index}</p>
          {location && location.pokemon_encounters.length > 0 ? (
            <>
              <div className={styles.dropdown}>
                <p>Pokémons you can find in this location:</p>
              </div>
              <div className={styles.pokeList}>
                {location.pokemon_encounters.map((encounter, index) => (
                  <Link
                    to={`/pokemons/pokemon/${encounter.pokemon.name}`}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <li>{encounter.pokemon.name}</li>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <p>No Pokémons found in this location.</p>
          )}
        </div>
      )}

    </>

  );
};

export default LocationsDetails;
