import React, { useState } from 'react';
import './Register.scss';

interface RegisterProps {
  //onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = () => {
const [username, setUsername] = useState('');
const [lastName, setLastName] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [city, setCity] = useState('');
const [country, setCountry] = useState('');
const [street, setStreet] = useState('');
const [zip, setZip] = useState('');
const url = 'http://localhost:1337/api/auth/local/register';

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('register')
    try {
        const requestBody = {
            "username": username,
            "lastname": lastName,
            "email": email,
            "password": password,
            "shipping_adress": {
                "street": "Korsvagen"
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
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Password</label>
                    </div>
                    <p>Shipping information</p>
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
