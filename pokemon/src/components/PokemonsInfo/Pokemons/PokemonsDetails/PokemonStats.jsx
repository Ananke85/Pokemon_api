import { useEffect, useState } from "react";
import styles from "./pokemonDetails.module.css";

const PokemonStats = () => {
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const min = 10;
    const max = 200;
    const attack = Math.floor(Math.random() * (max - min + 1)) + min;
    const defense = Math.floor(Math.random() * (max - min + 1)) + min;
    const power = Math.floor(Math.random() * (max - min + 1)) + min;
    const speed = Math.floor(Math.random() * (max - min + 1)) + min;

    setRandomNumber({ attack, defense, power, speed });
  }, []);
  return (
    <>
      <div className={styles.statsContainer}>
        <h3>
          {randomNumber && (
            <div className={styles.stats}>
              <div>Attack</div> <div> {randomNumber.attack}</div>
            </div>
          )}
        </h3>
        <h3>
          {randomNumber && (
            <div className={styles.stats}>
              <div>Defense</div> <div> {randomNumber.defense}</div>
            </div>
          )}
        </h3>
        <h3>
          {randomNumber && (
            <div className={styles.stats}>
              <div>Power</div> <div> {randomNumber.power}</div>
            </div>
          )}
        </h3>
        <h3>
          {randomNumber && (
            <div className={styles.stats}>
              <div>Speed</div> <div> {randomNumber.speed}</div>
            </div>
          )}
        </h3>
      </div>
    </>
  );
};

export default PokemonStats;
