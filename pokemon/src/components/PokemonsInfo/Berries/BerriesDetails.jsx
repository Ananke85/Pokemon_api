import { useQuery } from "react-query";
import { getBerriesDetails } from "../../../../utils/apiBerries";
import styles from "../Pokemons/PokemonsDetails/pokemonDetails.module.css";
import aguav from "../../../assets/Berries/aguav.png";
import apicot from "../../../assets/Berries/apicot.png";
import aspear from "../../../assets/Berries/aspear.png";
import babiri from "../../../assets/Berries/babiri.png";
import charti from "../../../assets/Berries/charti.png";
import cheri from "../../../assets/Berries/cheri.png";
import chesto from "../../../assets/Berries/chesto.png";
import chople from "../../../assets/Berries/chople.png";
import coba from "../../../assets/Berries/coba.png";
import colbur from "../../../assets/Berries/colbur.png";
import figy from "../../../assets/Berries/figy.png";
import ganlon from "../../../assets/Berries/ganlon.png";
import grepa from "../../../assets/Berries/grepa.png";
import haban from "../../../assets/Berries/haban.png";
import hondew from "../../../assets/Berries/hondew.png";
import iapapa from "../../../assets/Berries/iapapa.png";
import kasib from "../../../assets/Berries/kasib.png";
import kebia from "../../../assets/Berries/kebia.png";
import kelpsy from "../../../assets/Berries/kelpsy.png";
import lansat from "../../../assets/Berries/lansat.png";
import leppa from "../../../assets/Berries/leppa.png";
import liechi from "../../../assets/Berries/liechi.png";
import lum from "../../../assets/Berries/lum.png";
import mago from "../../../assets/Berries/mago.png";
import oran from "../../../assets/Berries/oran.png";
import passho from "../../../assets/Berries/passho.png";
import payapa from "../../../assets/Berries/payapa.png";
import pecha from "../../../assets/Berries/pecha.png";
import persim from "../../../assets/Berries/persim.png";
import petaya from "../../../assets/Berries/petaya.png";
import pomeg from "../../../assets/Berries/pomeg.png";
import qualot from "../../../assets/Berries/qualot.png";
import rawst from "../../../assets/Berries/rawst.png";
import rindo from "../../../assets/Berries/rindo.png";
import roseli from "../../../assets/Berries/roseli.png";
import salac from "../../../assets/Berries/salac.png";
import shuca from "../../../assets/Berries/shuca.png";
import sitrus from "../../../assets/Berries/sitrus.png";
import starf from "../../../assets/Berries/starf.png";
import tamato from "../../../assets/Berries/tamato.png";
import tanga from "../../../assets/Berries/tanga.png";
import wacan from "../../../assets/Berries/wacan.png";
import wiki from "../../../assets/Berries/wiki.png";
import yache from "../../../assets/Berries/yache.png";
import razz from "../../../assets/Berries/razz.png";
import bluk from "../../../assets/Berries/bluk.png";
import nanab from "../../../assets/Berries/nanab.png";
import wepear from "../../../assets/Berries/wepear.png";
import pinap from "../../../assets/Berries/pinap.png";
import cornn from "../../../assets/Berries/cornn.png";
import magost from "../../../assets/Berries/magost.png";
import rabuta from "../../../assets/Berries/rabuta.png";
import nomel from "../../../assets/Berries/nomel.png";
import spelon from "../../../assets/Berries/spelon.png";
import pamtre from "../../../assets/Berries/pamtre.png";
import watmel from "../../../assets/Berries/watmel.png";
import durin from "../../../assets/Berries/durin.png";
import belue from "../../../assets/Berries/belue.png";
import occa from "../../../assets/Berries/occa.png";
import chilan from "../../../assets/Berries/chilan.png";
import enigma from "../../../assets/Berries/enigma.png";
import micle from "../../../assets/Berries/micle.png";
import custap from "../../../assets/Berries/custap.png";
import jaboca from "../../../assets/Berries/jaboca.png";
import rowap from "../../../assets/Berries/rowap.png";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const BerriesDetails = ({ berryName }) => {
  const { data: berries } = useQuery(["berries", berryName], () =>
    getBerriesDetails(berryName)
  );

  const pokemonType = berries && berries.natural_gift_type.name;
  const berryImages = {
    aguav: aguav,
    apicot: apicot,
    aspear: aspear,
    babiri: babiri,
    charti: charti,
    cheri: cheri,
    chesto: chesto,
    chople: chople,
    coba: coba,
    colbur: colbur,
    figy: figy,
    ganlon: ganlon,
    grepa: grepa,
    haban: haban,
    hondew: hondew,
    iapapa: iapapa,
    kasib: kasib,
    kebia: kebia,
    kelpsy: kelpsy,
    lansat: lansat,
    leppa: leppa,
    liechi: liechi,
    lum: lum,
    mago: mago,
    oran: oran,
    passho: passho,
    payapa: payapa,
    pecha: pecha,
    persim: persim,
    petaya: petaya,
    pomeg: pomeg,
    qualot: qualot,
    rawst: rawst,
    rindo: rindo,
    roseli: roseli,
    salac: salac,
    shuca: shuca,
    sitrus: sitrus,
    starf: starf,
    tamato: tamato,
    tanga: tanga,
    wacan: wacan,
    wiki: wiki,
    yache: yache,
    razz: razz,
    bluk: bluk,
    nanab: nanab,
    wepear: wepear,
    pinap: pinap,
    cornn: cornn,
    magost: magost,
    rabuta: rabuta,
    nomel: nomel,
    spelon: spelon,
    pamtre: pamtre,
    watmel: watmel,
    durin: durin,
    belue: belue,
    occa: occa,
    chilan: chilan,
    enigma: enigma,
    micle: micle,
    custap: custap,
    jaboca: jaboca,
    rowap: rowap,
  };
  const berryImage = berryImages[berryName] || null;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {berries && (
        <div
          className={`${styles.berryContainer} ${
            pokemonType ? styles[`Pokemon-${pokemonType}`] : ""
          }`}
        >
          <div className={styles.titleDetails}>
            <h1 className={styles.berryTitle}>{berryName} berry</h1>
            {berryImage && <img src={berryImage} alt={berries.name}></img>}
          </div>

          <ul className={styles.berryList}>
            <li className={styles.nonCapi}>Size: {berries.size} mm</li>
            <li className={styles.nonCapi}>
              Growth Time: {berries.growth_time} h
            </li>
            <li>Smoothness: {berries.smoothness}</li>
            <li>Firmness: {berries.firmness.name}</li>
            <li>Soil Dryness: {berries.soil_dryness}</li>
            <li className={styles.nonCapi}>
              Max Harvest: {berries.max_harvest} pcs
            </li>

            <li>Gift Power: {berries.natural_gift_power}</li>
            <li>Pokémon Type: {pokemonType}</li>
          </ul>

          <div className={styles.flavorsGrid}>
            <div className={styles.dropdown}>
              <h4>Flavors:</h4>
              <button
                onClick={handleDropdown}
                className={!isExpanded ? styles.arrow : styles.active}
              >
                <span className="icon-circle-down"></span>
              </button>
            </div>

            {isExpanded && (
              <div>
                <div className={styles.flavors}>
                  <h4>Name</h4>
                  <h4>Potency</h4>
                </div>
                {berries.flavors.map((flavor) => (
                  <div key={flavor.flavor.name} className={styles.flavors}>
                    <div className={styles.content}>{flavor.flavor.name}</div>
                    <div className={styles.content}>{flavor.potency}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BerriesDetails;

{
  /* <div className={styles.detailsGrid}>
            <h3>Size:</h3>
            <h3>{berries.size} mm</h3>

            <h3>Smoothness:</h3>
            <h3>{berries.smoothness}</h3>

            <h3>Firmness:</h3>
            <h3>{berries.firmness.name}</h3>

            <h3>Soil Dryness:</h3>
            <h3>{berries.soil_dryness}</h3>

            <h3>Max Harvest:</h3>
            <h3>{berries.max_harvest}</h3>

            <h3>Growth Time:</h3>
            <h3>{berries.growth_time} h</h3>

            <h3>Gift Power:</h3>
            <h3>{berries.natural_gift_power}</h3>

            <h3>Gift Type:</h3>
            <h3>{berries.natural_gift_type.name}</h3>

          </div> */
}
