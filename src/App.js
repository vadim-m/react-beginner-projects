import React, { useEffect, useRef, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);
  const ratesRef = useRef({});

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((data) => {
        data.rates.RUB = 1;
        ratesRef.current = data.rates;
        onChangeToPrice(1);
      });
  }, []);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setFromPrice(value);
    setToPrice(result.toFixed(3));
  };

  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={(cur) => setFromCurrency(cur)}
        onChangeValue={(val) => onChangeFromPrice(val)}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={(cur) => setToCurrency(cur)}
        onChangeValue={(val) => onChangeToPrice(val)}
      />
    </div>
  );
}

export default App;
