import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { getAllPokemons, getPokemonDetails } from "../../utils/apiPokemons";
import { useNavigate, useParams } from "react-router-dom";

export const PokemonContext = createContext();

// eslint-disable-next-line react/prop-types
export const PokemonProvider = ({ children }) => {
  const { data } = useQuery(["pokemons"], getAllPokemons);
  const { name } = useParams();
  const navigate = useNavigate();

  const amount = data && data.results.length;
  const pokemonNames = data && data.results.map((pokemon) => pokemon.name);

  useQuery(["details", name], () => getPokemonDetails(name));

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextCard = async () => {
    try {
      const nextIndex = currentIndex + 1;
      if (nextIndex < amount) {
        const nextPokemonName = pokemonNames[nextIndex];
        await getPokemonDetails(nextPokemonName);
        setCurrentIndex(nextIndex);
        navigate(`/pokemons/pokemon/${nextPokemonName}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreviousCard = async () => {
    try {
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        const prevPokemonName = pokemonNames[prevIndex];
        await getPokemonDetails(prevPokemonName);
        setCurrentIndex(prevIndex);
        navigate(`/pokemons/pokemon/${prevPokemonName}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        currentIndex,
        setCurrentIndex,
        handleNextCard,
        handlePreviousCard,
        pokemonNames,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
