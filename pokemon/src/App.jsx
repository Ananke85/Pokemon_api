import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Pokemons from "./components/Pokemons/Pokemons";
import About from "./components/About/About";
import Blog from "./components/Blog/Blog";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
          <NavBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/pokemons" element={<Pokemons />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
