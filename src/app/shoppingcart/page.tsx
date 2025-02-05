"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { PiCheckSquareOffsetBold } from "react-icons/pi";
import { useCartStore } from "@/store/cartStore";

// Define `CartItem` type to avoid TypeScript errors
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const ShoppingCartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, totalPrice } = useCartStore();
  const [hydratedCart, setHydratedCart] = useState<CartItem[]>([]); // Properly typed state
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setHydratedCart(cart); // Ensure Zustand’s state is properly hydrated
  }, [cart]); // Depend on `cart` to update automatically

  return (
    <div className="mb-[100px]">
      {/* Cart Banner */}
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/allnav.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Shopping Cart</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">
              Home
            </Link>{" "}
            › Cart
          </p>
        </div>
      </section>

      {/* Cart Items */}
      <div className="mt-12 px-4 md:px-[150px]">
        {hydratedCart.length === 0 ? (
          <h1 className="text-center text-xl font-semibold">Your cart is empty.</h1>
        ) : (
          hydratedCart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between text-gray-700 py-4 border-b"
            >
              {/* Product Image */}
              <div className="flex items-center gap-4 w-full md:w-2/5">
                <Image
                  src={item.image ? item.image : "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div>
                  <h1 className="font-semibold">{item.name}</h1>
                  <div className="flex text-yellow-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <IoIosStar key={i} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Price */}
              <h1 className="w-full md:w-1/5 text-center mt-2 md:mt-0">${item.price.toFixed(2)}</h1>

              {/* Quantity Controls */}
              <div className="flex gap-2">
                <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 bg-gray-200">
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1 bg-gray-200">
                  +
                </button>
              </div>

              {/* Total Price */}
              <h1 className="w-full md:w-1/5 text-center mt-2 md:mt-0">${(item.price * item.quantity).toFixed(2)}</h1>

              {/* Remove Button */}
              <button onClick={() => removeItem(item.id)} className="text-red-500">
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Checkout Section */}
      <div className="mt-12 px-4 md:px-[150px]">
        {/* ✅ "Back to Shop" Button */}
        <div className="mt-8 mb-4">
          <Link href="/shop">
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition">
              Back to Shop
            </button>
          </Link>
        </div>

        <div className="border rounded-md p-4">
          <div className="flex justify-between font-bold text-[15.5px]">
            <span>Total Amount</span>
            <span>{isHydrated ? `$${totalPrice().toFixed(2)}` : "Loading..."}</span>
          </div>
        </div>

        <Link href="/checkout">
          <button className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 flex items-center justify-center gap-2">
            Proceed to Checkout <PiCheckSquareOffsetBold />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
