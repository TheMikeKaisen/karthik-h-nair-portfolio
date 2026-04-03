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
  revalidate = 3600,
  tags = [],
}: {
  query: string
  params?: any
  revalidate?: number
  tags?: string[]
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate,
      tags,
    },
  })
}