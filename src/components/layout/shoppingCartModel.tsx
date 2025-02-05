"use client";
import Image from "next/image";
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
} from "@/components/ui/sheet";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";

export default function ShoppingCartModel() {
 const {
 cartCount,
 shouldDisplayCart,
 handleCartClick,
 cartDetails,
 removeItem,
 totalPrice = 0, // Ensure totalPrice has a fallback value of 0
 redirectToCheckout,
 } = useShoppingCart();

 async function handleCheckoutClick(event: any) {
 event.preventDefault();
 try {
 const result = await redirectToCheckout();
 if (result.error) {
 console.error("Checkout Error: ", result.error);
 }
 } catch (err) {
 console.error("Error during checkout: ", err);
 }
 }

 return (
 <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
 <SheetContent className="bg-yellow-600 sm:max-w-lg w-[90vw]">
 <SheetHeader>
 <SheetTitle>Shopping Cart</SheetTitle>
 </SheetHeader>
 <div className="h-full flex flex-col justify-between">
 <div className="mt-8 flex-1 overflow-y-auto">
 <ul className="-my-6 divide-y divide-gray-200">
 {cartCount === 0 ? (
 <p className="text-center text-xl font-semibold mt-4">
 Your cart is empty
 </p>
 ) : (
 <>
 {Object.values(cartDetails ?? {}).map((entry: any) => (
 <li key={entry.id} className="flex py-6">
 <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md ">
 <Image
 src={entry.image as string}
 alt={entry.name || "product image"}
 width={100}
 height={100}
 loading="lazy"
 />
 </div>

 <div className="ml-4 flex flex-1 flex-col">
 <div>
 <div className="flex justify-between text-base font-medium">
 <h3>{entry.name}</h3>
 <p className="ml-4">${entry.price}</p>
 </div>
 <p className="mt-1 text-sm line-clamp-2">
 {entry.description}
 </p>
 </div>
 <div className="flex flex-1 items-end justify-between text-sm">
 <p>QTY: {entry.quantity}</p>

 <div className="flex gap-2">
 <button
 type="button"
 onClick​={() => removeItem(entry.id)}
 className="font-medium hover:text-primary/80"
 >
 Remove
 </button>
 </div>
 </div>
 </div>
 </li>
 ))}
 </>
 )}
 </ul>
 </div>
 <div className="flex justify-between text-base font-medium">
 <p>Subtotal:</p>
 <p>
 ${totalPrice && !isNaN(totalPrice) ? totalPrice.toFixed(2) : "0.00"}
 </p>
 </div>
 <p className="mt-0.5 text-sm">
 Shipping and taxes are calculated at checkout
 </p>

 <div className="mt-6">
 <Button onClick​={handleCheckoutClick} className="w-full">
 Checkout
 </Button>
 </div>
 <div className="bg-yellow-500 text-black px-4 py-2 justify-center rounded-md hover:bg-yellow-600 transition duration-200">
 <button
 onClick​={handleCartClick}
 className="font-medium justify-center"
 >
 Continue Shopping
 </button>
 </div>
 </div>
 </SheetContent>
 </Sheet>
 );
}

