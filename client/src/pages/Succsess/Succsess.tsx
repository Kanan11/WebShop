import React from "react"
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const Success: React.FC = () => {

    const query = useQuery();
    const id = query.get('id');
    const amount = query.get('amount');
    const location = useLocation();
    console.log("location", location)
return(
    <div>
        <h1>Thank you!</h1>
        <span>id is {id}</span>
        <span>amount is {amount}</span>
    </div>
)
}

export default Success