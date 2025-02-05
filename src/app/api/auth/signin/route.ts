import { client } from "@/sanity/lib/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
 try {
 const body = await request.json(); // Parse the JSON body
 const { email, password } = body;

 // Fetch the user from Sanity
 const query = `*[_type == "user" && email == $email][0]`;
 const user = await client.fetch(query, { email });

 if (!user) {
 return NextResponse.json(
 { error: "Invalid email or password!" },
 { status: 400 }
 );
 }

 // Validate the password
 const isValidPassword = await bcrypt.compare(password, user.password);
 if (!isValidPassword) {
 return NextResponse.json(
 { error: "Invalid email or password!" },
 { status: 400 }
 );
 }

 return NextResponse.json({ message: "Login successful!", user });
 } catch (error) {
 console.error("Signin Error:", error);
 return NextResponse.json(
 { error: "Something went wrong!" },
 { status: 500 }
 );
 }
}