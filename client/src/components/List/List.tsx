import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

interface ListProps {
  subCats: number[];
  maxPrice: number;
  sort: string | null;
  catId: number;
}

const List: React.FC<ListProps> = ({ subCats, maxPrice, sort, catId }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );
  return (
    <div className="list">
      {loading
        ? "loading"
        : data?.map((item: any) => <Card item={item.attributes} key={item.id} />)}
    </div>
  );
};

export default List;
