import { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@/sanity/lib/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 try {
 const userEmail = req.query.email; // Pass the user's email from the frontend
 const query = `*[_type == "user" && email == $email][0]`;
 const params = { email: userEmail };

 const user = await sanityClient.fetch(query, params);

 if (!user) {
 return res.status(404).json({ message: "User not found" });
 }

 res.status(200).json(user);
 } catch (error) {
 res.status(500).json({ message: "Error fetching user profile", error });
 }
}



