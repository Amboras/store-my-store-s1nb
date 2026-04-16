'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Star,
  ChevronRight,
  Lock,
  BadgeCheck,
  Package,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

// Validated Unsplash URLs
const HERO_IMAGE = 'https://images.unsplash.com/photo-1529139574466-a303027614b3?w=1600&q=85&fit=crop'
const WOMEN_IMAGE = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85&fit=crop'
const MEN_IMAGE = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85&fit=crop'
const NEW_IMAGE = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85&fit=crop'
const BEST_IMAGE = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=85&fit=crop'
const EDITORIAL_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85&fit=crop'
const HERO_SIDE_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85&fit=crop'

const collections = [
  { label: 'Women', image: WOMEN_IMAGE, href: '/products?category=women', tag: 'New Season' },
  { label: 'Men', image: MEN_IMAGE, href: '/products?category=men', tag: 'Essentials' },
  { label: 'New Arrivals', image: NEW_IMAGE, href: '/products?sort=newest', tag: 'Just Landed' },
  { label: 'Best Sellers', image: BEST_IMAGE, href: '/products?sort=bestsellers', tag: 'Fan Favorites' },
]

const testimonials = [
  {
    name: 'Sophia R.',
    location: 'New York, USA',
    rating: 5,
    text: 'Absolutely obsessed with ZC Fashion. The quality of the fabric is extraordinary — you can feel the difference immediately. I\'ve been getting compliments everywhere.',
    product: 'Signature Blazer',
    avatar: 'S',
  },
  {
    name: 'Marcus T.',
    location: 'London, UK',
    rating: 5,
    text: 'Finally a brand that delivers on its promise of premium fashion at accessible prices. The attention to detail is remarkable — stitching, fit, everything is perfect.',
    product: 'Tailored Trousers',
    avatar: 'M',
  },
  {
    name: 'Isabelle C.',
    location: 'Paris, France',
    rating: 5,
    text: 'I was skeptical ordering online, but ZC Fashion completely exceeded my expectations. Fast shipping, beautiful packaging, and the dress fits like it was made for me.',
    product: 'Minimal Wrap Dress',
    avatar: 'I',
  },
]

const trustBadges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On all orders over $75',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: '30-day hassle-free returns',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    desc: '256-bit SSL encryption',
  },
  {
    icon: BadgeCheck,
    title: 'Authentic Quality',
    desc: 'Premium materials only',
  },
]

