"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAppDispatch } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { Button } from "../ui/button";
import { CreditCard, Loader2 } from "lucide-react";

interface CheckoutFormProps {
  clientSecret: string;
  isMock: boolean;
}

// Inner component for real Stripe flow
function StripeCheckoutFormInner({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 space-y-4">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-[#B2A088]" />
          Payment Information
        </h3>
        <div className="stripe-payment-element">
          <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        </div>
      </div>

      {message && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl p-4 text-sm font-medium">
          {message}
        </div>
      )}

      <Button
        disabled={isLoading || !stripe}
        className="w-full bg-[#B2A088] hover:bg-[#A39178] disabled:bg-white/10 disabled:text-white/40 text-white h-14 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing Secure Payment...
          </>
        ) : (
          `Pay Now`
        )}
      </Button>
    </form>
  );
}

// Inner component for simulated Mock flow (does not call Stripe hooks)
function MockCheckoutFormInner() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      dispatch(clearCart());
      router.push("/checkout/success?mock=true");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#B2A088]/20 border border-[#B2A088]/40 rounded-xl p-4 text-sm text-[#E2D2BC] leading-relaxed">
        <p className="font-semibold mb-1">Sandbox Mode Active</p>
        We couldn&apos;t detect your Stripe API credentials. You can test the checkout flow using this simulated form. Pressing the button will simulate a secure checkout.
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 space-y-4">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-[#B2A088]" />
          Payment Information (Sandbox)
        </h3>

        <div className="space-y-4 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Cardholder Name
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                className="w-full bg-[#18231E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#B2A088] transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Card Number
              </label>
              <input
                type="text"
                required
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                className="w-full bg-[#18231E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#B2A088] transition-colors text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                Expiration Date
              </label>
              <input
                type="text"
                required
                placeholder="MM/YY"
                maxLength={5}
                className="w-full bg-[#18231E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#B2A088] transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                CVC
              </label>
              <input
                type="text"
                required
                placeholder="123"
                maxLength={3}
                className="w-full bg-[#18231E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#B2A088] transition-colors text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        disabled={isLoading}
        className="w-full bg-[#B2A088] hover:bg-[#A39178] text-white h-14 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Simulating Secure Payment...
          </>
        ) : (
          `Pay Now`
        )}
      </Button>
    </form>
  );
}

export default function CheckoutForm({ clientSecret, isMock }: CheckoutFormProps) {
  if (isMock) {
    return <MockCheckoutFormInner />;
  }
  return <StripeCheckoutFormInner clientSecret={clientSecret} />;
}
