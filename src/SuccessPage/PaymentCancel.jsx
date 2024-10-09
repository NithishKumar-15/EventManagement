import { useNavigate } from "react-router-dom";
import style from "./page.module.css"

const PaymentCancel = () => {
    const navigate=useNavigate();
    return (
        <>
            <div className={`${style.content} d-flex justify-content-center align-items-center`}>
                <div>
                    <h3>Your Payment Canceled</h3>
                    <span className="d-block text-center"> ❌❌❌❌❌</span>
                    <button onClick={() => navigate("/")} className="d-block btn btn-primary mx-auto">Click Login</button>
                </div>
            </div>
        </>
    )
}

export default PaymentCancel;