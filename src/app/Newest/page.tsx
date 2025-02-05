import Link from "next/link";
import Image from "next/image";
import { fullProduct } from "../interface";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { PiUserBold } from "react-icons/pi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import sanityClient from "@/sanity/lib/client";

async function getData() {
 const query = `*[_type == "foodProduct"]{
 _id,
 price,
 name,
 "slug": slug.current,
 "imageUrl": images[0].asset->url,
 category->{
 name
 }
 }`;

 const data = await sanityClient.fetch(query);
 return data;
}

export default async function Newest() {
 const data: fullProduct[] = await getData();

 return (
 <div>
 {/* Header */}
 <header className="bg-black text-white">
 <div className="container mx-auto flex justify-between items-center py-4 px-6">
 <h1 className="text-2xl font-bold text-yellow-500">FoodTuck</h1>
 <nav className="lg:block hidden">
 <ul className="flex space-x-6">
 <li><Link href="/">Home</Link></li>
 <li><Link href="/ourmenu">Menu</Link></li>
 <li><Link href="/blog">Blog</Link></li>
 <li><Link href="/ourchef">Chef</Link></li>
 <li><Link href="/aboutus">About</Link></li>
 <li><Link href="/Newest">Shop</Link></li>
 <li><Link href="/signin">Signin</Link></li>
 </ul>
 </nav>
 <div className="flex gap-4">
 <IoSearch className="text-white text-[24px] cursor-pointer" />
 <Link href="/signup">
 <PiUserBold className="text-white text-[24px] cursor-pointer" />
 </Link>
 </div>
 {/* Mobile Menu */}
 <div className="lg:hidden block">
 <Sheet>
 <SheetTrigger>
 <GiHamburgerMenu className="text-white text-[24px] cursor-pointer" />
 </SheetTrigger>
 <SheetContent>
 <ul className="flex flex-col gap-[10px] font-medium text-[16px] text-black">
 <li><Link href="/">Home</Link></li>
 <li><Link href="/ourmenu">Menu</Link></li>
 <li><Link href="/blog">Blog</Link></li>
 <li><Link href="/ourchef">Chef</Link></li>
 <li><Link href="/aboutus">About</Link></li>
 <li><Link href="/Newest">Shop</Link></li>
 <li><Link href="/signin">Signin</Link></li>
 </ul>
 </SheetContent>
 </Sheet>
 </div>
 </div>
 </header>

 {/* Banner Section */}
 <section
 className="bg-cover bg-center h-64 flex items-center justify-center"
 style={{ backgroundImage: "url('/allnav.png')" }}
 >
 <div className="text-center text-white">
 <h2 className="text-4xl font-bold">Our Shop</h2>
 <p className="pt-[10px]">
 <Link href="/" className="text-yellow-400">Home</Link> › Shop
 </p>
 </div>
 </section>

 {/* Product Grid Section */}
 <div id="products" className="w-full flex justify-center items-center mt-10 mb-10">
 <div className="w-[90%] md:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
 {data.map((product) => (
 <div key={product._id} 
 className="relative bg-white p-4 rounded-md shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col">
 
 {/* Image Container with Fixed Aspect Ratio */}
 <div className="w-full h-[250px] overflow-hidden rounded-md">
 <Image
 alt={product.name}
 className="w-full h-full object-cover object-center"
 src={product.imageUrl || "/fallback-image.jpg"}
 width={300}
 height={250}
 />
 </div>

 {/* Product Info */}
 <div className="mt-4 flex flex-col flex-grow justify-between">
 <div>
 <h3 className="text-lg font-semibold text-gray-800">
 <Link href={`/Product/${product.slug}`}>{product.name}</Link>
 </h3>
 <p className="text-sm text-gray-500">
 {product.category?.name || "Uncategorized"}
 </p>
 </div>
 <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}