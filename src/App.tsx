import { useState, useEffect, useRef, type ReactNode } from 'react'

// ─── Data ──────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

const BENEFITS = [
  { title: 'Open 24/7', desc: "Round the clock, every day. Night, early morning — we're always here.", icon: IconClock },
  { title: 'Near Metro', desc: '2-minute walk from Prospekt Veteranov station.', icon: IconTrain },
  { title: 'Home Cooking', desc: 'Cooked like family — honest, filling, made with heart.', icon: IconBowl },
  { title: 'Affordable Prices', desc: 'Lunches from 200 ₽. Shawarma from 190 ₽.', icon: IconCoin },
  { title: 'Fresh Every Day', desc: 'Vegetables, meat, and herbs delivered fresh each morning.', icon: IconLeaf },
  { title: 'Cozy Atmosphere', desc: 'Warm interior, soft lighting, music at the right volume.', icon: IconHome },
]

const LUNCHES = [
  { num: 1, items: ['Soup', 'Salad', '2 breads', 'Drink'], price: 200, badge: 'Best Deal', badgeColor: '#6A8D73' },
  { num: 2, items: ['Hot dish', 'Side dish', 'Salad', '2 breads', 'Drink'], price: 230, badge: null, badgeColor: '' },
  { num: 3, items: ['Hot dish', 'Soup', '2 breads', 'Drink'], price: 260, badge: 'Hearty', badgeColor: '#C87A4F' },
  { num: 4, items: ['Hot dish', 'Soup', 'Side dish', 'Salad', '2 breads', 'Drink'], price: 290, badge: 'Maximum', badgeColor: '#1A1A1A' },
]

const SHAWARMAS = [
  { name: 'Mini', desc: 'Light and quick', badge: null },
  { name: 'Classic', desc: 'Our evergreen', badge: 'Hit' },
  { name: 'Double 2×', desc: 'Double the filling', badge: null },
  { name: 'Cheese', desc: 'Melted inside', badge: 'Cheese' },
  { name: 'Double Cheese', desc: 'For cheese lovers', badge: null },
  { name: 'Mexican', desc: 'Corn, jalapeño, salsa', badge: 'Spicy' },
  { name: 'Spicy', desc: 'Not for the faint-hearted', badge: 'Hot' },
  { name: 'Arabic', desc: 'Garlic sauce, herbs', badge: null },
]

const ICE_CREAMS = [
  { name: 'Strawberry', emoji: '🍓' },
  { name: 'Banana', emoji: '🍌' },
  { name: 'Chocolate', emoji: '🍫' },
  { name: 'Vanilla', emoji: '🍦' },
  { name: 'Cream', emoji: '☁️' },
  { name: 'Blueberry', emoji: '🫐' },
  { name: 'Pistachio', emoji: '🌿' },
  { name: 'Lemon-Mint', emoji: '🍋' },
  { name: 'Melon', emoji: '🍈' },
  { name: 'Nut', emoji: '🥜' },
  { name: 'Mango', emoji: '🥭' },
]

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1712730642507-d4ad0904e997?w=800&h=600&fit=crop&auto=format', alt: 'Warm dining hall' },
  { src: 'https://images.unsplash.com/photo-1583354608715-177553a4035e?w=600&h=800&fit=crop&auto=format', alt: 'Table set for two' },
  { src: 'https://images.unsplash.com/photo-1568886875985-ef8a500f8d17?w=800&h=600&fit=crop&auto=format', alt: 'Homestyle soup' },
  { src: 'https://images.unsplash.com/photo-1544031064-9de80864ade5?w=600&h=800&fit=crop&auto=format', alt: 'Airy dining room' },
  { src: 'https://images.unsplash.com/photo-1760888548893-bc2f7e09e972?w=800&h=600&fit=crop&auto=format', alt: 'Freshly wrapped shawarma' },
  { src: 'https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=800&h=600&fit=crop&auto=format', alt: 'Ice cream scoops' },
]

