"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./action";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { PiUserBold } from "react-icons/pi";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    createPaymentIntent()
      .then((res) => {
        setClientSecret(res.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
  }, []);

  if (!clientSecret) {
    return <div className="flex justify-center items-center h-screen text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔥 Stylish Header */}
      <header className="bg-black text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-yellow-500">FoodTuck</h1>
          <nav className="hidden lg:flex space-x-6 text-sm font-medium">
            <Link href="/" className="hover:text-yellow-400">Home</Link>
            <Link href="/ourmenu" className="hover:text-yellow-400">Menu</Link>
            <Link href="/blog" className="hover:text-yellow-400">Blog</Link>
            <Link href="/ourchef" className="hover:text-yellow-400">Chef</Link>
            <Link href="/aboutus" className="hover:text-yellow-400">About</Link>
            <Link href="/shop" className="hover:text-yellow-400">Shop</Link>
            <Link href="/signin" className="hover:text-yellow-400">Signin</Link>
          </nav>
          <div className="flex gap-4">
            <IoSearch className="text-white text-2xl cursor-pointer" />
            <Link href="/signup">
              <PiUserBold className="text-white text-2xl cursor-pointer" />
            </Link>
          </div>
        </div>
      </header>

      {/* 🔥 Hero Section */}
      <section className="bg-cover bg-center h-64 flex items-center justify-center" style={{ backgroundImage: "url('/allnav.png')" }}>
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Checkout</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › Checkout
          </p>
        </div>
      </section>

      {/* 🔥 Payment Section */}
      <div className="max-w-lg mx-auto mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Secure Checkout</h2>
        <p className="text-gray-500 text-center mt-2">Complete your purchase by entering your payment details below.</p>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred");
      setIsProcessing(false);
    } else {
      setErrorMessage(null);
      alert("🎉 Payment successful!");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <PaymentElement className="bg-gray-100 p-4 rounded-lg" />

      {/* 🛒 Checkout Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition disabled:bg-yellow-300"
      >
        {isProcessing ? "Processing..." : "Checkout"}
      </button>

      {/* ❌ Error Message */}
      {errorMessage && (
        <div className="text-red-500 mt-2 text-center bg-red-100 p-2 rounded">
          {errorMessage}
        </div>
      )}
    </form>
  );
}
