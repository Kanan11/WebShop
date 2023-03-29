import React from "react";
import useFetch from "../../hooks/useFetch";

const Cancel: React.FC = () => {
    const orderId = new URLSearchParams(window.location.search).get('order_id');
    const { data, loading, error } = useFetch(`http://localhost:1337/api/orders/${orderId}?populate=*`);
    return(
        <div>
            <h1 style={{color: 'red'}}>Payment was canceled !</h1>
            <p>Order number is {orderId}</p>
            <br></br>
            <p>
                {error ? (
                <p>Something went wrong!</p>
                ) : loading ? (
                    <p>Loading...</p>
                ) : data.length > 0 ? (
                    data.map(item => 
                        item.attributes.name,
                        )
                ) : (
                    <p>No data available.</p>
                )}
            </p>        
        </div>
    )
}

export default Cancel