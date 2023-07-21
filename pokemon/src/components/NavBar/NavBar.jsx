import styles from "./navBar.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/pokemon_logo.png";
import { ABOUT_US, BLOG, HOME, POKEPAGE } from "../../route-paths";

const NavBar = () => {
  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.content}>
        <Link to={HOME}>
          <img src={logo} alt="pokemon logo" className={styles.logo} />
        </Link>

        <div className={styles.searchBar}>
          <h5 className={styles.search}>Encuentra tu Pokémon</h5>
          <button>BUSCAR</button>
        </div>

        <div className={styles.links}>
          <Link to={POKEPAGE}>POKÉMONS</Link>
          <Link to={ABOUT_US}>ABOUT US</Link>
          <Link to={BLOG}>BLOG</Link>
        </div>
        </div>
        
      </nav>
    </>
  );
};

export default NavBar;
