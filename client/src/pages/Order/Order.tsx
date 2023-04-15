import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Order: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const {data, loading, error} = useFetch(`http://localhost:1337/api/orders/${id}?populate=*`);
    console.log(data?.[0]?.attributes)
    
    return (
    <div>
        {loading ? 'Loading...' : 
        <div>
            {Array.isArray(data) ? (
                data.map(order => (
                    <div key={order.id}>
                        <p>{order.attributes.name}</p>
                        <p>Shipping Address: {order.attributes?.shipping_address?.[0]?.data?.[0]?.attributes?.street ?? 'N/A'}</p>                    </div>
                    ))
            ) : 'Loading...'}
        </div>
        }
    </div>
    )
}
export default Order