// lib/cms/sanity.ts
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

// Improved validation to provide a clear error message
if (!projectId || projectId === 'REPLACE_WITH_YOUR_SANITY_PROJECT_ID') {
  throw new Error(
    'Sanity project ID is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env file.',
  )
}
if (!dataset) {
  throw new Error(
    'Sanity dataset is not configured. Please set NEXT_PUBLIC_SANITY_DATASET in your .env file.',
  )
}
if (!apiVersion) {
  throw new Error(
    'Sanity API version is not configured. Please set NEXT_PUBLIC_SANITY_API_VERSION in your .env file.',
  )
}


export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` if you want to ensure fresh data
})
