import React, { useEffect, useState } from 'react';
import './Login.scss';

interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  }

interface LoginProps {
  // onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const url = 'http://localhost:1337/api/auth/local';

const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
          try {
            const requestBody = {
                "identifier": username,
                "password": password
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
            if (response.status === 200) {
                const expires = new Date();
                // Set the cookie expiration date to 1 hour from now
                expires.setTime(expires.getTime() + (60 * 60 * 1000)); 
                
                // Set the JWT token as a cookie value with an expiration date
                document.cookie = `jwt=${token};expires=${expires.toUTCString()};path=/;SameSite=None;Secure`;
                window.location.href = '/login';
            }else{
                
                console.log('data----', token);
            };
            } catch (error) {
              if (error instanceof Error) {
                console.log('error: ', error);
              }
            }
        };
    
        // Get JWT token from a cookie
    function getJwtTokenFromCookie() {
        // Get all cookies
        const cookies = document.cookie.split(';');
        
        // Find the JWT cookie and return its value
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('jwt=')) {
                return cookie.substring('jwt='.length, cookie.length);
            }
        }
        return null; // JWT cookie not found
    };
    const [jwtToken, setJwtToken] = useState(getJwtTokenFromCookie())
    function logout() {
        document.cookie = 'jwt=;max-age=0;path=/;SameSite=None;Secure';
        setJwtToken('');
        window.location.href = '/login';
      }
    
    // Make authenticated API request with the JWT token
    useEffect(()=>{
        if (jwtToken) {
            fetch('http://localhost:1337/api/users', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json(); // convert response to JSON
                } else {
                    throw new Error('Failed to load users');
                }
                })
                .then(data => {
                setUsers(data); // save data to users state
                })
                .catch(error => {
                console.error(error);
                });
            }
    },[jwtToken])
    
   
  return (
    <>
        <div className="root-container">
        <div>
        {users && users.length ? (
        <ul>
            {users.map(user => (
            <li key={user.id}>
                <p>ID: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Provider: {user.provider}</p>
                <p>Confirmed: {user.confirmed.toString()}</p>
                <p>Blocked: {user.blocked.toString()}</p>
                <p>Created At: {user.createdAt}</p>
                <p>Updated At: {user.updatedAt}</p>
            </li>
            ))}
        </ul>
        ) : <p>You must be logged in or <a href='/register'>sing in</a></p>}
        </div>
            {users.length === 0 ? (
            <><p>Login forum</p>
            <div className="container">
                <form className="box" onSubmit={handleLogin}>
                    <div className="group">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Name</label>
                    </div>
                    <div className="group">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Password</label>
                    </div>
                    <br />
                    <button className="login" type="submit" style={{ cursor: "pointer" }}>Login</button>
                </form>
            </div></>
            ) : (
                <>
                <p>You are allready logged in</p>
                <button onClick={logout} className="login" type="submit" style={{ cursor: "pointer" }}>Log out</button>
                </>
              )}
        </div>
    </>
  );
};

export default Login;
