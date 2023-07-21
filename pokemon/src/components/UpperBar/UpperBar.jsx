import { BERRIES, POKEMONS } from "../../route-paths";
import { Link } from "react-router-dom";
import styles from "./upperBar.module.css";

const UpperBar = () => {
  return (
    <>
      <div className={styles.upperBar}>
        <Link to={POKEMONS}>Pokémons</Link>
        <Link to={BERRIES}>Berries</Link>
      </div>
    </>
  );
};

export default UpperBar;

{/* <div className={styles.pokePage}>
        <UpperBar />

        <Routes>
          <Route path="" element={<Pokemons />}>
            <Route path={POKEMONS} element={<Pokemons />} />
            <Route path={POKEMON_DETAILS} element={<PokemonDetails />} />
          </Route>
          <Route path={BERRIES} element={<Berries />}>
            <Route path="pokemon/:berryName" element={<PokemonDetails />} />
          </Route>
        </Routes>
      </div> */}
