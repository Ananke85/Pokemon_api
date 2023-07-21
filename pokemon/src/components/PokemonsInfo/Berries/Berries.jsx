import { useQuery } from "react-query";
import styles from "../pokePage.module.css";
import { getAllBerries } from "../../../../utils/apiPokemons";
import { Link } from "react-router-dom";

const Berries = () => {
  const { data: berries } = useQuery(["berries"], getAllBerries);

  console.log("las berries", berries);

  return (
    <>
      <div className={styles.list}>
        {berries &&
          berries.results?.map((berry) => (
            <Link
              key={berry.name}
              to={`/pokemons/pokemon/${berry.name}`}
              className={styles.element}
            >
              {berry.name}{" "}
            </Link>
          ))}
      </div>
    </>
  );
};

export default Berries;
