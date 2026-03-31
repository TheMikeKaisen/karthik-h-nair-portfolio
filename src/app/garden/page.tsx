import { Suspense } from 'react'
import type { Metadata } from 'next'
import GardenClient from './GardenClient'

export const metadata: Metadata = {
  title: 'The Garden | Karthik Nair',
  description: 'A collection of technical articles and raw terminal logs from the system architect.',
}

export default function GardenPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Suspense fallback={
          <div className="w-full flex items-center justify-center py-20">
            <div className="font-jetbrains text-emerald-400 animate-pulse text-sm">Querying garden index...</div>
          </div>
        }>
          <GardenClient />
        </Suspense>
      </div>
    </div>
  )
}
