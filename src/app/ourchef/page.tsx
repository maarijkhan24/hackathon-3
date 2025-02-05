import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoSearch } from 'react-icons/io5';
import { PiUserBold } from 'react-icons/pi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { client } from '@/sanity/lib/client';

type Chef = {
  _id: string;
  name: string;
  position: string;
  imageUrl: string;
  description: string;
};

async function getData() {
  const query = `*[_type == "chef"]{
    _id,
    name,
    position,
    "imageUrl": image.asset->url,
    description
  }`;

  const data: Chef[] = await client.fetch(query);

  return data;
}

export default async function Newest() {
  const data: Chef[] = await getData();

  return (
    <div>
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
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/signin">Signin</Link></li>
            </ul>
          </nav>
          <div className="flex gap-4">
            <h1><IoSearch className="text-white text-[24px] cursor-pointer" /></h1>
            <h1><Link href="/signup"><PiUserBold className="text-white text-[24px] cursor-pointer" /></Link></h1>
            <h1><Link href="/shoppingcart"><HiOutlineShoppingBag className="text-white text-[24px] cursor-pointer" /></Link></h1>
          </div>
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
                  <li><Link href="/shop">Shop</Link></li>
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
          <h2 className="text-4xl font-bold">Our Chef</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › Chef
          </p>
        </div>
      </section>

      {data.length === 0 ? (
        <p className="text-center text-lg">No chefs available.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((chef) => (
            <div key={chef._id} className="group relative">
              <div className="p-4 w-full max-w-sm">
                <a className="block relative h-48 rounded overflow-hidden">
                  <Image
                    src={chef.imageUrl}
                    alt={`${chef.name} image`}
                    className="object-cover object-center w-full h-full block"
                    width={200} height={200}
                  />
                </a>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/chef/${chef._id}`}>
                        {chef.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {chef.position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}