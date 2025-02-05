"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import sanityClient from "@/sanity/lib/client";
import type { fullProduct } from "@/app/interface";
import { Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import clsx from "clsx";
import { urlForImage } from "@/sanity/lib/image";

async function getData(slug: string): Promise<fullProduct | null> {
  const query = `*[_type == "foodProduct" && slug.current == $slug][0]{
    _id,
    name,
    images,
    description,
    "slug": slug.current,
    price,
    rating,
    category->{
      name
    },
    createdAt
  }`;
  return await sanityClient.fetch(query, { slug });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addToCart, totalItems } = useCartStore();
  const [data, setData] = useState<fullProduct | null>(null);
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    getData(params.slug).then((product) => {
      setData(product);
      if (product?.images?.length) {
        setSelectedImage(urlForImage(product.images[0]).url());
      }
    });
    setMounted(true);
  }, [params.slug]);

  if (!data) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-semibold text-gray-700">Product not found</h2>
        <p className="mt-2 text-gray-500">
          Go back to the{" "}
          <Link href="/Newest" className="text-yellow-500 hover:underline">
            shop
          </Link>
          .
        </p>
      </div>
    );
  }

  const { name, images, description, price, category } = data;
  const rating = data.rating ?? 0;
  const productPrice = price ?? 0;
  const categoryName = typeof category === "string" ? category : category?.name || "Uncategorized";

  const handleAddToCart = () => {
    const imageUrl = selectedImage || "/default-image.png";
    addToCart({
      id: data._id,
      name,
      price: productPrice,
      image: imageUrl,
      quantity: 1,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-center py-6 px-8">
          <h1 className="text-2xl font-bold text-yellow-500">FoodTuck</h1>
          <div className="relative">
            <Link href="/shoppingcart">
              <HiOutlineShoppingBag className="text-white text-2xl cursor-pointer" />
              {mounted && totalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-[2px]">
                  {totalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <div className="container mx-auto mt-10 px-6 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Images Section */}
          <div className="flex">
            <div className="flex flex-col space-y-3">
              {images?.slice(0, 3).map((img, index) => {
                const imageUrl = urlForImage(img).url();
                return (
                  <Image
                    key={index}
                    src={imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className={clsx(
                      "w-20 h-20 object-cover rounded-md cursor-pointer border hover:shadow-md transition",
                      selectedImage === imageUrl && "border-2 border-yellow-500"
                    )}
                    onClick={() => setSelectedImage(imageUrl)}
                  />
                );
              })}
            </div>

            <div className="ml-6 flex-grow">
              <Image
                src={selectedImage}
                alt="Selected"
                width={600}
                height={400}
                className="w-full h-[400px] object-cover rounded-lg border border-gray-300 shadow-md"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800">{name}</h2>
            <p className="mt-4 text-gray-600">{description}</p>

            <div className="flex items-center mt-6">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={clsx(
                    "h-6 w-6",
                    index < Math.round(rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  )}
                />
              ))}
              <span className="ml-2 text-gray-600">{rating.toFixed(1)} / 5.0</span>
            </div>

            <p className="mt-6 text-2xl font-bold text-gray-800">Price: ${productPrice.toFixed(2)}</p>
            <p className="mt-2 text-sm text-gray-500">Category: {categoryName}</p>

            <button
              onClick={handleAddToCart}
              className="mt-8 bg-yellow-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
