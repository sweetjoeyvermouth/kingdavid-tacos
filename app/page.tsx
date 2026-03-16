import { kv } from '@vercel/kv';
import { daysSince } from '@/lib/days';

const FALLBACK_DATE = '2024-01-01';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let lastDate: string = FALLBACK_DATE;

  try {
    const stored = await kv.get<string>('last_taco_date');
    if (stored) lastDate = stored;
  } catch {
    // KV unavailable — use fallback
  }

  const days = daysSince(lastDate);

  const formattedDate = new Date(lastDate + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden relative"
      style={{ background: 'var(--deep-black)' }}>

      {/* Background decorative stripes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #f5ff00 0px, #f5ff00 2px, transparent 2px, transparent 40px)',
        }}
      />

      {/* Top label */}
      <p className="text-sm tracking-[0.4em] uppercase mb-2"
        style={{ color: 'var(--neon-pink)', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
        Office Taco Tracker
      </p>

      {/* Headline */}
      <h1 className="text-center uppercase leading-none mb-6"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(2.5rem, 8vw, 7rem)',
          color: 'var(--neon-yellow)',
          letterSpacing: '0.02em',
          textShadow: '4px 4px 0px var(--neon-pink)',
        }}>
        Days Since<br />King David<br />Breakfast Tacos
      </h1>

      {/* The Big Number */}
      <div className="relative my-4">
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(8rem, 40vw, 22rem)',
            lineHeight: 1,
            color: 'var(--deep-black)',
            WebkitTextStroke: '4px var(--neon-cyan)',
            textShadow: '6px 6px 0px var(--neon-pink), 12px 12px 0px rgba(255,45,120,0.3)',
          }}>
          {days}
        </span>
      </div>

      {/* Last date */}
      <div className="mt-2 border-t-2 pt-4 text-center"
        style={{ borderColor: 'var(--neon-yellow)' }}>
        <p className="uppercase tracking-widest text-xs mb-1"
          style={{ color: 'var(--neon-cyan)', fontFamily: 'Inter, sans-serif' }}>
          Last Catered
        </p>
        <p className="uppercase text-2xl md:text-4xl"
          style={{ color: 'var(--neon-yellow)', fontFamily: "'Bebas Neue', sans-serif" }}>
          {formattedDate}
        </p>
      </div>

      {/* Bottom stamp */}
      <p className="absolute bottom-6 text-xs uppercase tracking-widest opacity-30"
        style={{ color: 'var(--neon-yellow)', fontFamily: 'Inter, sans-serif' }}>
        King David Hot Chicken · Austin TX
      </p>
    </main>
  );
}
