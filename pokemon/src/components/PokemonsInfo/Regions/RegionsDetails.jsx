import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getRegionByName } from "../../../../utils/apiLocations";
import styles from "./regions.module.css";
import { useState } from "react";
import LocationsDetails from "../Locations/LocationsDetails";
import alola from "../../../assets/regions/alola.jpg";
import galar from "../../../assets/regions/galar.jpg";
import hoenn from "../../../assets/regions/hoenn.jpg";
import johto from "../../../assets/regions/johto.jpg";
import kalos from "../../../assets/regions/kalos.jpg";
import kanto from "../../../assets/regions/kanto.jpg";
import paldea from "../../../assets/regions/paldea.jpg";
import sinnoh from "../../../assets/regions/sinnoh.jpg";
import unova from "../../../assets/regions/unova.jpg";

const RegionDetails = () => {
  const { name } = useParams();
  const { data: regions } = useQuery(["regions", name], () =>
    getRegionByName(name)
  );
  console.log("las regiones", regions);
  const limit = 20;
  const [showLocations, setShowLocations] = useState(20);
  const handleShowMore = () => {
    setShowLocations(showLocations + limit);
  };

  const handleShowLess = () => {
    setShowLocations(showLocations - limit);
  };

  const regionImages = {
    alola: alola,
    galar: galar,
    hoenn: hoenn,
    johto: johto,
    kalos: kalos,
    kanto: kanto,
    paldea: paldea,
    sinnoh: sinnoh,
    unova: unova,
  };
  const regionImage = regionImages[name] || null;

  return (
    <>
      {regions && (
        <div className={styles.regionOutlet}>
          <div className={styles.regionTitle}>
            <h1 className={styles.nonCapi}>{regions.name} was introduced in</h1>
            {regions.main_generation && <h1>{regions.main_generation.name}</h1>}
          </div>

          <div className={styles.regionDescription}>
            {regionImage && <img src={regionImage} alt={name}></img>}
            <h2>description of {name}</h2>

          </div>

          {regions.locations.length > 0 ? (
            <div className={styles.locations}>
              <div className={styles.locationsContainer}>
                {regions.locations.slice(0, showLocations).map((region) => (
                  <div key={region.id} className={styles.locationCard}>
                    <h2>{region.name}</h2>
                    <LocationsDetails name={region.name} />
                  </div>
                ))}
              </div>
              <div className={styles.buttonsContainer}>
                <button onClick={handleShowMore}>MORE</button>
                <button onClick={handleShowLess}>LESS</button>
              </div>
            </div>
          ) : (
            <h2>No locations to display</h2>
          )}
        </div>
      )}
    </>
  );
};

export default RegionDetails;
