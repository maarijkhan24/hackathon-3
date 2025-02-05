import { defineField, defineType } from "sanity";

export const foodProduct = defineType({
 name: "foodProduct",
 title: "Food Product",
 type: "document",
 fields: [
 defineField({
 name: "name",
 title: "Food Product Name",
 type: "string",
 validation: (Rule) => Rule.required().min(3).max(50),
 }),
 defineField({
 name: "slug",
 title: "Slug",
 type: "slug",
 options: {
 source: "name",
 maxLength: 96,
 },
 validation: (Rule) => Rule.required(),
 }),
 defineField({
 name: "category",
 title: "Category",
 type: "reference",
 to: [{ type: "category" }],
 validation: (Rule) => Rule.required(),
 }),
 defineField({
 name: "price",
 title: "Price (USD)",
 type: "number",
 validation: (Rule) => Rule.required().min(0),
 }),
 defineField({
 name: "description",
 title: "Description",
 type: "text",
 validation: (Rule) => Rule.required().min(10).max(500),
 }),
 defineField({
 name: "images",
 title: "Food Images",
 type: "array",
 of: [{ type: "image", options: { hotspot: true } }],
 validation: (Rule) => Rule.min(1).max(10),
 }),

 // ✅ ADD THIS FIELD FOR RATING
 defineField({
 name: "rating",
 title: "Rating",
 type: "number",
 description: "Product rating (0-5)",
 validation: (Rule) => Rule.min(0).max(5),
 }),

 defineField({
 name: "createdAt",
 title: "Created At",
 type: "datetime",
 validation: (Rule) => Rule.required(),
 }),
 ],
});

export default foodProduct;