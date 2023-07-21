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
  ABOUT_US,
  BERRIES,
  BLOG,
  HOME,
  POKEMONS,
  POKEMON_DETAILS,
  POKEPAGE,
} from "./route-paths";
import PokemonDetails from "./components/PokemonsInfo/Pokemons/PokemonsDetails/PokemonDetails";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={ABOUT_US} element={<About />} />
          <Route path={BLOG} element={<Blog />} />
          <Route path={POKEPAGE} element={<PokePage />}>
            {/* <Route path="*" element={<PokePage />} /> */}
            <Route path="" element={<Pokemons />} />
            <Route path={POKEMONS} element={<Pokemons />}>
              <Route path={POKEMON_DETAILS} element={<PokemonDetails />} />
            </Route>
            <Route path={BERRIES} element={<Berries />} />
            <Route path="pokemon/:berryName" element={<PokemonDetails />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
