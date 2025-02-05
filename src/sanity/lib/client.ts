import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: "gzsbg3ap",
  dataset: "production",
  apiVersion: "2025-01-18",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export default client
