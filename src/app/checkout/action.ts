"use server";

import Stripe from "stripe";

export async function createPaymentIntent() {
 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
 apiVersion: "2025-01-27.acacia",
 });

 try {
 const amount = 2000; // USD 20.00
 const paymentIntent = await stripe.paymentIntents.create({
 amount,
 currency: "usd",
 automatic_payment_methods: {
 enabled: true,
 },
 });

 return {
 clientSecret: paymentIntent.client_secret,
 };
 } catch (error) {
 console.error("Error creating payment intent:", error);
 throw error;
 }
}