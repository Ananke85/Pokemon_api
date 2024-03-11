import styles from "./about.module.css";
import pikachu from "../../assets/pikachu_smile.png";
import pokemon from "../../assets/pokemon_global.jpg";
import community from "../../assets/pokemon_community.webp";
import video from "../../assets/PokemonVideo.mp4";
import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import Spinner from "../Spinner/Spinner";

const About = () => {
  const { isLoading } = useContext(PokemonContext);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles.about}>
          <div className={styles.content}>
            <div className={styles.title}>
              <div>
                <h1>Pokémon: Beyond a game, a worldwide community</h1>
                <h4>
                  The world of Pokémon connects people across the globe, beloved
                  by kids, adults, and every Trainer in between! These
                  incredible creatures have crossed borders and language
                  barriers to reach the hearts of millions for over 25 years,
                  bringing people together through the joy of play and
                  discovery.
                </h4>
              </div>
              <img src={community} alt="Community"></img>
            </div>

            <div className={styles.quote}>
              <h3>
                Pokémon was launched in Japan in 1996 and today is one of the
                most popular children entertainment properties in the world.
              </h3>
            </div>
            <div className={styles.valuesContainer}>
              <img src={pokemon} alt="Pokemon"></img>
              <div className={styles.values}>
                <h6>Integrity</h6>
                <h6>Honesty</h6>
                <h6>Responsibility</h6>
                <h6>Professionalism</h6>
              </div>
            </div>
            <div className={styles.seasons}>
              <h3>A journey through the intros from Season 1 to 25</h3>
            </div>
            <div className={styles.videoListContainer}>
              <ul className={styles.videoList}>
                <li>Season 1: Indigo League</li>
                <li>Season 2: Orange Islands</li>
                <li>Season 3: The Johto Journeys</li>
                <li>Season 4: Johto League Champions</li>
                <li>Season 5: Master Quest</li>
                <li>Season 6: Advanced</li>
                <li>Season 7: Advanced Challenge</li>
                <li>Season 8: Advanced Battle</li>
                <li>Season 9: Battle Frontier</li>
                <li>Season 10: Diamond and Pearl</li>
                <li>Season 11: Battle Dimension</li>
                <li>Season 12: Galactic Battles</li>
                <li>Season 13: Sinnoh League Victors</li>
              </ul>
              <video className={styles.video} src={video} controls />
              <ul className={styles.videoList}>
                <li>Season 14: Black & White</li>
                <li>Season 15: Rival Destinies</li>
                <li>Season 16: Adventures in Unova</li>
                <li>Season 17: The Series XY</li>
                <li>Season 18: The Series XY</li>
                <li>Season 19: The Series XYZ</li>
                <li>Season 20: Sun & Moon</li>
                <li>Season 21: Sun & Moon - Ultra Adventures</li>
                <li>Season 22: Sun & Moon - Ultra Legends</li>
                <li>Season 23: Journeys</li>
                <li>Season 24: Master Journeys</li>
                <li>Season 25: Ultimate Journeys </li>
              </ul>
            </div>
            <div className={styles.skills}>
              <img src={pikachu} alt="Pikachu" />
              <h5>
                I am Lorena Carmona, MERN Full Stack Developer. <br />
                This website was crafted as a personal practice exercise,
                combining React and CSS skills to shape the frontend, and
                MongoDB to establish the PokéNews backend. The remaining data
                was fetched from the{" "}
                <a
                  href="https://pokeapi.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PokéAPI website
                </a>
                . <br /> If you want to see more of my work, please, do not
                hesitate to visit my{" "}
                <a
                  href="https://github.com/Ananke85"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github profile
                </a>
                .
              </h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
