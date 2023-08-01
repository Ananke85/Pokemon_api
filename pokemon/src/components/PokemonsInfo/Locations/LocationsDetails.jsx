import { useQuery } from "react-query";
import {
  getLocationArea,
  getLocationByName,
} from "../../../../utils/apiLocations";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const LocationsDetails = ({ name }) => {
  // const { name } = useParams();

  const { data } = useQuery(["location-details", name], () =>
    getLocationByName(name)
  );

  const id = data && data.id;
  console.log("el id", id);

  const { data: location } = useQuery(["location", id], () =>
    getLocationArea(id)
  );
  console.log(" los detalles de la localizacion", location);

  return (
    <>
      {data && (
      <div>
        <h4>Game index: {data?.game_indices[0]?.game_index}</h4>
        {location && location.pokemon_encounters.length > 0 ? (
          <>
            <h4>Pokémons you can find in this location:</h4>
            {location.pokemon_encounters.map((encounter, index) => (
              <Link to={`/pokemons/pokemon/${encounter.pokemon.name}`} key={index}>
                <div>{encounter.pokemon.name}</div>
              </Link>
            ))}
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
