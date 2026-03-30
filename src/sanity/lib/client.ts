import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // This enables the Edge Cache for high availability
})

// Helper function for revalidation
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 3600, // Revalidate every hour
}: {
  query: string
  params?: any
  revalidate?: number
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate, // availability over consistency
    },
  })
}