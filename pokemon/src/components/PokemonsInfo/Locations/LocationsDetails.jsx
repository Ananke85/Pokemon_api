import { useQuery } from "react-query";
import {
  getLocationArea,
  getLocationByName,
} from "../../../../utils/apiLocations";
import { Link } from "react-router-dom";
import styles from "./locations.module.css";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const LocationsDetails = ({ name }) => {

  const { data } = useQuery(["location-details", name], () =>
    getLocationByName(name)
  );
  const id = data && data.id;
  const { data: location } = useQuery(["location", id], () =>
    getLocationArea(id)
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const handleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {data && (
        <div className={styles.detailsList}>
          <h4>Game index: {data?.game_indices[0]?.game_index}</h4>
          {location && location.pokemon_encounters.length > 0 ? (
            <>
              <div className={styles.dropdown}>
                <h4>Pokémons you can find in this location:</h4>
                <button
                  onClick={handleDropdown}
                  className={!isExpanded ? styles.arrow : styles.active}
                >
                  <span className="icon-circle-down"></span>
                </button>
              </div>
              {isExpanded && (
                <div className={styles.pokeList}>
                  {location.pokemon_encounters.map((encounter, index) => (
                    <Link
                      to={`/pokemons/pokemon/${encounter.pokemon.name}`}
                      key={index}
                      style={{ textDecoration: "none" }}
                      target="blank"
                    >
                      <li>{encounter.pokemon.name}</li>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <h4>No Pokémons found in this location.</h4>
          )}
        </div>
      )}
    </>
  );
};

export default LocationsDetails;
