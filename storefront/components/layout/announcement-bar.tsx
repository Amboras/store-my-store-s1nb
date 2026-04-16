'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-[#111111] text-white">
      <div className="container-custom flex items-center justify-center py-2.5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-center">
          Free shipping on orders over CHF 75 &nbsp;&mdash;&nbsp;{' '}
          <Link href="/products" className="underline underline-offset-2 hover:no-underline transition-all">
            Shop New Arrivals
          </Link>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-60 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
