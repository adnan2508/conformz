import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const PaymentSuccess = () => {
    const [transactionId, setTransactionId] = useState("")
    useEffect(() => {
        const currentUrl = new URL(window.location.href);
    
        const params = new URLSearchParams(currentUrl.search);
        const tranId = params.get("tranId");
        console.log("tranId:", tranId);
        setTransactionId(tranId);
      }, []);
    return (
        <div className="w-full my-20 py-20">
            <div className="container mx-auto flex flex-col items-center">
                <img src={'https://i.ibb.co/Q9kb1mX/payment-ok.gif'} className="rounded-full border-4 border" />
                <div className="border rounded-lg border-2 p-10 mt-10">
                {/* <h1 className="text-2xl"><span className="text-lg">Dear</span> {user.displayName} </h1> */}
                <p className="text-success">You payment has been completed successfully!</p>
                {/* <p className="">Transaction ID is : <span className="font-bold">{transactionId}  </span></p> */}
                </div>
                <Link to={'/dashboard'}><button className="btn bg-blue-300 hover:bg-blue-400 hover:text-white mt-2">Go to dashboard</button></Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;