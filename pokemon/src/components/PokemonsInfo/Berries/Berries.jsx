import { useQuery } from "react-query";
import styles from "../pokePage.module.css";
import { getAllBerries } from "../../../../utils/apiBerries";
import BerriesDetails from "./BerriesDetails";
import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";

const Berries = () => {
  const limit = 12;
  const [offset, setOffset] = useState(0);
  const [, setBerryList] = useState([]);

  const { data, isLoading } = useQuery(["berries", offset], () =>
    getAllBerries(offset, limit)
  );
  const names = data && data.results?.map((berry) => berry.name);

  useEffect(() => {
    if (data) {
      setBerryList((prevList) => [...prevList, ...data.results]);
    }
  }, [data, offset]);

  const loadMoreBerries = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const showLessBerries = () => {
    setOffset((prevOffset) => prevOffset - limit);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles.pageContainer}>
            <div className={styles.description}>
              <h4>
                Berries are small fruits that with a large range of flavors and
                effects. First found in the Generation II games, many Berries
                have since become critical held items in battle, where their
                various effects include HP and status condition restoration,
                stat enhancement, and even damage negation.
              </h4>
            </div>
            <div className={styles.grid}>
              {names &&
                names.map((name) => (
                  <BerriesDetails key={name} berryName={name} />
                ))}
            </div>
            {data && (
              <div className={styles.loadingButtonsBerries}>
                {data && offset > 0 && (
                  <button onClick={showLessBerries}>LESS</button>
                )}
                {data && data.next != null && (
                  <button onClick={loadMoreBerries}>MORE</button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Berries;
