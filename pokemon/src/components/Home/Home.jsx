// import AudioPlayer from "../Music/Music";
import styles from "./home.module.css";
import ash from "../../assets/ash_ketchum.png";
import { useEffect, useState } from "react";

const Home = () => {
  const [animateBackground, setAnimateBackground] = useState(false);

  useEffect(() => {
    const animationTime = setTimeout(() => {
      setAnimateBackground(true);
    }, 2000);
    return () => clearTimeout(animationTime);
  }, []);

  return (
    <>
      <div
        className={`${styles.homePage}${
          animateBackground ? ` ${styles.animate}` : ""
        }`}
      >
        <div className={styles.content}>
          {/* <AudioPlayer /> */}
          {/* <div className={styles.pokemonsDetails}>
            <h2>Pokémons</h2>
            <h2>Berries</h2>
            <h2>Items</h2>
            <h2>Regions</h2>
          </div> */}

          {/* <h1>Become a </h1> */}
          <img
            src={ash}
            alt="Ash Ketchum"
            className={animateBackground ? styles.show : ""}
          />
          {/* <h1>Pokémon Master</h1> */}
        </div>
      </div>
    </>
  );
};

export default Home;
