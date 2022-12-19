import "./styles.css";
import { useEffect, useState } from "react";

const ComponentOutsideApp = () => {
  const [childOutsideInput, setChildOutsideInput] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://senbeiman.github.io/react-component-in-component-demo/api/outside.json");
      const data = await response.json();
      setData(data);
      return setTimeout(() => {
        setChildOutsideInput(data.name);
      }, 1000);
    };
    const timeoutId = fetchData();
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="childOutside">
      <p>外側のコンポーネント</p>
      <div>
        <img
          src={data?.imageUrl}
          alt=""
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
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("https://senbeiman.github.io/react-component-in-component-demo/api/inside.json");
        const data = await response.json();
        setData(data);
        return setTimeout(() => {
          setChildInsideInput(data.name);
        }, 1000);
      };
      const timeoutId = fetchData();
      return () => {
        clearTimeout(timeoutId);
      };
    }, []);

    return (
      <div className="childInside">
        <p>内側のコンポーネント</p>
        <div>
          <img
            src={data?.imageUrl}
            alt=""
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
