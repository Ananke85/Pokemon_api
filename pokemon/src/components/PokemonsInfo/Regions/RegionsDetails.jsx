import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getRegionByName } from "../../../../utils/apiLocations";
import styles from "./regions.module.css";
import { useEffect, useState } from "react";
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
  const limit = 12;
  const [offset, setOffset] = useState(0);
  const [, setShowLocations] = useState([]);

  useEffect(() => {
    if (regions) {
      setShowLocations((prevShowLocations) => [
        ...prevShowLocations,
        ...regions.locations,
      ]);
    }
  }, [regions, offset]);

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handleShowLess = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
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

  const regionDescriptions = {
    alola:
      "Alola is the only Pokémon region that is an archipelago, comprising four main islands. Like Unova, it is one of the farthest regions. Alola boasts lush tropical vegetation, beaches, volcanoes, mountains, and coastal towns. The climate is generally warm, except in places like Mount Lanakila, where it snows. Despite fewer numbered routes, Alola is one of the largest regions; some routes have unique names, like the Poni Plains. Alola's diverse ecosystems are home to wild Pokémon and host island challenge trials, like the Lush Jungle. Its preserved natural beauty and sparsely populated areas, as seen in Poni Island, are striking. Alola has fewer caves, but the Diglett's Tunnel, formed by Alolan Diglett, links Kantai City and Konikoni City, much like Kanto's Diglett's Cave. Poni Canyon, a vast rocky area on Poni Island, houses the sacred Altar of the Sun/Moon. The Haina Desert, the region's only desert, is located in Ula-Ula's center, featuring the Ruins of Abundance to honor guardian spirits. A popular tourist spot, Alola has hotels and the luxurious Hanohano Resort. Tourists often settle in the region, leaving cultural influences in places like Kantai City and Malie City. Aether Paradise, an artificial island in the Alolan Sea, shelters endangered Pokémon. Other islands include Exeggutor Island and Poké Resort Island. In conclusion, Alola's unique archipelago, vibrant ecosystems, and cultural blend make it a captivating destination for Pokémon trainers and tourists alike.",
    galar:
      "The Galar region offers diverse landscapes, including rural areas, modern cities, lush forests, and snowy mountains. Humans and Pokémon coexist, working together to develop their industries. Galar boasts large cities with prominent brick architecture and a modern metropolis in the snowy north. The southern region is more rural, with vast plains, geoglyph-covered mounds, green valleys, and wheat fields. Galar's popular form of entertainment is Pokémon battles, televised spectacles held in gyms, attracting a large audience. President Rose manages the Pokémon League and related businesses. Businesses, shops, and universities play significant roles in Galar, offering rewards through Poké Jobs. Aspiring trainers receive one of the three starter Pokémon: Grookey, Scorbunny, or Sobble. For residents without personal transportation, Galar provides two options: Flying Taxis with Corviknight for individual travel, and a comprehensive train network for collective passenger transportation. In conclusion, Galar's diverse landscapes, engaging Pokémon battles, and strong industrial development make it a captivating region for trainers. The bond between humans and Pokémon, along with its advanced transport systems, contributes to Galar's appeal as a thriving and exciting destination.",
    hoenn:
      "Hoenn, the captivating Pokémon region, hosts the adventures of Pokémon Ruby, Sapphire, Emerald, and their remakes, Omega Ruby and Alpha Sapphire. It is home to legendary Pokémon Groudon, Kyogre, and Rayquaza, and offers three starter Pokémon choices: Treecko, Torchic, and Mudkip. Comprising a complex of islands, Hoenn introduces diverse climate zones, with nine vibrant cities, seven charming towns (including Littleroot Town), and thirteen mysterious caves (eighteen in Emerald). Notable locations include Fortree City, where inhabitants live in tree houses, and the intriguing Sootopolis City, accessible only by diving. Slateport City and Lilycove City are bustling with life. The region's thirty-four numbered routes, starting from Route 101, traverse various landscapes, including a vast desert on Route 111. Beyond the main island, trainers can explore Verdanturf Town, the Southern Island, and the Battle Resort (Battle Tower in Pokémon Ruby and Sapphire, or Battle Frontier in Pokémon Emerald). In conclusion, Hoenn's captivating landscapes, unique cities and towns, and legendary Pokémon provide an exciting and diverse experience for Pokémon trainers, making it an unforgettable journey in the Pokémon world.",
    johto:
      "Johto, a Pokémon region west of Kanto, draws inspiration from Japan's Kinki and Tōkai regions. It shares a landmass with Kanto, divided by the Indigo Plateau, Pokémon League, Mount Silver, and Tohjo Falls. Johto has a different Elite Four and Champion from Kanto's Pokémon League. Tohjo Falls link Johto and Kanto, and Route 27 connects Johto to the integrated Silver Cave. The Magnet Train and S.S. Aqua provide transportation between the regions. Johto's cities are named after plants or related to them. It is mostly flat, with an eastern plateau and northeastern mountains, including Mount Silver. The Dark Cave has entrances in different routes (Route 31, Route 45, and Route 46), and the Union Cave connects Ecruteak City and Azalea Town. Johto has a mix of ancient and modern architecture, with structures like the Tin Tower and Bellsprout Tower, and modern buildings in Goldenrod City. The region's landscapes include open fields and rural areas, with cities resembling rustic villages. Ecruteak City and Violet City showcase Johto's charm, while Goldenrod City and Olivine City feature modern elements. In conclusion, Johto's connection with Kanto, diverse landscapes, and blend of rustic and modern settings make it an enchanting region for Pokémon trainers to explore.",
    kalos:
      "Kalos, a region in the Pokémon world, is hexagon-shaped and draws inspiration from France, often referred to as L'Héxagone by the French. Notable locations reflect French landmarks, such as Lumiose City resembling Paris and Prism Tower mirroring the Eiffel Tower. Route 7 is reminiscent of the Loire Valley, and the Parfum Palace evokes the grandeur of the Palace of Versailles. Bordered by water on all sides except the east, Kalos features Lumiose City at its heart—a vibrant metropolis with numerous shops and an iconic tower. While lacking a centralized shopping district, Kalos compensates with boutiques scattered across cities and towns, offering diverse clothing options due to character customization. Kalos takes pride in its hospitality, evident through an abundance of cafes, restaurants, and hotels, showcasing the region's appreciation for fine cuisine and luxury. Despite the absence of heavy industries, Kalos boasts a robust economy, primarily driven by tourism. The presence of wealthy individuals, luxury hotels, boutiques, and tipping options exemplifies the region's prosperity and cultural richness, making Kalos a sought-after destination in the Pokémon world.",
    kanto:
      "Kanto, a region in the Pokémon world, boasts limited caves and mountains, but the ones it does have hold significant allure. Diglett's Cave, named after its creators, and the Rock Tunnel, linking Route 10 to Lavender Town, are notable examples. Moon Mount, connecting Route 3 and Route 4, is famous for Clefairy inhabitants and its association with moonstones. The largest and most intricate cave, Cerulean Cave, houses the legendary Pokémon Mewtwo. Kanto features two subterranean connections between Routes 5 and 6, and Routes 7 and 8, while also housing captivating islands like Cinnabar Island, ravaged by a volcanic eruption, the Seafoam Islands housing Articuno, and the Archi7 Islands, consisting of nine stunning isles. The region's sole port in Vermilion City facilitates travel to various locations, with ships such as S.S. Anne and S.S. Aqua departing on voyages. Kanto diligently preserves its vegetation, and Route 12 serves as the only fully constructed man-made route, enhancing communication between Vermilion City, Lavender Town, and Fuchsia City. In conclusion, though Kanto may have limited caves and mountains, its captivating locations, legendary Pokémon, and strategic transportation make it a captivating destination for Pokémon trainers and enthusiasts alike.",
    paldea:
      "Paldea is an extensive region brimming with lakes, high peaks, wastelands, and rugged mountain ranges. Diverse communities of people and Pokémon thrive in various localities, ranging from prosperous agricultural settlements to a bustling port city with a lively market. At the center lies a gigantic crater known as the Paldea Abyss, strictly off-limits to anyone. The geography of the vast Paldea region is divided into four cardinal zones, along with a central zone. Each zone further encompasses numbered areas and other natural locations, featuring distinct landmarks and points of interest accessible through aerial taxis. Inspired primarily by the Iberian Peninsula, particularly Spain, Paldea's capital, Summit City, draws architectural influences from cities like Madrid, Toledo, and Barcelona, with its geographical position resembling that of Ciudad Real and Toledo. The region is divided into five zones: North, South, East, West, and the Paldea Abyss, which encompasses the central crater, shrouded in mysteries. Surrounded by four seas, Paldea comprises twelve settlements, including three cities and nine towns, contributing to the region's rich cultural and geographical diversity.",
    sinnoh:
      "The Sinnoh region features a diverse range of climates, with a prevalence of cold weather, including snow for the first time in the Pokémon world, particularly in the area surrounding Snowpoint City. The region is mostly terrestrial, with only two fully aquatic routes. It is also home to four lakes: Lake Valor, Lake Verity, Lake Acuity, and the Sendoff Spring, each associated with one of the legendary Pokémon of the region. Sinnoh boasts numerous geographical features, such as Mount Coronet, which runs from north to south, dividing the region into two distinct environments. For instance, the Shellos and Gastrodon living on the western side of Mount Coronet differ significantly in color and form from those on the eastern side due to their distinct adaptations. Prominent cities in Sinnoh include Oreburgh City, known for its deep coal mine, and Canalave City, which is divided by a river. Notably, Eterna City houses a swamp where the region's Safari Zone is located. In conclusion, Sinnoh's varied climates and diverse landscapes make it a unique and exciting region to explore in the Pokémon world, offering a wide range of geographical features and captivating cities for trainers to discover.",
    unova:
      "Unova, a region in the Pokémon world, is divided by two rivers that flow into the southern ocean. It consists of central and eastern peninsulas, along with a western landmass, all connected by five bridges like the Skyarrow Bridge and Marvelous Bridge. The eastern part has mountains, creating a southeast region with two Gyms and a northeast part focused on tourism with foreign languages spoken. The Pokémon League is located in the distant part. The central peninsula houses two large cities, Castelia City and Nimbasa City, and Opelucid City to the north, all featuring Gyms. The western side offers medium-sized towns and varied landscapes, hosting three Gyms. Unova blends urban and rural environments with 21 settlements showcasing diversity. Some cities resemble real-world buildings, while others have wooden structures above the ocean. The landscape includes forests, a desert, a magnetic cave, and areas for the Dive move. Technological advancements vary across versions, some featuring rural aesthetics and others a more technological appearance.",
  };
  const regionDescription = regionDescriptions[name] || null;
  const [isExpanded, setIsExpanded] = useState(false);
  const handleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  const mobDimension = 376;
  const tabDimension = 768;

  const [screenSize, setScreenSize] = useState("desktop");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const width = window.innerWidth;
      if (width <= mobDimension) {
        setScreenSize("mobile");
      } else if (width <= tabDimension) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {regions && (
        <div className={styles.regionOutlet}>
          <div className={styles.regionTitle}>
            <h2>{regions.name} was introduced in</h2>
            {regions.main_generation && (
              <h2 className={styles.title2}>{regions.main_generation.name}</h2>
            )}
          </div>

          <div className={styles.regionDescription}>
            {regionImage && <img src={regionImage} alt={name} />}
            <p>{regionDescription}</p>
          </div>

          {regions.locations.length > 0 ? (
            <div className={styles.locations}>
              <div className={styles.dropdown}>
                <h3>Locations</h3>
                <button
                  onClick={handleDropdown}
                  className={!isExpanded ? styles.arrow : styles.active}
                >
                  <span className="icon-circle-down"></span>
                </button>
              </div>

              {isExpanded && (
                <div className={styles.locationsContainer}>
                  {regions.locations
                    .slice(offset, offset + limit)
                    .map((region) => (
                      <div key={region.id} className={styles.locationCard}>
                        <h5>{region.name}</h5>
                        <LocationsDetails name={region.name} />
                      </div>
                    ))}
                  <div className={styles.buttonsContainer}>
                    {regions && (
                      <div className={styles.loadingButtonsRegions}>
                        {offset > 0 && (
                          <button onClick={handleShowLess}>LESS</button>
                        )}
                        {regions.locations.length > offset + limit && (
                          <button onClick={handleShowMore}>MORE</button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {isExpanded &&
                (screenSize === "mobile" || screenSize === "tablet") && (
                  <button onClick={scrollToTop} className={styles.scrollButton}>
                    Back to Top
                  </button>
                )}
            </div>
          ) : (
            <h4>No locations to display</h4>
          )}
        </div>
      )}
    </>
  );
};

export default RegionDetails;
