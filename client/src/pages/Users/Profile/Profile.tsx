import React, { useState } from 'react';
// import Login from '../Login/Login';
import './Profile.scss'
import { User } from '../../../types/types';
import { useGetUser } from '../../../hooks/useGetUser';
import { useFormattedDate } from '../../../hooks/useFormattedDate';

const Profile: React.FC = () => {
  const demo = {
      "id": 10,
      "username": "lastName12",
      "email": "lastname@mail.com",
      "provider": "local",
      "confirmed": true,
      "blocked": false,
      "createdAt": "2023-04-07T23:00:20.880Z",
      "updatedAt": "2023-04-09T11:49:01.357Z",
      "lastname": "lastName34",
      "orders": [
          {
              "id": 1,
              "email": "demoMail@mail.se",
              "name": "John Silver",
              "phone": "0767564534",
              "session_id": "cs_test_a1VKWh5dt44ImwCnAylO2tCRDWgAYJMB0von85i1kC6MulAMZzxZmCKqZG",
              "payment_status": "unpaid",
              "status": "open",
              "createdAt": "2023-03-30T14:13:10.624Z",
              "updatedAt": "2023-03-30T14:13:11.319Z",
              "publishedAt": "2023-03-30T14:13:10.622Z"
          },
          {
              "id": 11,
              "email": "asasas@mail.se",
              "name": "John Silver",
              "phone": "0767564534",
              "session_id": null,
              "payment_status": null,
              "status": null,
              "createdAt": "2023-04-04T14:01:53.787Z",
              "updatedAt": "2023-04-04T14:01:53.787Z",
              "publishedAt": "2023-04-04T14:01:53.781Z"
          },
          {
              "id": 20,
              "email": "demoMail@mail.se",
              "name": "John Silver",
              "phone": "0767564534",
              "session_id": "cs_test_a1hq1bym11NDqRXl1KawgRvvHKWDtQfqm4ymgaiYqBHXiM8tZG1tHfABqa",
              "payment_status": "unpaid",
              "status": "open",
              "createdAt": "2023-04-05T13:31:47.969Z",
              "updatedAt": "2023-04-05T13:31:48.640Z",
              "publishedAt": "2023-04-05T13:31:47.966Z"
          }
      ],
      "shipping_adress": {
          "id": 6,
          "street": "Vasagatan 52",
          "postal_code": "41628",
          "country": "Sweden",
          "name": "John Silver",
          "phone": "0767564534",
          "createdAt": "2023-03-30T14:51:55.270Z",
          "updatedAt": "2023-03-30T14:51:55.270Z",
          "publishedAt": "2023-03-30T14:51:55.268Z",
          "city": null
      }
  }
  
  const user = useGetUser().userLoggedIn
  console.log(user)
  
  // const [user, setUser] = useState<User | null>(useGetUser().userLoggedIn as any);

  const handleLogin = (user: User) => {
    // setUser(user);
  };

  const handleLogout = () => {
    // setUser(null);
  };
  const createdAt = useFormattedDate(user?.createdAt || '');
  const updatedAt = useFormattedDate(user?.updatedAt || '');
  return (
    <div>
      {user ? (
        <div>
          <div>
          <br></br>
            <h2>User Information</h2>
              <div className="order-card">
                <p>Username: {user.username}</p>
                <p>Last Name: {user.lastname}</p>
                <p>Email: {user.email}</p>
              </div>
            <br></br>
            <div className="orders-container">
              {user?.orders?.map((order) => (
                <div key={order.id} className="order-card">
                  <p>Order ID: {order.id}</p>
                  <p>Email: {order.email}</p>
                  <p>Name: {order.name}</p>
                  <p>Phone: {order.phone}</p>
                  <p>Payment Status: {order.payment_status}</p>
                  <p>Status: {order.status}</p>
                  <p>Created At: {createdAt}</p>
                  <p>Updated At: {updatedAt}</p>
                </div>
              ))}
            </div>
            <br></br>
            <div>
            <h2>Shipping Address</h2>
            <div className="order-card">
              <p>Name: {user.shipping_adress?.name}</p>
              <p>Street: {user.shipping_adress?.street}</p>
              <p>Postal Code: {user.shipping_adress?.postal_code}</p>
              <p>City: {user.shipping_adress?.city}</p>
              <p>Country: {user.shipping_adress?.country}</p>
              <p>Phone: {user.shipping_adress?.phone}</p>
            </div>
            </div>
          </div>
        </div>
      ) : (
        <p>You must be logged in or <a className='sign-up' href='/register'>sign up</a></p>
      )}
    </div>
  );
};

export default Profile;
