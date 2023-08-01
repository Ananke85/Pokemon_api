import { useQuery } from "react-query";
import { getAllRegions } from "../../../../utils/apiLocations";
import styles from "../../PokemonsInfo/pokePage.module.css";
import { Link, Outlet } from "react-router-dom";

const Regions = () => {
  const { data } = useQuery(["locations"], getAllRegions);
  console.log("las locations", data);

  const isScreenLessThan1040px = window.innerWidth < 1040;

  const filteredLocations =
    data && data.results.filter((region) => region.name !== "hisui");

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
          {data &&
            filteredLocations.map((region, id) => (
              <div key={id}>
                <Link
                  to={`/pokemons/regions/${region.name}`}
                  className={styles.element}
                >
                  {region.name}
                </Link>
                {isScreenLessThan1040px &&
                  region.pathname === `/pokemons/regions/${region.name}` && (
                    <Outlet />
                  )}
              </div>
            ))}
        </div>
        {!isScreenLessThan1040px && <Outlet />}
      </div>
    </>
  );
};

export default Regions;
