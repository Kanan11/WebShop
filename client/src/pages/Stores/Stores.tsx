import React from "react";
import Card from "../../components/Card/Card";
import useFetch from "../../hooks/useFetch";
import "./Stores.scss"

interface StoresProps {
    /* reserved place */
}

const Stores: React.FC<StoresProps> = (_props) => {
  const {data, loading, error} = useFetch(
    `${process.env.REACT_APP_API_URL}?populate=*`
  )
  console.log('all prod data', data)
    return (
    <div className="allprod">
        {loading ? (
        "loading..."
      ) : error ? (
        "Error loading data. Please try again later."
      ) : (
        data?.map((item: any) => 
            <Card item={item} key={item.id} />
        )
      )}
    </div>
  );
};

export default Stores;
