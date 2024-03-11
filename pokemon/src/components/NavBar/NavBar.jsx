import styles from "./navBar.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/pokemon_logo.png";
import { ABOUT, BLOG, HOME, POKEPAGE } from "../../route-paths";
import AudioPlayer from "../Music/Music";

const NavBar = () => {
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.content}>
          <Link to={HOME}>
            <img src={logo} alt="pokemon logo" className={styles.logo} />
          </Link>

          {/* <div className={styles.searchBar}>
            <h6 className={styles.search}>Find your Pokémon</h6>
            <button>SEARCH</button>
          </div> */}

          <div className={styles.links}>
            <Link to={POKEPAGE}>POKÉMONS</Link>
            <Link to={ABOUT}>ABOUT</Link>
            <Link to={BLOG}>POKÉNEWS</Link>
            <AudioPlayer />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
