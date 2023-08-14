import { useQuery } from "react-query";
import { getAllItems } from "../../../../utils/apiItems";
import styles from "../pokePage.module.css";
import ItemDetails from "./ItemsDetails";
import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";

const Items = () => {
  const limit = 12;
  const [offset, setOffset] = useState(0);
  const [, setItemsList] = useState([]);

  const { data: items, isLoading } = useQuery(["items", offset, limit], () =>
    getAllItems(offset, limit)
  );

  const itemNames = items && items.results?.map((item) => item.name);

  useEffect(() => {
    if (items) {
      setItemsList((prevList) => [...prevList, ...items.results]);
    }
  }, [items, offset]);

  const loadMoreItems = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const showLessItems = () => {
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
                An item is an object in the games which the player can pick up,
                keep in their bag, and use in some manner. They have various
                uses, including healing, powering up, helping catch Pokémon, or
                to access a new area.
              </h4>
            </div>

            <div className={styles.itemsContainer}>
              {itemNames &&
                itemNames.map((name) => <ItemDetails key={name} name={name} />)}
            </div>
          </div>

          {items && (
            <div className={styles.loadingButtonsItems}>
              {items && offset > 0 && (
                <button onClick={showLessItems}>LESS</button>
              )}
              {items && items.next != null && (
                <button onClick={loadMoreItems}>MORE</button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Items;
