import { defineField, defineType } from "sanity";

export default defineType({
 name: "user",
 title: "User",
 type: "document",
 fields: [
 defineField({
 name: "name",
 title: "Name",
 type: "string",
 validation: (Rule) =>
 Rule.required().min(2).max(50).warning("Name should be 2-50 characters long"),
 }),
 defineField({
 name: "email",
 title: "Email",
 type: "string",
 validation: (Rule) =>
 Rule.required()
 .email()
 .error("Please enter a valid email address."),
 }),
 defineField({
 name: "password",
 title: "Password",
 type: "string",
 validation: (Rule) =>
 Rule.required().min(6).error("Password must be at least 6 characters long."),
 }),
 defineField({
 name: "avatar",
 title: "Avatar",
 type: "image",
 options: {
 hotspot: true, // Allow users to adjust the focus of the image
 },
 }),
 defineField({
 name: "bio",
 title: "Bio",
 type: "text",
 validation: (Rule) =>
 Rule.max(300).warning("Bio should not exceed 300 characters."),
 }),
 defineField({
 name: "socialLinks",
 title: "Social Links",
 type: "array",
 of: [
 {
 type: "object",
 fields: [
 {
 name: "platform",
 title: "Platform",
 type: "string",
 options: {
 list: [
 { title: "Twitter", value: "twitter" },
 { title: "LinkedIn", value: "linkedin" },
 { title: "GitHub", value: "github" },
 ],
 },
 },
 {
 name: "url",
 title: "URL",
 type: "url",
 validation: (Rule) =>
 Rule.uri({
 scheme: ["http", "https"],
 }).error("Please enter a valid URL."),
 },
 ],
 },
 ],
 }),
 defineField({
 name: "createdAt",
 title: "Created At",
 type: "datetime",
 validation: (Rule) => Rule.required(),
 initialValue: () => new Date().toISOString(),
 }),
 ],
});

