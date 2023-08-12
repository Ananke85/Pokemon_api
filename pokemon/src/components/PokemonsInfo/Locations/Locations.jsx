import { useQuery } from "react-query";
import { getAllLocations } from "../../../../utils/apiLocations";
import styles from "../../PokemonsInfo/pokePage.module.css";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Locations = () => {
  const { data } = useQuery(["locations"], getAllLocations);
  const limit = 13;
  const [offset, setOffset] = useState(0)
  const [locationList, setLocationList] = useState([])

  const isScreenLessThan1040px = window.innerWidth < 1040;
  useEffect(() => {
    getAllLocations(offset, limit)
      .then((data) => setLocationList(data.results))
      .catch((error) => console.log(error));
  }, [offset, limit]);

  const loadMoreLocations = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };
  const loadLessLocations = () => {
    setOffset((prevOffset) => prevOffset - limit);
  };

  useEffect(() => {
    loadMoreLocations();
  }, []);
  useEffect(() => {
    loadLessLocations();
  }, []);


  return (
    <>
      <div className={styles.description}>
        <h4>
          Locations that can be visited within the games. Locations make up
          sizable portions of regions, like cities or routes. Pokémon locations
          in the various Pokémon games can vary depending on the specific game
          you are playing. Each game typically has different regions, and within
          these regions, you can encounter different Pokémon in different
          locations. Additionally, some Pokémon may be exclusive to certain
          games or events.{" "}
        </h4>
      </div>
      <div className={styles.pageOutlet}>
        <div className={styles.list}>
          {locationList &&
            locationList.map((location, id) => (
              <div key={id}>
                <Link
                  to={`/pokemons/locations/${location.name}`}
                  className={styles.element}
                >
                  {location.name}
                </Link>
                {isScreenLessThan1040px &&
                  location.pathname === `/pokemons/locations/${location.name}` && (
                    <Outlet />
                  )}
              </div>
            ))}
          <div className={styles.loadingButtons}>
            {data && offset > 0 && (
              <button onClick={loadLessLocations}>LESS</button>
            )}
            {locationList && data?.next != null && (
              <button onClick={loadMoreLocations}>MORE</button>
            )}
          </div>
        </div>
        {!isScreenLessThan1040px && <Outlet />}
      </div>
    </>
  );
};

export default Locations;
