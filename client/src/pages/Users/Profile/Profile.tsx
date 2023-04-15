import React from 'react';
import './Profile.scss'
import { User } from '../../../types/types';
import { UseGetUser } from '../../../hooks/useGetUser';
import { useFormattedDate } from '../../../hooks/useFormattedDate';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  
  const user = UseGetUser().userLoggedIn
  // console.log(user)
  
  // const [user, setUser] = useState<User | null>(useGetUser().userLoggedIn as any);

  const handleLogin = (user: User) => {
    // setUser(user);
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
                  <Link key={order.id} to={`/order/${order.id}`} className="order-card">
                  <p>Order ID: {order.id}</p>
                  <p>Email: {order.email}</p>
                  <p>Name: {order.name}</p>
                  <p>Phone: {order.phone}</p>
                  <p>Payment Status: {order.payment_status}</p>
                  <p>Status: {order.status}</p>
                  <p>Created At: {createdAt}</p>
                  <p>Updated At: {updatedAt}</p>
                </Link>
              ))}
            </div>
            <br></br>
            <div className='adress-container'>
              <div className='adresses'>
                <h2 style={{textAlign: 'center'}}>Shipping Address</h2>
                <div className="order-card">
                  <p>Name: {user.shipping_adress?.name}</p>
                  <p>Street: {user.shipping_adress?.street}</p>
                  <p>Postal Code: {user.shipping_adress?.postal_code}</p>
                  <p>City: {user.shipping_adress?.city}</p>
                  <p>Country: {user.shipping_adress?.country}</p>
                  <p>Phone: {user.shipping_adress?.phone}</p>
                </div>
              </div>
              <div>
                <h2 style={{textAlign: 'center'}}>Invoice Address</h2>
                <div className="order-card">
                  <p>Name & Surname: {`${user?.username} ${user?.lastname}`}</p>
                  <p>C/O Name: {user.adress?.co_name}</p>
                  <p>Street: {user.adress?.street}</p>
                  <p>Postal Code: {user.adress?.postal_code}</p>
                  <p>City: {user.adress?.city}</p>
                  <p>Country: {user.adress?.country}</p>
                  <p>Phone: {user.phone}</p>
                </div>
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
