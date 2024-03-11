import { useQuery } from "react-query";
import styles from "./items.module.css";
import { getItemsByName } from "../../../../utils/apiItems";

// eslint-disable-next-line react/prop-types
const ItemDetails = ({ itemName }) => {
  // eslint-disable-next-line react/prop-types
  const nameWithoutHyphen =
    // eslint-disable-next-line react/prop-types
    typeof itemName === "string" ? itemName.replace(/-/g, " ") : itemName;

  const { data } = useQuery(["item-details", itemName], () =>
    getItemsByName(itemName)
  );

  return (
    <>
      {data && (
        <div className={styles.itemCard}>
          <div className={styles.titleDetails}>
            <h3 className={styles.itemTitle}>{nameWithoutHyphen}</h3>
            <div className={styles.imageContainer}>
              <h3>G. Id: {data.game_indices[0].game_index}</h3>
              <img src={data.sprites.default} alt={nameWithoutHyphen}></img>
            </div>
          </div>

          <p className={styles.nonCapi}>
            {data.flavor_text_entries[0].language === "en"
              ? `${data.flavor_text_entries[0].text} Its category is ${data.category.name}.`
              : `${data.flavor_text_entries[3].text} Its category is ${data.category.name}.`}
          </p>

          <p className={styles.nonCapi}>{data.effect_entries[0].effect}</p>

          <div className={styles.grid}>
            <p>Cost: {data.cost}</p>
            <p>Fling Effect: {data.fling_effect ?? "None"}</p>
            <p>Fling Power: {data.fling_power ?? "None"}</p>
          </div>

          <div className={styles.attributeContainer}>
            {data.attributes.map((attribute) => (
              <p key={attribute.name}>{attribute.name}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetails;
