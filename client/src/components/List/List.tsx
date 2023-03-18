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
    `${process.env.REACT_APP_API_URL}?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );
  console.log('subCats ', subCats)
  console.log('maxPrice ', maxPrice)
  console.log('sort ', sort)
  console.log('catId ', catId)
  console.log('data ', data)
  console.log('error ', error) // TODO fetch before props will come, WHY error is true all time

  return (
    <div className="list">
      {loading ? (
        "loading"
      ) : !error ? ( // TODO ! should be deleted here
        "Error loading data. Please try again later."
      ) : (
        data?.map((item: any) => <Card item={item} key={item.id} />)
      )}
    </div>
  );  
};

export default List;
