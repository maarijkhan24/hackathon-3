import { groq } from "next-sanity";

export const allProductsQuery = groq`
 *[_type == "foodProduct"] {
 _id,
 name,
 price,
 description,
 "imageUrl": images[0].asset->url, // ✅ Fetch first image
 "rating": coalesce(rating, 0), // ✅ Ensure rating is not null
 category->{
 _id,
 name
 }
 }
`;


export const singleProductQuery = groq`
 *[_type == "foodProduct" && slug.current == $slug][0] {
 _id,
 name,
 price,
 description,
 "imageUrl": images[0].asset->url, // ✅ Fetch first image
 "rating": coalesce(rating, 0), // ✅ Ensure rating is not null
 category->{
 _id,
 name
 }
 }
`;