const REVIEWS = [
  { name: 'Anna K.', initials: 'AK', rating: 5, text: "Always come back when I'm in the neighborhood. The soup and fresh bread are just like home. One of those rare places that actually delivers every time." },
  { name: 'Dmitri V.', initials: 'DV', rating: 5, text: 'Late-night shawarma after a long shift — exactly what I needed. Open 24/7, always hot, always tasty. The Mexican shawarma is something else entirely.' },
  { name: 'Maria S.', initials: 'MS', rating: 4, text: "Business lunch for 200 rubles — I've never found better around here. Fast, filling, genuinely cozy. I come three times a week now." },
  { name: 'Pavel N.', initials: 'PN', rating: 5, text: 'Brought the kids for ice cream. Eleven flavors! Pistachio and mango were incredible. The kids asked to go back the very next day.' },
]

const YANDEX_MAPS_URL = 'https://yandex.ru/maps/org/dachnoye/1684105017/'

// ─── Icons ─────────────────────────────────────────────────────────────────

function IconClock({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function IconTrain({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="14" rx="3" /><path d="M4 11h16" /><path d="M12 3v8" />
      <path d="M8 19l-2 2" /><path d="M18 21l-2-2" /><path d="M7 19h10" />
      <circle cx="8.5" cy="15.5" r="1" fill={color} stroke="none" /><circle cx="15.5" cy="15.5" r="1" fill={color} stroke="none" />
    </svg>
  )
}
function IconBowl({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h16a7 7 0 0 1-14 0z" /><line x1="12" y1="3" x2="12" y2="6" />
      <line x1="8" y1="4" x2="9" y2="7" /><line x1="16" y1="4" x2="15" y2="7" /><line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  )
}
function IconCoin({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M14.5 9.5a2.5 2.5 0 0 0-5 0c0 1.5 2.5 2 2.5 4a2.5 2.5 0 0 1-5 0" />
      <line x1="12" y1="6" x2="12" y2="7.5" /><line x1="12" y1="16.5" x2="12" y2="18" />
    </svg>
  )
}
function IconLeaf({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.5a10 10 0 0 0 14.17-14.67l-2 3.17" /><path d="M2 21c6-3 9-7 9-11" />
    </svg>
  )
}
function IconHome({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function IconPin({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function IconMenu({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  )
}
function IconX({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
function IconStar({ filled = true, size = 18 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#E8C87A' : 'none'} stroke="#E8C87A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
function IconArrow({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
function IconSun({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}
function IconMoon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

// ─── Hook: IntersectionObserver fade-in ────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function Fade({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Shared ─────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => <IconStar key={i} filled={i <= rating} />)}
    </div>
  )
}

function SectionHeading({ overline, title, subtitle, center = true }: { overline?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <Fade className={center ? 'text-center' : ''}>
      {overline && (
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C87A4F', marginBottom: 14 }}>
          {overline}
        </p>
      )}
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2, marginBottom: 14 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-2)', maxWidth: 520, margin: center ? '0 auto' : undefined }}>
          {subtitle}
        </p>
      )}
    </Fade>
  )
}

// ─── Theme toggle button ────────────────────────────────────────────────────

function ThemeToggle({ dark, onToggle, navScrolled }: { dark: boolean; onToggle: () => void; navScrolled: boolean }) {
  const color = navScrolled ? 'var(--ink)' : '#fff'
  return (
    <button
      onClick={onToggle}
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      style={{
        background: 'none',
        border: '1.5px solid',
        borderColor: navScrolled ? 'var(--border)' : 'rgba(255,255,255,0.45)',
        borderRadius: 8,
        width: 38,
        height: 38,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color,
        transition: 'border-color 0.2s, color 0.2s, background 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,122,79,0.12)'; e.currentTarget.style.borderColor = '#C87A4F' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = navScrolled ? 'var(--border)' : 'rgba(255,255,255,0.45)' }}
    >
      {dark ? <IconSun size={17} color={color} /> : <IconMoon size={17} color={color} />}
    </button>
  )
}

// ─── Main App ──────────────────────────────────────────────────────────────

export default function App() {
  const getInitialDark = () => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('dachnoye-theme') : null
    if (stored) return stored === 'dark'
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const [dark, setDark] = useState(getInitialDark)
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [activeReview, setActiveReview] = useState(0)
  const [heroReady, setHeroReady] = useState(false)
  const heroImgRef = useRef<HTMLDivElement>(null)

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('dachnoye-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 50)
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px) scale(1.05)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveReview(p => (p + 1) % REVIEWS.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const toggleTheme = () => setDark(p => !p)

  // Reusable card style
  const card = {
    background: 'var(--surface)',
    borderRadius: 16,
    boxShadow: 'var(--card-shadow)',
    padding: 24,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  } as const

  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--ink)', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden', transition: 'background-color 0.3s, color 0.3s' }}>

      {/* ── Navbar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 72,
        display: 'flex', alignItems: 'center', padding: '0 32px', gap: 20,
        background: navScrolled ? 'var(--nav-scrolled)' : 'transparent',
        boxShadow: navScrolled ? '0 1px 24px rgba(0,0,0,0.1)' : 'none',
        backdropFilter: navScrolled ? 'blur(14px)' : 'none',
        transition: 'background 0.35s, box-shadow 0.35s',
      }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: navScrolled ? 'var(--ink)' : '#fff', letterSpacing: '-0.01em', transition: 'color 0.35s', background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
        >
          DACHNOYE
        </button>

        <div className="hidden md:flex" style={{ flex: 1, justifyContent: 'center', gap: 36 }}>
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: navScrolled ? 'var(--ink)' : 'rgba(255,255,255,0.9)', letterSpacing: '0.02em', transition: 'color 0.2s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C87A4F')}
              onMouseLeave={e => (e.currentTarget.style.color = navScrolled ? 'var(--ink)' : 'rgba(255,255,255,0.9)')}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 10 }}>
          <ThemeToggle dark={dark} onToggle={toggleTheme} navScrolled={navScrolled} />
          <button onClick={() => scrollTo('#contact')}
            style={{ background: '#C87A4F', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, transition: 'background 0.2s, transform 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#B06A42'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C87A4F'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <IconPin size={15} color="#fff" />
            Directions
          </button>
        </div>

        <div className="md:hidden" style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <ThemeToggle dark={dark} onToggle={toggleTheme} navScrolled={navScrolled} />
          <button onClick={() => setMobileOpen(p => !p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: navScrolled ? 'var(--ink)' : '#fff' }}>
            {mobileOpen ? <IconX size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'var(--bg)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 600, color: 'var(--ink)' }}
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#contact')}
            style={{ background: '#C87A4F', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 40px', fontSize: 16, fontWeight: 500, cursor: 'pointer', marginTop: 16 }}
          >
            Get Directions
          </button>
        </div>
      )}

      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div ref={heroImgRef} style={{ position: 'absolute', inset: '-5%', backgroundImage: "url('https://images.unsplash.com/photo-1712730642507-d4ad0904e997?w=1920&h=1080&fit=crop&auto=format')", backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.05)', transition: 'transform 0.1s linear' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,6,0.82) 0%, rgba(10,8,6,0.38) 55%, rgba(10,8,6,0.18) 100%)' }} />
        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
          <div style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? 'none' : 'translateY(16px)', transition: 'opacity 0.8s, transform 0.8s' }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 16, opacity: heroReady ? 1 : 0, transition: 'opacity 0.7s 0.1s' }}>
              Urban Bistro · St. Petersburg
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 20, maxWidth: 700, opacity: heroReady ? 1 : 0, transform: heroReady ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s 0.2s, transform 0.7s 0.2s' }}>
              Simply<br />delicious.
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2vw, 19px)', color: 'rgba(255,255,255,0.85)', maxWidth: 460, lineHeight: 1.65, marginBottom: 36, opacity: heroReady ? 1 : 0, transform: heroReady ? 'none' : 'translateY(14px)', transition: 'opacity 0.7s 0.35s, transform 0.7s 0.35s' }}>
              By the metro on Prospekt Veteranov. Hot lunches from 200 ₽. Always open.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40, opacity: heroReady ? 1 : 0, transition: 'opacity 0.7s 0.5s' }}>
              <button onClick={() => scrollTo('#menu')}
                style={{ background: '#C87A4F', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 30px', fontSize: 15, fontWeight: 500, cursor: 'pointer', boxShadow: '0 8px 24px rgba(200,122,79,0.4)', transition: 'transform 0.15s, background 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.background = '#B06A42' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#C87A4F' }}
              >
                Pick a dish
              </button>
              <button onClick={() => scrollTo('#contact')}
                style={{ background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.55)', borderRadius: 12, padding: '15px 30px', fontSize: 15, fontWeight: 500, cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'transparent' }}
              >
                Directions
              </button>
            </div>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', opacity: heroReady ? 1 : 0, transition: 'opacity 0.7s 0.65s' }}>
              {[
                { icon: <IconClock size={15} color="rgba(255,255,255,0.7)" />, label: 'Open 24/7' },
                { icon: <IconTrain size={15} color="rgba(255,255,255,0.7)" />, label: 'Prospekt Veteranov metro' },
                { icon: <IconCoin size={15} color="rgba(255,255,255,0.7)" />, label: 'Lunches from 200 ₽' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  {icon}
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: '96px 32px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <Fade>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C87A4F', marginBottom: 16 }}>Our story</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 22, color: 'var(--ink)' }}>
              Cooked just<br />like home
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 18 }}>
              On Prospekt Veteranov there&apos;s a place where it&apos;s always tasty, cozy, and simple. Dachnoye is not a chain, not fast food, and not a pretentious restaurant.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 36 }}>
              It&apos;s a true urban bistro you&apos;ll want to come back to — where the soup is always on, the bread is always fresh, and the door is always open.
            </p>
            <div style={{ display: 'flex', gap: 40 }}>
              {[{ num: '300+', label: 'Reviews' }, { num: '4.0', label: 'Rating' }, { num: '24/7', label: 'Always open' }].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontWeight: 700, color: '#C87A4F' }}>{num}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </Fade>
          <Fade delay={150}>
            <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', boxShadow: 'var(--img-shadow)', backgroundColor: 'var(--border)' }}>
              <img src="https://images.unsplash.com/photo-1568886875985-ef8a500f8d17?w=800&h=600&fit=crop&auto=format" alt="Home-style dish" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </Fade>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section style={{ background: 'var(--bg-alt)', padding: '96px 32px', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading overline="Why Dachnoye" title="Why people come back again and again" subtitle="Six honest reasons. No marketing speak." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 52 }}>
            {BENEFITS.map((b, i) => (
              <Fade key={b.title} delay={i * 80}>
                <div style={card}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = 'var(--card-shadow-md)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'none'; el.style.boxShadow = 'var(--card-shadow)' }}
                >
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: 'var(--terra-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, transition: 'background 0.3s' }}>
                    <b.icon size={24} color="#C87A4F" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 7, color: 'var(--ink)' }}>{b.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)' }}>{b.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Lunches ── */}
      <section id="menu" style={{ padding: '96px 32px', background: 'var(--bg)', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading overline="Daily menu" title="Lunches that keep you full all day" subtitle="Every day from 12:00 to 16:00. Or whenever you like — we're always ready." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 52 }}>
            {LUNCHES.map((l, i) => (
              <Fade key={l.num} delay={i * 90}>
                <div style={{ ...card, position: 'relative', padding: 28 }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = 'var(--card-shadow-md)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'none'; el.style.boxShadow = 'var(--card-shadow)' }}
                >
                  {l.badge && (
                    <span style={{ position: 'absolute', top: 20, right: 20, background: l.badgeColor, color: '#fff', borderRadius: 20, fontSize: 10, fontWeight: 600, padding: '4px 11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {l.badge}
                    </span>
                  )}
                  <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8 }}>Lunch #{l.num}</p>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 42, fontWeight: 700, color: '#C87A4F', lineHeight: 1, marginBottom: 20 }}>
                    {l.price} <span style={{ fontSize: 22 }}>₽</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {l.items.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 14, color: 'var(--ink-2)', borderBottom: '1px solid var(--divider)' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C87A4F', flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shawarma ── */}
      <section style={{ background: 'var(--bg-alt)', padding: '96px 32px', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionHeading overline="Street food" title="Shawarma for every taste" subtitle="In pita, with sauce, with crunch. From 190 ₽." center={false} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 36 }}>
                {SHAWARMAS.map((s, i) => (
                  <Fade key={s.name} delay={i * 55}>
                    <div style={{ background: 'var(--surface-2, var(--bg))', border: '1px solid var(--border)', borderRadius: 14, padding: '13px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', transition: 'background 0.2s, border-color 0.2s' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'var(--terra-wash)'; el.style.borderColor = '#C87A4F' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'var(--surface-2, var(--bg))'; el.style.borderColor = 'var(--border)' }}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{s.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{s.desc}</div>
                      </div>
                      {s.badge && (
                        <span style={{ background: s.badge === 'Spicy' || s.badge === 'Hot' ? '#C87A4F' : '#E8C87A', color: s.badge === 'Spicy' || s.badge === 'Hot' ? '#fff' : '#1A1A1A', borderRadius: 20, fontSize: 10, fontWeight: 600, padding: '3px 9px', letterSpacing: '0.04em', textTransform: 'uppercase', flexShrink: 0, marginLeft: 8 }}>
                          {s.badge}
                        </span>
                      )}
                    </div>
                  </Fade>
                ))}
              </div>
            </div>
            <Fade delay={100}>
              <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '3/4', boxShadow: 'var(--img-shadow)', backgroundColor: 'var(--border)' }}>
                <img src="https://images.unsplash.com/photo-1760888548893-bc2f7e09e972?w=600&h=800&fit=crop&auto=format" alt="Freshly wrapped shawarma" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── Ice Cream ── */}
      <section style={{ padding: '96px 32px', background: 'var(--bg)', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
            <Fade delay={80}>
              <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', boxShadow: 'var(--img-shadow)', backgroundColor: 'var(--border)' }}>
                <img src="https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=700&h=520&fit=crop&auto=format" alt="Ice cream scoops" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </Fade>
            <div>
              <SectionHeading overline="Dessert" title="Ice cream for every taste" subtitle="11 flavors. 100 ₽ per scoop." center={false} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 32 }}>
                {ICE_CREAMS.map((f, i) => (
                  <Fade key={f.name} delay={i * 40}>
                    <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 40, padding: '8px 16px', fontSize: 14, fontWeight: 500, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6, cursor: 'default', transition: 'border-color 0.2s, background 0.2s' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = '#C87A4F'; el.style.background = 'var(--terra-wash)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'var(--border)'; el.style.background = 'var(--surface)' }}
                    >
                      <span style={{ fontSize: 14 }}>{f.emoji}</span> {f.name}
                    </div>
                  </Fade>
                ))}
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 18 }}>Cones: 0.3L — 19 ₽ · 0.5L — 20 ₽</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" style={{ background: 'var(--bg-alt)', padding: '96px 32px', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading overline="Inside Dachnoye" title="It's tasty here" subtitle="Come in — or take a look first." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 52 }} className="md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {GALLERY.map((img, i) => (
              <Fade key={img.src} delay={i * 65}>
                <div onClick={() => setLightbox(img)} style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: i % 3 === 1 ? '3/4' : '4/3', cursor: 'zoom-in', backgroundColor: 'var(--border)', position: 'relative' }}>
                  <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" style={{ padding: '96px 32px', background: 'var(--bg)', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading overline="What people say" title={`"It's tasty here"`} subtitle="300+ reviews. These are a few of them." />
          <div style={{ maxWidth: 680, margin: '52px auto 0' }}>
            {REVIEWS.map((r, i) => (
              <div key={r.name} style={{ display: i === activeReview ? 'block' : 'none' }}>
                <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '40px 36px', boxShadow: 'var(--card-shadow-md)', textAlign: 'center', transition: 'background 0.3s' }}>
                  <div style={{ width: 54, height: 54, borderRadius: '50%', background: '#C87A4F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 17, margin: '0 auto 14px' }}>
                    {r.initials}
                  </div>
                  <Stars rating={r.rating} />
                  <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-2)', margin: '18px 0 14px', fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.name}</p>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 22 }}>
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setActiveReview(i)}
                  style={{ width: i === activeReview ? 24 : 8, height: 8, borderRadius: 4, background: i === activeReview ? '#C87A4F' : 'var(--border)', border: 'none', cursor: 'pointer', transition: 'width 0.3s, background 0.3s', padding: 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ background: 'var(--bg-alt)', padding: '96px 32px', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>
            <Fade>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C87A4F', marginBottom: 16 }}>Find us</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: 36, color: 'var(--ink)', lineHeight: 1.2 }}>
                How to find us
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { icon: <IconPin size={20} color="#C87A4F" />, label: 'Address', value: 'Novatorov Boulevard, 83A, St. Petersburg' },
                  { icon: <IconTrain size={20} color="#C87A4F" />, label: 'Metro', value: 'Prospekt Veteranov — 2-minute walk' },
                  { icon: <IconClock size={20} color="#C87A4F" />, label: 'Hours', value: 'Open 24 hours, 7 days a week' },
                  { icon: <IconCoin size={20} color="#C87A4F" />, label: 'Average check', value: 'from 500 ₽' },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--terra-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s' }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={YANDEX_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#C87A4F', color: '#fff', borderRadius: 12, padding: '15px 30px', fontSize: 15, fontWeight: 500, marginTop: 32, textDecoration: 'none', transition: 'background 0.2s, transform 0.15s', minHeight: 52 }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#B06A42'; el.style.transform = 'scale(1.02)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#C87A4F'; el.style.transform = 'scale(1)' }}
              >
                Show on Yandex Maps
                <IconArrow size={17} color="#fff" />
              </a>
            </Fade>

            <Fade delay={120}>
              {/* Yandex Maps embed */}
              <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--img-shadow)', aspectRatio: '4/3', backgroundColor: 'var(--border)' }}>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ol=biz&oid=1684105017"
                  width="100%"
                  height="100%"
                  style={{ border: 'none', display: 'block', width: '100%', height: '100%', minHeight: 300 }}
                  title="Dachnoye on Yandex Maps"
                  allowFullScreen
                />
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', padding: '120px 32px', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1581347860118-588a42326161?w=1600&h=600&fit=crop&auto=format')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: dark ? 'rgba(0,0,0,0.78)' : 'rgba(26,18,10,0.72)', transition: 'background 0.3s' }} />
        <Fade>
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 14 }}>We&apos;re waiting</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.15 }}>
              Dachnoye is always open
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', marginBottom: 38 }}>
              Come by today. Or at 3 AM. We&apos;ll be here either way.
            </p>
            <a
              href={YANDEX_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#C87A4F', color: '#fff', borderRadius: 12, padding: '17px 38px', fontSize: 15, fontWeight: 500, textDecoration: 'none', boxShadow: '0 8px 32px rgba(200,122,79,0.45)', transition: 'background 0.2s, transform 0.15s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#B06A42'; el.style.transform = 'scale(1.03)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#C87A4F'; el.style.transform = 'scale(1)' }}
            >
              Show on Yandex Maps
              <IconArrow size={17} color="#fff" />
            </a>
          </div>
        </Fade>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#111111', color: 'rgba(255,255,255,0.6)', padding: '52px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 21, fontWeight: 700, color: '#fff', marginBottom: 12, letterSpacing: '-0.01em' }}>DACHNOYE</div>
            <p style={{ fontSize: 14, lineHeight: 1.65 }}>Urban bistro on Prospekt Veteranov.<br />Honest food, always open.</p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>Location</p>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>Novatorov Boulevard, 83A<br />St. Petersburg, Russia<br /><span style={{ color: '#C87A4F' }}>Open 24/7</span></p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>Navigation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV_LINKS.map(l => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'rgba(255,255,255,0.55)', textAlign: 'left', padding: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C87A4F')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '36px auto 0', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: 13 }}>© Dachnoye, St. Petersburg</p>
          <p style={{ fontSize: 13, color: '#C87A4F' }}>Always open. Always tasty.</p>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, cursor: 'zoom-out', backdropFilter: 'blur(10px)' }}
        >
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <IconX size={20} color="#fff" />
          </button>
          <img
            src={lightbox.src.replace('w=800', 'w=1200').replace('w=600', 'w=900')}
            alt={lightbox.alt}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
          />
        </div>
      )}
    </div>
  )
}
