import styles from "./pokePage.module.css";
import UpperBar from "../UpperBar/UpperBar";
import { Outlet } from "react-router-dom";

const PokePage = () => {
  return (
    <>
      <div className={styles.pokePage}>
        <UpperBar/>
        <Outlet/>
      </div>
    </>
  );
};

export default PokePage;
