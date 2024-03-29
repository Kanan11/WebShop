import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, CartState, resetCart } from "../../redux/cartReducer";
import { UseGetUser } from "../../hooks/useGetUser";
import './Checkout.scss'

const Checkout: React.FC = () => {
  const { userLoggedIn } = UseGetUser();
  useEffect(() => {
    setMail(userLoggedIn?.email ?? "");
    setName(userLoggedIn?.username ?? "");
    setSurName(userLoggedIn?.lastname ?? '');
    setStreet(userLoggedIn?.adress?.street ?? '');
    setZip(userLoggedIn?.adress?.postal_code ?? '');
    setCity(userLoggedIn?.adress?.city ?? '');
    setCountry(userLoggedIn?.adress?.country ?? '');
    setPhone(userLoggedIn?.phone?.toString() ?? '');
    setCoName(userLoggedIn?.adress?.co_name ?? '');
  }, [userLoggedIn]);
  // console.log(userLoggedIn);
    const [coName, setCoName] = useState('');
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState<string | undefined>(undefined);
    const [street, setStreet] = useState("");
    const [zip, setZip] = useState("");
    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const products = useSelector<CartState, CartItem[]>(state => {
        return state.cart.products;
      });
    const dispatch = useDispatch();
    // console.log(userLoggedIn?.username)
    // console.log(products)
    const handlePayment = async () => {
        try {
          const requestBody = {
            userName: [name, surName].join(" "),
            email: mail,
            phone: phone,
            shippingAddress: {
              co_name: coName,
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
            },
            userId: userLoggedIn?.id
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
      const handlePhoneChange = (event: { target: { value: string }; }) => {
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
      const handleCoNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCoName(event.target.value);
      };
    return(
        <div className="root-container">
            <p className="head-text">Aditional information</p>
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
                        <input type="text" value={phone || ''} onChange={handlePhoneChange} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Phone</label>
                    </div>       
                </form>
            </div>
            <p className="head-text">Shipping information</p>
            <div className="container">
                <form className="box">
                    <div className="group">      
                        <input type="text" value={coName} onChange={handleCoNameChange} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>c/o name (if exist)</label>
                    </div>
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
            <pre style={{marginTop: '80px'}}>** Please change the delivery address in case it is different from the invoice address</pre>
            <button className="buy" onClick={handlePayment} style={{cursor: "pointer"}}>PAY</button>
        </div>
    )
}

export default Checkout
