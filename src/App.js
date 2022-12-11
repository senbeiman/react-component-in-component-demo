import "./styles.css";
import { useEffect, useState } from "react";

const ComponentOutsideApp = () => {
  const [childOutsideInput, setChildOutsideInput] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/4");
      const data = await response.json();
      setPokemonData(data);
      return setTimeout(() => {
        setChildOutsideInput(data.name);
      }, 1000);
    };
    const timeoutId = fetchPokemon();
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="childOutside">
      <p>外側のコンポーネント</p>
      <div>
        <img
          src={pokemonData?.sprites.other["official-artwork"].front_default}
          alt="pikachu"
        />
      </div>
      <input
        onChange={(e) => {
          setChildOutsideInput(e.target.value);
        }}
        value={childOutsideInput}
      />
    </div>
  );
};

const App = () => {
  const [parentCount, setParentCount] = useState(0);

  const ComponentInsideApp = () => {
    const [childInsideInput, setChildInsideInput] = useState("");
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
      const fetchPokemon = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/25");
        const data = await response.json();
        setPokemonData(data);
        return setTimeout(() => {
          setChildInsideInput(data.name);
        }, 1000);
      };
      const timeoutId = fetchPokemon();
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);

    return (
      <div className="childInside">
        <p>内側のコンポーネント</p>
        <div>
          <img
            src={pokemonData?.sprites.other["official-artwork"].front_default}
            alt="charmandar"
          />
        </div>
        <input
          onChange={(e) => {
            setChildInsideInput(e.target.value);
          }}
          value={childInsideInput}
        />
      </div>
    );
  };

  return (
    <div className="parent">
      <p>親コンポーネント</p>
      <button
        onClick={() => {
          setParentCount(parentCount + 1);
        }}
      >
        再描画
      </button>
      <button
        onClick={() => {
          setTimeout(() => {
            setParentCount(parentCount + 1);
          }, 3000);
        }}
      >
        3秒後に再描画
      </button>
      <div className="flex">
        <ComponentInsideApp />
        <ComponentOutsideApp />
      </div>
    </div>
  );
};
export default App;
