import React, { useEffect, useState } from "react";
import { Collection } from "./Collection";
import "./index.scss";

const categories = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [seacrhValue, setSeacrhValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const categoryParam = categoryId ? `category=${categoryId}` : "";

    fetch(
      `https://64b05814c60b8f941af59ae9.mockapi.io/photos?page=${page}&limit=2&${categoryParam}`
    )
      .then((res) => res.json())
      .then((data) => setCollections(data))

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((item, index) => (
            <li
              key={item.name}
              className={categoryId === index ? "active" : ""}
              onClick={() => setCategoryId(index)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <input
          value={seacrhValue}
          onChange={(e) => setSeacrhValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((item) =>
              item.name.toLowerCase().includes(seacrhValue.toLowerCase())
            )
            .map((item) => (
              <Collection
                name={item.name}
                key={item.name}
                images={item.photos}
              ></Collection>
            ))
        )}
        {}
      </div>
      <ul className="pagination">
        {[...Array(4)].map((_, index) => (
          <li
            key={index}
            className={page === index + 1 ? "active" : ""}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
