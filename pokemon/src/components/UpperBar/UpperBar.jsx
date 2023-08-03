import { BERRIES, ITEMS, POKEMONS, REGIONS } from "../../route-paths";
import { Link } from "react-router-dom";
import styles from "./upperBar.module.css";

const UpperBar = () => {

  return (
    <>
      <div className={styles.upperBar}>
        <Link to={POKEMONS}>Pokémons</Link>
        <Link to={BERRIES}>Berries</Link>
        <Link to={ITEMS}>Items</Link>
        <Link to={REGIONS}>Regions</Link>

        {/* <Link to={LOCATIONS}>Locations</Link> */}

      </div>
    </>
  );
};

export default UpperBar;
