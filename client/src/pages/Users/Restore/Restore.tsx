import { useState } from "react";
import './Restore.scss';

const Restore: React.FC = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleRestore = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch ('http://localhost:1337/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email
                })
            });
            if (response.status === 400) {
                setErrorMessage('Mail adress is not valid')
            } else if (response.status === 200) {
                setErrorMessage('We send you link to restore your password, please check your mail')
            } else if (response.status === 500) {
                setErrorMessage('Internal server error, please try letter')
            }
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        <div className="root-container">
            <p>Restore your password</p>
            <div className="container">
                <form className="box" onSubmit={handleRestore}>
                    <div className="group">
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Mail</label>
                    </div>
                    <br />
                    {errorMessage && <h4 style={{color:"red"}}>{errorMessage}</h4>}
                    <button className="restore" type="submit" style={{ cursor: "pointer" }}>Restore</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default Restore