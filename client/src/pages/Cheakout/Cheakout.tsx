import { SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, CartState, resetCart } from "../../redux/cartReducer";
import './Cheakout.scss'

// interface PropsType {
//   name: string;
//   age: number;
// }

const Cheakout: React.FC = () => {
    const [city, setCity] = useState("Gothenburg");
    const [country, setCountry] = useState("Sweden");
    const [mail, setMail] = useState("demoMail@mail.se");
    const [phone, setPhone] = useState("0767564534");
    const [street, setStreet] = useState("Vasagatan 52");
    const [zip, setZip] = useState("41628");
    const [name, setName] = useState("John");
    const [surName, setSurName] = useState("Silver");
    const products = useSelector<CartState, CartItem[]>(state => {
        return state.cart.products;
      });
    const dispatch = useDispatch();
    
    console.log(products)
    const handlePayment = async () => {
      // const handleTest = [city, country, name, surName, zip, phone, mail, street].join(" ");
      // console.log(handleTest)
        try {
          const requestBody = {
            userName: [name, surName].join(" "),
            email: mail,
            shippingAddress: {
              line1: street,
              line2: phone,
              city: city,
              postal_code: zip,
              country: country
            },
            products: products.map(({ id, quantity }) => ({
              id,
              quantity,
            })),
            shipping_options: {
              name: 'DHL delevery',
              price: 99,
              estimated_delivery_date: '3-5 business days'
            }
          }
          const response = await fetch('http://localhost:1337/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
          });
          const data = await response.json();
          // console.log('data----', data.url)
          dispatch(resetCart())
          if (response.status === 200) window.location = data.url
        
        
              /* TODO if paid update status at Strapi DB */
          } catch (error) {
            if (error instanceof Error) {
              console.log('error: ', error);
            }
          }
      }
      const handleCityChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCity(event.target.value);
      };
      const handleCountryChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCountry(event.target.value);
      };
      const handleMailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setMail(event.target.value);
      };
      const handlePhoneChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPhone(event.target.value);
      };
      const handleStreetChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setStreet(event.target.value);
      };
      const handleZipChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setZip(event.target.value);
      };
      const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setName(event.target.value);
      };
      const handleSurNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSurName(event.target.value);
      };

    return(
        <div className="root-container">
            <p>Aditional information</p>
            <div className="container">
                <form className="box">
                    <div className="group">      
                        <input type="text" value={name} onChange={handleNameChange} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Name</label>
                    </div>
                    <div className="group">      
                        <input type="text" value={surName} onChange={handleSurNameChange} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Surname</label>
                    </div>
                </form>
                <form className="box">
                    <div className="group">      
                        <input type="text" value={mail} onChange={handleMailChange} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Email</label>
                    </div>       
                    <div className="group">      
                        <input type="text" value={phone} onChange={handlePhoneChange} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Phone</label>
                    </div>       
                </form>
            </div>
            <p>Shipping information</p>
            <div className="container">
                <form className="box">
                    <div className="group">      
                        <input type="text" value={street} onChange={handleStreetChange} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Street name</label>
                    </div>
                    <div className="group">      
                        <input type="text" value={zip} onChange={handleZipChange} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>ZIP code</label>
                    </div>
                </form>
                <form className="box">
                    <div className="group">      
                        <input type="text" value={city} onChange={handleCityChange} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>City</label>
                    </div>       
                    <div className="group">      
                        <input type="text" value={country} onChange={handleCountryChange} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Country</label>
                    </div>       
                </form>
            </div>

            <a className="buy" href="#" onClick={handlePayment}>PAY</a>
        </div>
    )
}

export default Cheakout
