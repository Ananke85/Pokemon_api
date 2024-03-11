import { useQuery } from "react-query";
import { getAllRegions } from "../../../../utils/apiLocations";
import styles from "../../PokemonsInfo/pokePage.module.css";
import { Link, Outlet } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";

const Regions = () => {
  const { data, isLoading } = useQuery(["locations"], getAllRegions);

  const filteredLocations =
    data && data.results.filter((region) => region.name !== "hisui");

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles.description}>
            <h1>Regions</h1>
            <p>
              Locations that can be visited within the games. Locations make up
              sizable portions of regions, like cities or routes. Pokémon
              locations in the various Pokémon games can vary depending on the
              specific game you are playing. Each game typically has different
              regions, and within these regions, you can encounter different
              Pokémon in different locations. Additionally, some Pokémon may be
              exclusive to certain games or events.{" "}
            </p>
          </div>
          <div className={styles.pageOutlet}>
            <div className={styles.list}>
              {filteredLocations?.map((region, id) => (
                <div key={id}>
                  <Link
                    to={`/pokemons/regions/${region.name}`}
                    className={styles.element}
                  >
                    {region.name}
                  </Link>
                </div>
              ))}
            </div>
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default Regions;
