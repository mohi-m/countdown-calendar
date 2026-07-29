import { useEffect, useState } from 'react'
import { ArrowRight, Eye, EyeOff, Heart, LockKeyhole, MapPin, Sparkles, X } from 'lucide-react'
import './App.css'
import { memories, reunionDate, type Memory } from './memories'

const fallbackPasswordHash = '860ae3bcabf558874f29b5e88035171be6460796321b319272fcc3f0417ffd9a'

function getLosAngelesDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${value.year}-${value.month}-${value.day}`
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function getCountdown() {
  const remaining = Math.max(0, new Date(reunionDate).getTime() - Date.now())
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  }
}

function Login({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [error, setError] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    const hash = await sha256(password)
    if (hash === (import.meta.env.VITE_PASSWORD_HASH || fallbackPasswordHash)) {
      sessionStorage.setItem('our-calendar-unlocked', 'true')
      onUnlock()
      return
    }
    setError(true)
    setPassword('')
  }

  return (
    <main className="login-page">
      <div className="login-sky" aria-hidden="true"><span>NYC</span><i /><span>LA</span></div>
      <section className="love-letter">
        <div className="letter-stamp"><Heart size={19} fill="currentColor" /></div>
        <p className="eyebrow">PRIVATE DELIVERY</p>
        <h1>A little something<br />is waiting for you.</h1>
        <p className="login-copy">One password. Twenty-five days. A thousand reasons I cannot wait to see you.</p>
        <form onSubmit={submit}>
          <label htmlFor="password">Our secret date</label>
          <div className={`password-field ${error ? 'has-error' : ''}`}>
            <LockKeyhole size={18} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => { setPassword(event.target.value); setError(false) }}
              placeholder="DDMMYYYY"
              autoFocus
              inputMode="numeric"
            />
            <button type="button" className="icon-button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="error-message" aria-live="polite">{error ? 'Not quite, love. Think back to where our story began.' : '\u00a0'}</p>
          <button className="unlock-button" type="submit">Open our calendar <ArrowRight size={18} /></button>
        </form>
        <button className="hint-button" type="button" onClick={() => setShowHint(!showHint)}>
          <Sparkles size={15} /> {showHint ? 'The day we became us · DDMMYYYY' : 'Need a little hint?'}
        </button>
      </section>
    </main>
  )
}

function MemoryModal({ memory, onClose }: { memory: Memory; onClose: () => void }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="memory-modal" role="dialog" aria-modal="true" aria-labelledby="memory-title">
        <button className="modal-close icon-button" onClick={onClose} aria-label="Close memory"><X /></button>
        <img src={memory.imageUrl} alt={memory.alt} />
        <div className="modal-copy">
          <p>{new Date(`${memory.date}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
          <h2 id="memory-title">{memory.title}</h2>
          <blockquote>{memory.note}</blockquote>
          <span>NYC <Heart size={14} fill="currentColor" /> LA</span>
        </div>
      </article>
    </div>
  )
}

function Calendar() {
  const [countdown, setCountdown] = useState(getCountdown)
  const [selected, setSelected] = useState<Memory | null>(null)
  const today = getLosAngelesDate()

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="calendar-page">
      <header className="calendar-hero">
        <nav><span className="wordmark"><Heart size={17} fill="currentColor" /> Until Us</span><span className="route"><MapPin size={15} /> NYC <i /> LA</span></nav>
        <div className="hero-copy">
          <p className="eyebrow">JULY 28 — AUGUST 21, 2026</p>
          <h1>Every day brings<br />me closer to you.</h1>
          <p>Open one memory each day. On the last one, I will be on my way.</p>
        </div>
        <div className="countdown" aria-label="Countdown to our reunion">
          {Object.entries(countdown).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
        </div>
      </header>

      <section className="memory-section">
        <div className="section-heading"><div><p className="eyebrow">OUR COUNTDOWN</p><h2>25 days, 25 little pieces of us</h2></div><p>New York time meets Los Angeles time, right here.</p></div>
        <div className="memory-grid">
          {memories.map((memory, index) => {
            const unlocked = memory.date <= today
            return (
              <button className={`memory-card ${unlocked ? 'unlocked' : 'locked'}`} key={memory.date} onClick={() => unlocked && setSelected(memory)} disabled={!unlocked}>
                <img src={memory.imageUrl} alt="" loading="lazy" />
                <span className="day-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="card-date">{new Date(`${memory.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span className="card-title">{unlocked ? memory.title : 'A memory waits here'}</span>
                {!unlocked && <span className="lock"><LockKeyhole size={17} /></span>}
              </button>
            )
          })}
        </div>
      </section>
      <footer><Heart size={16} fill="currentColor" /><p>Made across 2,451 miles, just for you.</p></footer>
      {selected && <MemoryModal memory={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}

function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('our-calendar-unlocked') === 'true')
  return unlocked ? <Calendar /> : <Login onUnlock={() => setUnlocked(true)} />
}

export default App
