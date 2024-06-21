import React, { useContext, useEffect, useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
    CardElement
} from "@stripe/react-stripe-js";
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../providers/AuthProviders';
import Swal from 'sweetalert2';

const CheckoutForm = ({ price, contestId, contestName, contestImage ,participantName,participantEmail,participantPhotoURL,contestType,creatorEmail,deadline , prize, totalParticipant}) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    // const price = parseInt(contest?.contestPrice, 10)

    console.log("contest from checkout form: price: ", price, "contestId: ",contestId,"contestName: ", contestName, "contestImage: ",contestImage ,"participantName: ",participantName,"participantEmail: ",participantEmail,"participantPhotoURL: ",participantPhotoURL,"contestType: ",contestType,"creatorEmail: ",creatorEmail,"deadline: ",deadline, "prize: ", prize,"totalParticipant",totalParticipant);


    useEffect(() => {
        console.log("price from use effect: ", price);
        axiosSecure.post('create-payment-intent', { price })
            .then(res => {
                console.log("client secret : ", res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "unknown",
                    name: user?.displayName || "anonymous",
                },
            },
        });
        if (confirmError) {
            console.log(confirmError);
        }
        console.log("payment intent", paymentIntent);
        setProcessing(false);
        if (paymentIntent.status == "succeeded") {
            const transactionId = paymentIntent.id;
            const paymentData = {
                contestId,
                participantName,
                participantEmail,
                participantPhotoURL,
                contestName,
                contestType,
                contestImage,
                creatorEmail,
                contestPrice: price,
                deadline,
                transactionId,
                paidAmount: price,
            };
            console.log("Final paymentData to be uploaded: ", paymentData);

            axiosSecure.post("/contest-registration/payment", paymentData).then((res) => {
                console.log("res: ", res, " res.data: ", res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Payment Successful!!!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        }

        console.log("card: ", card);

    }
    return (
        <div className=" mx-auto py-20">
            <div className='border rounded-lg my-5 p-5'>
                <p className='mt-1'>
                    <span className='font-bold me-2'>Contest Name: </span><span>{contestName}</span>
                </p>
                <p className='mt-1'>
                    <span className='font-bold me-2'>Prize: </span><span>{prize}</span>
                </p>
                <p className='mt-1'>
                    <span className='font-bold me-2'>Participant: </span><span>{totalParticipant}</span>
                </p>
                <p className='mt-1'>
                    <span className='font-bold me-2'>Fee to pay : </span><span className='text-xl text-green-600'>{price} $</span>
                </p>

            </div>
            <h1 className='text-sm divider'>Input your card details</h1>
            <form onSubmit={handleSubmit} className='border p-8 bg-slate-300 w-full rounded-lg shadow-lg'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn w-64 btn-neutral btn-sm  mt-8 ' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-500 font-bold'>{cardError}</p>
            }
        </div>
    );
};

export default CheckoutForm;