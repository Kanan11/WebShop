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
  const [userLoggedin, setUserLoggedin] = useState<User>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
            if (response.status === 400) {
                console.log('invalid password'); //TODO error handler JSX forget password page
                setErrorMessage('Invalid username or password');
            }
            if (response.status === 200) {
                const data = await response.json();
                const token = data.jwt;
                const id = data.user.id;
                const expires = new Date();
                // Set the cookie expiration date to 1 hour from now
                expires.setTime(expires.getTime() + (60 * 60 * 1000)); 
                
                // Set the JWT token as a cookie value with an expiration date
                document.cookie = `jwt=${token}; expires=${expires.toUTCString()}; path=/; SameSite=None; Secure`;
                document.cookie = `userId=${id}; expires=${expires.toUTCString()}; path=/; SameSite=None; Secure`;
                window.location.href = '/login';
            }else{
                console.log('data----', response);
            };
            } catch (error) {
              if (error instanceof Error) {
                console.log('error: ', error);
            }
        }
        };
    
        // Get JWT token from a cookie
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
    const [jwtToken, setJwtToken] = useState(getJwtTokenAndUserIdFromCookie())

    function logout() {
        document.cookie = 'jwt=;max-age=0;path=/;SameSite=None;Secure';
        setJwtToken(jwtToken);
        window.location.href = '/login';
      }
    
    // Make authenticated API request with the JWT token
    useEffect(()=>{
        async function fetchData() {
            if (jwtToken.jwtToken) {
                try {
                    const res = await fetch(`http://localhost:1337/api/users/${jwtToken.userId}`, {
                        headers: {
                            Authorization: `Bearer ${jwtToken.jwtToken}`
                        }
                    })
                    const data = await res.json();
                    setUserLoggedin(data);
                } catch (error) {
                    console.log(error);
                }
                }
            }
            fetchData();
    },[jwtToken])

    return (
        <>
        <div className="root-container">
        <div>
        {userLoggedin ? (
        <ul>
            <li key={userLoggedin.id}>
                <p>ID: {userLoggedin.id}</p>
                <p>Username: {userLoggedin.username}</p>
                <p>Email: {userLoggedin.email}</p>
                <p>Provider: {userLoggedin.provider}</p>
                <p>Confirmed: {userLoggedin.confirmed.toString()}</p>
                <p>Blocked: {userLoggedin.blocked.toString()}</p>
                <p>Created At: {userLoggedin.createdAt}</p>
                <p>Updated At: {userLoggedin.updatedAt}</p>
            </li>
        </ul>
        ) : <p>You must be logged in or <a className='sign-up' href='/register'>sign up</a></p>}
        </div>
            {!userLoggedin ? (
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
                    {errorMessage && <h3 style={{color:"red"}}>{errorMessage}</h3>}
                    <a className='restore-password' href='/restore-password'>Forgot password?</a>
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
