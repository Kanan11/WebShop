import React, { useState } from 'react';
import './Register.scss';

interface User {
  username: string;
  password: string;
  name: string;
  email: string;
}

interface RegisterProps {
  //onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: User = { username, password, name, email };
    setUsers([...users, newUser]);
    // onRegister(newUser);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <label className="register-label">
          Username:
          <input className="register-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label className="register-label">
          Password:
          <input className="register-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label className="register-label">
          Name:
          <input className="register-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label className="register-label">
          Email:
          <input className="register-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
