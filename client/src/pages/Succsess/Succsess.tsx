import React, { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch";
import { useFormattedDate } from '../../hooks/useFormattedDate';
import { CheckoutSession } from "../../types/types";
import './Succsess.scss'
import { UseGetUser } from "../../hooks/useGetUser";

 const Success: React.FC = () => {
    const orderId = new URLSearchParams(window.location.search).get('order_id');
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    const { data, loading, error } = useFetch(`http://localhost:1337/api/orders/${orderId}?populate=*`);
    // console.log(data.map(i=>i.id))
    const [response, setResponse] = useState<CheckoutSession>()
    // this request for change status to paid
    useEffect(() => {
      async function fetchData() {
        try {
          const requestBody = { sessionId, orderId };
          const requestBodyString = JSON.stringify(requestBody);
          const res = await fetch(`http://localhost:1337/api/orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: requestBodyString,
          });
          const data = await res.json();
          // console.log(requestBodyString)
          // console.log(data)
          setResponse(data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, [sessionId, orderId]);
    
    // Add order to user profile: 1.Get user from session storage 2.Update user-order-list with new order
    function getJwtTokenAndUserIdFromCookie() {
      const cookies = document.cookie.split(';');
      let jwtToken = null;
      let userId = null;
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('jwt=')) {
          jwtToken = cookie.substring('jwt='.length, cookie.length);
        } else if (cookie.startsWith('userId=')) {
          userId = cookie.substring('userId='.length, cookie.length);
        }
      }
      return { jwtToken, userId };
    }
    const jwtTokenAndUserId = getJwtTokenAndUserIdFromCookie();
    const { jwtToken, userId } = jwtTokenAndUserId;
    const user = UseGetUser().userLoggedIn
    const updatedOrders = { "orders": user?.orders.map(order => order.id).concat(data.map(i=>i.id) as any)}
    // console.log(jwtToken)
    // console.log(userId)
    // console.log(updatedOrders)
    useEffect(() => {
      async function fetchData() {
        if(updatedOrders) try {
            const res = await fetch(`http://localhost:1337/api/users/${userId}?populate=*`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${jwtToken}`
              },
              body: JSON.stringify(updatedOrders),
            });
            const data = await res.json();
            // console.log('user orderslist was updated', data)
          } catch (error) {
            console.log(error);
          }
      }
      fetchData();
    }, [updatedOrders, jwtToken, userId]);

    const time: any = data.map(i => i.attributes.createdAt)
    const createdAt = useFormattedDate(time);
return(
    <div>
        <h1>Thank you!</h1>
        <p>Order number is {orderId} and Stripe session ID is {sessionId}</p>
        <h3 style={{color: 'green'}}>{response ? response.session.payment_status : 'Loading...'}</h3>
        <br></br>
        <span>
          {error ? (
            <p>Something went wrong!</p>
          ) : loading ? (
            <p>Loading...</p>
          ) : data ? (
            data.map((product) => (
                <div key={product.id}>
                  <p>{product.attributes.name}</p>
                  <p>This order was created at {createdAt}</p>
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
                        <p>Sent to {product.attributes.shipping_adress.data.attributes.name}</p>
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
)
}

export default Success