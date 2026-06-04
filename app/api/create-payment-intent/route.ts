import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Only initialize Stripe if key exists, otherwise fallback to mock mode for testing
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-01-27.accredited" as any,
    })
  : null;

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Calculate server-side total to prevent tampering
    let subtotal = 0;
    for (const item of items) {
      const dbProduct = products.find((p) => p.id === item.product.id);
      if (dbProduct) {
        subtotal += dbProduct.price * item.quantity;
      }
    }

    const tax = subtotal * 0.08; // 8% sales tax
    const shipping = subtotal > 150 ? 0 : 9.99; // Free shipping over $150
    const totalAmount = subtotal + tax + shipping;
    const amountInCents = Math.round(totalAmount * 100);

    // If Stripe is not configured or in mock test mode
    if (!stripe || !stripeSecretKey || stripeSecretKey.startsWith("sk_test_placeholder")) {
      console.warn("Stripe Secret Key not found or placeholder used. Falling back to Mock Payment Intent.");
      return NextResponse.json({
        clientSecret: "mock_secret_" + Math.random().toString(36).substr(2, 9),
        mock: true,
        pricing: {
          subtotal,
          tax,
          shipping,
          total: totalAmount,
        },
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration_check: "accept_a_payment",
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      mock: false,
      pricing: {
        subtotal,
        tax,
        shipping,
        total: totalAmount,
      },
    });
  } catch (error: any) {
    console.error("Payment intent creation failed:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
