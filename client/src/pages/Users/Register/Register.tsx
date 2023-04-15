import React, { useEffect, useRef, useState } from 'react';
import './Register.scss';
// import { User } from '../../../types/types';

interface RegisterProps {
  //onRegister: (user: User) => void;
}
interface User {
    id: string;
    name: string;
    email: string;
    shipping_address: { id: string }[];
    // add any other properties here
  }

const Register: React.FC<RegisterProps> = () => {
const [username, setUsername] = useState('');
const [lastName, setLastName] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [city, setCity] = useState('');
const [country, setCountry] = useState('');
const [coName, setCoName] = useState('');
const [street, setStreet] = useState('');
const [zip, setZip] = useState('');
const [phone, setPhone] = useState('');
const url = 'http://localhost:1337/api/auth/local/register?populate=*';
const shippingUrl = `http://localhost:1337/api/shipping-adresses`;
const [shippingID, setShippingId] = useState('');
const [userId, setUserId] = useState('');
const [jwt, setJwt] = useState('');
const [userLoggedIn, setUserLoggedIn] = useState<User>();
  
  useEffect(() => {
    async function fetchUser() {
      if(jwt !== '')
        try {
        const res = await fetch(`http://localhost:1337/api/users/${userId}?&populate=*`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const data = await res.json();
        setUserLoggedIn(data);
        console.log(data);
        console.log(userLoggedIn); // This may not be the updated value
        console.log('Updated user:', userLoggedIn); // This will show the updated value
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [jwt]);
  
  
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Firts must create Shipping Adress at Strapi to get ID, then this ID we will use to connect our new user 

    try {
        // Create new User by POST request
        const requestBody = {
            username: username,
            lastname: lastName,
            email: email,
            password: password,
            phone: phone,
              adress: {
                co_name: coName,
                street: street,
                postal_code: zip,
                city: city,
                country: country
              }
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        const token = data.jwt;
        const id = data.user.id;
        setUserId(id);
        setJwt(token)
        console.log(data.user)

        // Save JWT key and userId to session storage to one heur
        if (response.status === 200) {
            const expires = new Date();
            // Set the cookie expiration date to 1 hour from now
            expires.setTime(expires.getTime() + (60 * 60 * 1000)); 
            // Set the JWT token as a cookie value with an expiration date
            document.cookie = `jwt=${token}; expires=${expires.toUTCString()}; path=/; SameSite=None; Secure`;
            document.cookie = `userId=${id}; expires=${expires.toUTCString()}; path=/; SameSite=None; Secure`;
            window.location.href = '/login';
        }else{
            console.log('data----', data);
        };
    } catch (error) {
        if (error instanceof Error) {
            console.log('error: ', error);
        }
    }     
      // Create new shipping adress table at Strapi
        try {
            const requestBody = {
                shipping_adress: {
                         street: street,
                         city: city,
                         postal_code: zip,
                         country: country,
                         name: username,
                         phone: "765476534"
                }
             }
             const response = await fetch(shippingUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            const shippingAdressId = data.id;
            setShippingId(shippingAdressId);
            // console.log(shippingAdressId);
        } catch (error) {
            console.log(error)
        }

        // TODO connect relation or update user info by shipping adress
      
  };

  return (
    <div className="register-container">
      <div className="root-container">
            <div className="container">
                <form className="box" onSubmit={handleRegister}>
                    <p>User information</p>
                    <div className="group">      
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>First name / Username</label>
                    </div>
                    <div className="group">      
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Last name</label>
                    </div>
                    <div className="group">      
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Mail</label>
                    </div>
                    <div className="group">      
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Phone</label>
                    </div>
                    <div className="group">      
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Password</label>
                    </div>
                    <p>Shipping information</p>
                    <div className="group">      
                        <input type="text" value={coName} onChange={(e) => setCoName(e.target.value)}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>C/O name (optional)</label>
                    </div>
                    <div className="group">      
                        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Street name</label>
                    </div>
                    <div className="group">      
                        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>ZIP code</label>
                    </div>
                    <div className="group">      
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>City</label>
                    </div>       
                    <div className="group">      
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Country</label>
                    </div>       
                <button className="register" type='submit' style={{cursor: "pointer"}}>REGISTER</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Register;