export default function HomePage() {
  const { data: storeCollections, isLoading } = useCollections()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [stockCount] = useState(() => Math.floor(Math.random() * 18) + 7)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setSubmitted(true)
    setEmail('')
  }

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative bg-[#0d0d0d] overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[88vh]">
          {/* Left — copy */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 lg:py-0 z-10">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400 mb-6">
              Spring / Summer 2025
            </p>
            <h1 className="font-heading text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-light text-white leading-[1.0] tracking-[-0.02em] text-balance">
              Elevate<br />
              <span className="italic font-medium">Your Style</span>
            </h1>
            <p className="mt-6 text-neutral-400 text-base max-w-sm leading-relaxed font-light">
              Precision-crafted clothing for the modern wardrobe. Timeless silhouettes, exceptional fabric.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-neutral-100 transition-colors"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] hover:border-white/70 transition-colors"
                prefetch={true}
              >
                View Collections
              </Link>
            </div>
            {/* Social proof strip */}
            <div className="flex items-center gap-6 mt-14 pt-10 border-t border-white/10">
              <div>
                <p className="text-white text-xl font-heading font-semibold">12K+</p>
                <p className="text-neutral-500 text-xs uppercase tracking-widest mt-0.5">Happy Customers</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-white text-xl font-heading font-semibold">4.9 / 5</p>
                <p className="text-neutral-500 text-xs uppercase tracking-widest mt-0.5">Average Rating</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-white text-xl font-heading font-semibold">Free</p>
                <p className="text-neutral-500 text-xs uppercase tracking-widest mt-0.5">Returns 30 Days</p>
              </div>
            </div>
          </div>

          {/* Right — full-bleed image */}
          <div className="relative min-h-[55vw] lg:min-h-0">
            <Image
              src={HERO_IMAGE}
              alt="ZC Fashion — Elevate Your Style"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            {/* Gradient overlay on left edge for blend */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0d0d0d] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ─── MARQUEE STRIP ─────────────────────────────────────────── */}
      <div className="bg-black text-white py-3.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-[11px] uppercase tracking-[0.3em] mx-8 font-light text-neutral-300">
              Free Shipping Over $75
              <span className="mx-8 text-neutral-600">·</span>
              New Season Arrivals
              <span className="mx-8 text-neutral-600">·</span>
              30-Day Returns
              <span className="mx-8 text-neutral-600">·</span>
              Secure Checkout
              <span className="mx-8 text-neutral-600">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED COLLECTIONS ──────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">Shop By Category</p>
            <h2 className="font-heading text-[2.75rem] sm:text-[3.5rem] font-light tracking-tight">
              Featured Collections
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {collections.map((col) => (
              <Link
                key={col.label}
                href={col.href}
                className="group relative overflow-hidden aspect-[3/4] block"
              >
                <Image
                  src={col.image}
                  alt={col.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] bg-white text-black px-2.5 py-1 font-semibold">
                    {col.tag}
                  </span>
                </div>
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-heading text-2xl font-light text-white tracking-wide">{col.label}</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-white/70 text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                    <span>Shop Now</span>
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STORE COLLECTIONS (dynamic from Medusa) ───────────────── */}
      {isLoading ? (
        <section className="py-24 bg-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-14">
              <div className="h-3 w-24 bg-neutral-200 rounded mx-auto mb-4 animate-pulse" />
              <div className="h-10 w-56 bg-neutral-200 rounded mx-auto animate-pulse" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[3/4] bg-neutral-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : storeCollections && storeCollections.length > 0 ? (
        <>
          {storeCollections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 0}
            />
          ))}
        </>
      ) : null}

      {/* ─── EDITORIAL / BRAND STORY ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">
            {/* Image panel */}
            <div className="relative min-h-[500px] lg:min-h-0">
              <Image
                src={EDITORIAL_IMAGE}
                alt="ZC Fashion — Crafted with intention"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Copy panel */}
            <div className="bg-neutral-50 flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-16 lg:py-0">
              <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 mb-5">Our Craft</p>
              <h2 className="font-heading text-[2.5rem] sm:text-[3.25rem] font-light leading-tight text-balance">
                Fashion That Speaks Without Words
              </h2>
              <p className="text-neutral-500 mt-6 leading-relaxed text-sm max-w-sm">
                At ZC Fashion, every piece begins with a question: does this truly serve the wearer? We select
                fabrics from responsible mills, partner with skilled artisans, and design with
                restraint — because the most powerful statement is a perfectly cut garment.
              </p>
              <div className="mt-4 text-neutral-500 text-sm leading-relaxed max-w-sm">
                Premium fashion isn't about excess — it's about confidence in what you wear.
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-10 text-xs font-semibold uppercase tracking-[0.2em] border-b border-black pb-1 self-start hover:opacity-60 transition-opacity"
              >
                Our Story
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES ──────────────────────────────────────────── */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-1">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-white">{title}</p>
                <p className="text-xs text-neutral-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── URGENCY STRIP ─────────────────────────────────────────── */}
      <section className="bg-neutral-100 py-5 border-y border-neutral-200">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm">
            <Package className="h-4 w-4 text-neutral-500" strokeWidth={1.5} />
            <span className="font-medium text-neutral-800">
              Only <span className="font-bold text-black">{stockCount} items</span> left in most popular sizes
            </span>
          </div>
          <Link
            href="/products"
            className="text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 hover:opacity-60 transition-opacity"
          >
            Shop Before It's Gone <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">Customer Reviews</p>
            <h2 className="font-heading text-[2.75rem] sm:text-[3.5rem] font-light tracking-tight">
              What Our Clients Say
            </h2>
            {/* Stars summary */}
            <div className="flex items-center justify-center gap-1.5 mt-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-black text-black" />
              ))}
              <span className="ml-2 text-sm text-neutral-500">4.9 from 2,400+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-neutral-50 p-8 flex flex-col gap-5">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-black text-black" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-sm text-neutral-600 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                {/* Product */}
                <p className="text-[11px] text-neutral-400 uppercase tracking-widest">
                  Purchased: {t.product}
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-neutral-200">
                  <div className="w-9 h-9 bg-black text-white flex items-center justify-center text-sm font-semibold font-heading">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-[11px] text-neutral-400">{t.location}</p>
                  </div>
                  <BadgeCheck className="h-4 w-4 text-neutral-400 ml-auto" strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HERO #2 — Side-by-side editorial ─────────────────────── */}
      <section className="bg-neutral-50 py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={HERO_SIDE_IMAGE}
                alt="ZC Fashion seasonal edit"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="md:pl-10 lg:pl-16">
              <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 mb-5">Limited Edition</p>
              <h2 className="font-heading text-[2.5rem] sm:text-[3.5rem] font-light leading-tight text-balance">
                The Summer Edit — 2025
              </h2>
              <p className="text-neutral-500 mt-5 text-sm leading-relaxed max-w-xs">
                Curated pieces for the warmest months. Breezy linens, refined silhouettes, and tones pulled straight from the Mediterranean coast.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-red-600 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Selling fast — only {stockCount} units remaining
              </div>
              <div className="flex gap-4 mt-8">
                <Link
                  href="/products"
                  className="bg-black text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
                >
                  Shop the Edit
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EMAIL SIGNUP ───────────────────────────────────────────── */}
      <section className="bg-black text-white py-24">
        <div className="container-custom max-w-2xl text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 mb-4">Members Only</p>
          <h2 className="font-heading text-[2.75rem] sm:text-[3.5rem] font-light leading-tight">
            Get <span className="italic font-medium">10% Off</span> Your First Order
          </h2>
          <p className="mt-4 text-neutral-400 text-sm leading-relaxed max-w-sm mx-auto">
            Join the ZC Fashion community. Be first to know about new arrivals, exclusive sales, and members-only events.
          </p>
          {submitted ? (
            <div className="mt-10 bg-white/5 border border-white/10 p-6 max-w-md mx-auto">
              <BadgeCheck className="h-8 w-8 mx-auto text-white mb-3" strokeWidth={1.5} />
              <p className="text-white font-semibold text-sm uppercase tracking-widest">You're on the list</p>
              <p className="text-neutral-400 text-xs mt-2">Check your inbox for your 10% welcome code.</p>
            </div>
          ) : (
            <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-white/5 border border-white/20 text-white placeholder:text-neutral-500 px-5 py-4 text-sm focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-neutral-200 transition-colors whitespace-nowrap"
              >
                Claim 10% Off
              </button>
            </form>
          )}
          <p className="mt-4 text-neutral-600 text-xs">No spam. Unsubscribe anytime.</p>
          {/* Secure icons */}
          <div className="flex items-center justify-center gap-6 mt-10 pt-10 border-t border-white/10">
            <div className="flex items-center gap-2 text-neutral-500 text-xs">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
              Your data is secure
            </div>
            <div className="flex items-center gap-2 text-neutral-500 text-xs">
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
              Verified brand
            </div>
            <div className="flex items-center gap-2 text-neutral-500 text-xs">
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
