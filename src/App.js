import { useState } from "react";
import "./index.scss";

function App() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button className="minus" onClick={decreaseCount}>
          - Минус
        </button>
        <button className="plus" onClick={increaseCount}>
          Плюс +
        </button>
      </div>
    </div>
  );
}

export default App;
