export interface fullProduct {
    price_id?: string;
    _id: string;
    name: string;
    slug: string;
    category: {
    name: string; // Updated to reflect the category object
    };
    price: number;
    description: string;
    images: string[]; // Array of image URLs or image objects
    stockStatus?: string;
    products?: fullProduct[]; // If there are related products
    createdAt: string;
    rating?: number; // Optional rating
    imageUrl?: string; // Optional image URL for the grid
   }