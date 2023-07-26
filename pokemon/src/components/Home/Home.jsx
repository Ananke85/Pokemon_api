import AudioPlayer from "../Music/Music";
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
          <AudioPlayer />

          <img
            src={ash}
            alt="Ash Ketchum"
            className={animateBackground ? styles.show : ""}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
