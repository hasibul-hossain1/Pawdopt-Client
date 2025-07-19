import { api } from "@/lib/api";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";


export default function CheckoutForm({amount,setIsDialogOpen,userData,campaignId,refetch}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await api.post("/create-payment-intent",{amount});

    const { clientSecret } = await res.data;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details:{
          email:userData.email,
          name:userData.name
        }
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const saveData=await api.post('/donate',{campaignId,donatedBy:userData.email,amount,paymentIntentId:result.paymentIntent.id})
        if (saveData.data) {
          refetch()
          alert("✅ Payment successful!");
          setIsDialogOpen(false)
        }else{
          alert('payment error')
        }
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
