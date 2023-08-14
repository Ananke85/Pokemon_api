import styles from "./pokePage.module.css";
import UpperBar from "../UpperBar/UpperBar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import Spinner from "../Spinner/Spinner";

const PokePage = () => {
  const { isLoading } = useContext(PokemonContext);
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles.pokePage}>
            <UpperBar />
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default PokePage;
