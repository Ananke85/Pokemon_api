import { useQuery } from "react-query";
import styles from "./items.module.css";
import { getItemsByName } from "../../../../utils/apiItems";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ItemDetails = ({ name }) => {
  // eslint-disable-next-line react/prop-types
  const nameWithoutHyphen =
    // eslint-disable-next-line react/prop-types
    typeof name === "string" ? name.replace(/-/g, " ") : name;

  const { data } = useQuery(["item-details", name], () => getItemsByName(name));
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {data && (
        <div className={styles.itemCard}>
          <div className={styles.titleDetails}>
            <h1 className={styles.itemTitle}>{nameWithoutHyphen}</h1>
            <div className={styles.image}>
              <h2>G. Id: {data.game_indices[0].game_index}</h2>
              <img src={data.sprites.default}></img>
            </div>
          </div>

          <h3 className={styles.nonCapi}>
            {data.flavor_text_entries[0].language === "en"
              ? `${data.flavor_text_entries[0].text} Its category is ${data.category.name}.`
              : `${data.flavor_text_entries[3].text} Its category is ${data.category.name}.`}
          </h3>

          <h4 className={styles.nonCapi}>{data.effect_entries[0].effect}</h4>

          <div className={styles.grid}>
            <h4>Cost: {data.cost}</h4>
            {data.fling_effect !== null ? (
              <h4>Fling Effect: {data.fling_effect}</h4>
            ) : (
              <h4>Fling Effect: None</h4>
            )}

            {data.fling_power !== null ? (
              <h4>Fling Power: {data.fling_power}</h4>
            ) : (
              <h4>Fling Power: None</h4>
            )}
          </div>

          <div className={styles.dropdown}>
            <h3>Attributes:</h3>
            <button
              onClick={handleDropdown}
              className={!isExpanded ? styles.arrow : styles.active}
            >
              <span className="icon-circle-down"></span>
            </button>
          </div>
          {isExpanded && (
            <div className={styles.attributeContainer}>
              {data.attributes.map((attribute) => (
                <h4 key={attribute.name} className={styles.attribute}>
                  {" "}
                  {attribute.name}
                </h4>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ItemDetails;
