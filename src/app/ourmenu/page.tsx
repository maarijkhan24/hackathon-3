import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoSearch } from 'react-icons/io5';
import { PiUserBold } from 'react-icons/pi';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import sanityClient from '@/sanity/lib/client';

type fullProduct = {
  _id: string;
  image: {
    asset: {
      url: string;
    };
  };
  name: string;
  categoryName: string;
  price: number;
  slug: string;
};

async function getData() {
  const query = `*[_type == "food"] {
    _id,
    name,
    price,
    description,
    image {
      asset -> {
        url
      }
    }
  }`;

  const data = await sanityClient.fetch(query);
  return data;
}

export default async function Newest() {
  const data: fullProduct[] = await getData();

  return (
    <div>
      <header className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold text-yellow-500">FoodTuck</h1>
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
            <h1><IoSearch className="text-white text-[20px] cursor-pointer" /></h1>
            <h1><Link href="/signup"><PiUserBold className="text-white text-[20px] cursor-pointer" /></Link></h1>
          </div>
          <div className="lg:hidden block">
            <Sheet>
              <SheetTrigger>
                <GiHamburgerMenu className="text-white text-[24px] cursor-pointer" />
              </SheetTrigger>
              <SheetContent>
                <ul className="flex flex-col gap-2 font-medium text-[16px] text-white">
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

      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/allnav.png')" }}
      >
        <div className="text-center text-white">
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › Shop
          </p>
        </div>
      </section>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-6 justify-center">
            {data.map((product) => (
              <div key={product._id} className="group relative text-center">
                <div className="aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                  <Image
                    src={product.image.asset.url}
                    alt="Product image"
                    className="w-full h-full object-cover object-center"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="mt-4 flex justify-center items-center flex-col">
                  <p className="mt-1 text-sm text-gray-500">{product.name}</p>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
