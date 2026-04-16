'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, LogIn } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import CartDrawer from '@/components/cart/cart-drawer'
import { useCollections } from '@/hooks/use-collections'

const NAV_LINKS = [
  { label: 'New Arrivals', href: '/products?sort=newest' },
  { label: 'Women', href: '/products' },
  { label: 'Men', href: '/products' },
  { label: 'Collections', href: '/collections' },
  { label: 'Sale', href: '/products', highlight: true },
]

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: collections } = useCollections()

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuCloseRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/96 backdrop-blur-md border-b border-[#e5e5e5] shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
            : 'bg-white border-b border-[#e5e5e5]'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-[64px] items-center justify-between gap-4">

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:opacity-60 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <span className="font-heading text-[1.7rem] font-bold tracking-[0.06em] text-[#111111] leading-none">
                ZC <span className="font-light">FASHION</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-200 pb-0.5 relative group ${
                    link.highlight
                      ? 'text-red-600 hover:text-red-700'
                      : 'text-[#111111] hover:text-[#555]'
                  }`}
                  prefetch={true}
                >
                  {link.label}
                  {!link.highlight && (
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#111111] group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              ))}
              {collections?.slice(0, 2).map((collection: any) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#111111] hover:text-[#555] transition-all duration-200 pb-0.5 relative group"
                  prefetch={true}
                >
                  {collection.title}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#111111] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              <Link
                href="/search"
                className="p-2.5 hover:opacity-60 transition-opacity"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </Link>
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="p-2.5 hover:opacity-60 transition-opacity hidden sm:block"
                aria-label={isLoggedIn ? 'Account' : 'Sign in'}
              >
                {isLoggedIn ? <User className="h-[18px] w-[18px]" /> : <LogIn className="h-[18px] w-[18px]" />}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:opacity-60 transition-opacity"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#111111] text-[9px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-80 max-w-[88vw] bg-white animate-slide-in-right shadow-xl"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#eee]">
              <span className="font-heading text-xl font-bold tracking-[0.05em]">ZC FASHION</span>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 hover:opacity-60"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="px-6 py-4 space-y-0">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-4 text-sm font-semibold uppercase tracking-[0.14em] border-b border-[#f0f0f0] ${
                    link.highlight ? 'text-red-600' : 'text-[#111111]'
                  }`}
                  prefetch={true}
                >
                  {link.label}
                </Link>
              ))}
              {collections?.map((collection: any) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-4 text-sm font-semibold uppercase tracking-[0.14em] border-b border-[#f0f0f0] text-[#111111]"
                  prefetch={true}
                >
                  {collection.title}
                </Link>
              ))}
            </nav>

            {/* Bottom actions */}
            <div className="px-6 pt-4 space-y-0">
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3.5 text-sm text-[#666] border-b border-[#f0f0f0]"
              >
                {isLoggedIn ? <User className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                {isLoggedIn ? 'My Account' : 'Sign In'}
              </Link>
              <Link
                href="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3.5 text-sm text-[#666]"
              >
                <Search className="h-4 w-4" />
                Search
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
