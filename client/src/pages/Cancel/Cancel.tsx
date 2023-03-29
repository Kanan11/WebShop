import React from "react";
import useFetch from "../../hooks/useFetch";
import './Cancel.scss';

// interface OrderType {
//     attributes: {
//       email: string;
//       name: string;
//       phone: string;
//       createdAt: string;
//       updatedAt: string;
//       publishedAt: string;
//       session_id: string;
//       status: string;
//       payment_status: string;
//       order_items: {
//         data: {
//           attributes: {
//             quantity: number;
//             createdAt: string;
//             updatedAt: string;
//             publishedAt: string;
//             product_id: number;
//           };
//         }[];
//       };
//       shipping_adress: {
//         data: {
//           attributes: {
//             street: string;
//             postal_code: string;
//             country: string;
//             name: string;
//             phone: string;
//             createdAt: string;
//             updatedAt: string;
//             publishedAt: string;
//           };
//         };
//       };
//     };
//   }

//   interface Props {
//     order: OrderType;
//   }

//   type Props = {};
  
  const Cancel: React.FC = () => {
    const orderId = new URLSearchParams(window.location.search).get('order_id');
    const { data, loading, error } = useFetch(`http://localhost:1337/api/orders/${orderId}?populate=*`);
    
    return (
        <div>
        <h1 style={{ color: 'red' }}>Payment was canceled!</h1>
        <p>Order number is {orderId}</p>
        <br />
        <span>
          {error ? (
            <p>Something went wrong!</p>
          ) : loading ? (
            <p>Loading...</p>
          ) : data ? (
            data.map((product) => (
                <div key={product.id}>
                  <p>{product.attributes.name}</p>
                  <p>{product.attributes.createdAt}</p> {/* TODO create custom hook for convert */}
                  <p style={{ color: 'red' }}>{product.attributes.payment_status}</p>
                  <ul style={{display: "flex", flexWrap: "wrap"}}>
                    {product.attributes.order_items.data.map((item: any) => (
                      <li key={item.id} style={{ border: "1px solid black", padding: "10px", width: "100px", margin: "5px" }}>
                        <p>Quantity: {item.attributes.quantity}</p>
                        <a href={`http://localhost:3000/product/${item.attributes.product_id}`}>
                            <p style={{ cursor: "pointer" }}>Product ID: {item.attributes.product_id}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                  {product.attributes.shipping_adress.data && (
                    <ul>
                      <li>
                        <p>It shall be sended to {product.attributes.shipping_adress.data.attributes.name}</p>
                        <p>Phone number: {product.attributes.shipping_adress.data.attributes.phone}</p>
                        <p>Address: {product.attributes.shipping_adress.data.attributes.street}, {product.attributes.shipping_adress.data.attributes.postal_code} {product.attributes.shipping_adress.data.attributes.city}, {product.attributes.shipping_adress.data.attributes.country}</p>
                      </li>
                    </ul>
                  )}
                </div>
              ))
          ) : (
            <p>No data available.</p>
          )}
        </span>
      </div>
    );
  };
  
  export default Cancel;
  