import "./styles.css";
import {useEffect, useState} from "react";


const ComponentOutsideApp = () => {
  const [childOutsideInput, setChildOutsideInput] = useState("useStateの初期値です");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setChildOutsideInput("useEffectによってマウントの1秒後にセットされた値です")
    }, 1000);
    return () => { clearTimeout(timeoutId) }
  }, [])

  return (
    <div className="childOutside">
      <p>外部定義のComponent</p>
      <div>
        <img src={"https://picsum.photos/seed/sample/100/100"} />
      </div>
      <textarea onChange={(e) => {setChildOutsideInput(e.target.value)}} value={childOutsideInput}/>
    </div>
  );
}

const App = () => {
  const [parentCount, setParentCount] = useState(0);

  const ComponentInsideApp = () => {
    const [childInsideInput, setChildInsideInput] = useState("useStateの初期値です");

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setChildInsideInput("useEffectによってマウントの1秒後にセットされた値です")
      }, 1000);
      return () => { clearTimeout(timeoutId) }
    }, [])

    return (
      <div className="childInside">
        <p>内部定義のComponent</p>
        <div>
          <img src={"https://picsum.photos/seed/sample/100/100"} />
        </div>
        <textarea onChange={(e) => {setChildInsideInput(e.target.value)}} value={childInsideInput}/>
      </div>
    );
  }

  return (
    <div className="parent">
      <p>親Component</p>
      <button onClick={() => {
        setParentCount(parentCount + 1)
      }}>
        再描画
      </button>
      <button onClick={() => {
        setTimeout(() => {
          setParentCount(parentCount + 1)
        }, 3000);
      }}>
        3秒後に再描画
      </button>
      <ComponentInsideApp />
      <ComponentOutsideApp />
    </div>
  );
};
export default App;
