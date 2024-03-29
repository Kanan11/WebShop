import React, { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.scss";

// interface SubCategory {
//   id: number;
//   attributes: {
//     title: string;
//   };
// }

const Products: React.FC = () => {
  const catId = parseInt(useParams().id || "");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sort, setSort] = useState<"asc" | "desc" | null>("asc");
  const [selectedSubCats, setSelectedSubCats] = useState<number[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL_SUBCAT + `/sub-categories?[filters][categories][id][$eq]=${catId}`;
  const { data, loading, error } = useFetch(apiUrl);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Sub Categories of Categories</h2>
          {loading ? (
            "loading..."
          ) : error ? (
            "Error loading data. Please try again later."
          ) : (
          data?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id.toString()}
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={item.id.toString()}>
                {item.attributes.title}
              </label>
            </div>
          )))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              checked={sort === "asc"}
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              checked={sort === "desc"}
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCats}
        /> 
      </div>
    </div>
  );
};

export default Products;
