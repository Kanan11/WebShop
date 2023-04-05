import React, { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch";
import './Succsess.scss'

interface CheckoutSession {
  session: {
    id: string;
    object: string;
    after_expiration: null;
    allow_promotion_codes: null;
    amount_subtotal: number;
    amount_total: number;
    automatic_tax: {
      enabled: boolean;
      status: null;
    };
    billing_address_collection: string;
    cancel_url: string;
    client_reference_id: null;
    consent: null;
    consent_collection: null;
    created: number;
    currency: string;
    currency_conversion: null;
    custom_fields: any[];
    custom_text: {
      shipping_address: {
        message: string;
      };
      submit: {
        message: string;
      };
    };
    customer: string;
    customer_creation: null;
    customer_details: {
      address: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
      };
      email: string;
      name: string;
      phone: null;
      tax_exempt: string;
      tax_ids: any[];
    };
    customer_email: null;
    expires_at: number;
    invoice: null;
    invoice_creation: {
      enabled: boolean;
      invoice_data: {
        account_tax_ids: any[];
        custom_fields: any[];
        description: null;
        footer: null;
        metadata: Record<string, string>;
        rendering_options: null;
      };
    };
    livemode: boolean;
    locale: null;
    metadata: {
      description: string;
    };
    mode: string;
    payment_intent: string;
    payment_link: null;
    payment_method_collection: string;
    payment_method_options: Record<string, unknown>;
    payment_method_types: string[];
    payment_status: string;
    phone_number_collection: {
      enabled: boolean;
    };
    recovered_from: null;
    setup_intent: null;
    shipping_address_collection: {
      allowed_countries: string[];
    };
    shipping_cost: {
      amount_subtotal: number;
      amount_tax: number;
      amount_total: number;
      shipping_rate: string;
    };
    shipping_details: {
      address: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
      };
      name: string;
    };
    shipping_options: {
      shipping_amount: number;
      shipping_rate: string;
    }[];
    status: string;
    submit_type: null;
    subscription: null;
    success_url: string;
    total_details: {
      amount_discount: number;
      amount_shipping: number;
      amount_tax: number;
    };
    url: null;
  };
}


 const Success: React.FC = () => {
    const orderId = new URLSearchParams(window.location.search).get('order_id');
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    const { data, loading, error } = useFetch(`http://localhost:1337/api/orders/${orderId}?populate=*`);
    
    const [response, setResponse] = useState<CheckoutSession>()
    useEffect(() => {
      async function fetchData() {
        try {
          const requestBody = { sessionId, orderId };
          const requestBodyString = JSON.stringify(requestBody);
          const res = await fetch('http://localhost:1337/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: requestBodyString,
          });
          const data = await res.json();
          setResponse(data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, [sessionId, orderId]);
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