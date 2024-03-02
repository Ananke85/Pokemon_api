import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Blog from "./components/Blog/Blog";
import PokePage from "./components/PokemonsInfo/PokePage";
import Pokemons from "./components/PokemonsInfo/Pokemons/Pokemons";
import Berries from "./components/PokemonsInfo/Berries/Berries";
import {
  ABOUT,
  BERRIES,
  BLOG,
  BLOGPOST,
  HOME,
  ITEMS,
  LOCATIONS_DETAILS,
  POKEMONS,
  POKEMON_DETAILS,
  POKEPAGE,
  REGIONS,
  REGIONS_DETAILS,
} from "./route-paths";
import PokemonDetails from "./components/PokemonsInfo/Pokemons/PokemonsDetails/PokemonDetails";
import { PokemonProvider } from "./context/PokemonContext";
import LocationsDetails from "./components/PokemonsInfo/Locations/LocationsDetails";
import Regions from "./components/PokemonsInfo/Regions/Regions";
import RegionDetails from "./components/PokemonsInfo/Regions/RegionsDetails";
import Items from "./components/PokemonsInfo/Items/Items";
import Post from "./components/Blog/Post";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PokemonProvider>
          <NavBar />
          <Routes>
            <Route path={HOME} element={<Home />} />
            <Route path={ABOUT} element={<About />} />
            <Route path={BLOG} element={<Blog />} />
            <Route path={BLOGPOST} element={<Post />} />

            <Route path={POKEPAGE} element={<PokePage />}>
              <Route path="" element={<Pokemons />} />
              <Route path={POKEMONS} element={<Pokemons />}>
                <Route path={POKEMON_DETAILS} element={<PokemonDetails />} />
              </Route>
              <Route path={BERRIES} element={<Berries />}></Route>
              <Route path={REGIONS} element={<Regions />}>
                <Route path={REGIONS_DETAILS} element={<RegionDetails />} />
              </Route>
            
              <Route
                  path={LOCATIONS_DETAILS}
                  element={<LocationsDetails />}
                />
              <Route path={ITEMS} element={<Items />}></Route>
            </Route>
          </Routes>
        </PokemonProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
