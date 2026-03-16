import { kv } from '@vercel/kv';
import { daysSince } from '@/lib/days';
import Image from 'next/image';

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
    <main className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{ background: '#fff948' }}>

      {/* DAYS SINCE + taco image on same line */}
      <div className="flex items-center gap-6">
        <span style={{
          fontSize: 'clamp(4rem, 12vw, 10rem)',
          color: '#ff5926',
          lineHeight: 1,
          fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
        }}>
          DAYS SINCE
        </span>
        <Image
          src="/taco.png"
          alt="breakfast taco"
          width={300}
          height={300}
          style={{
            height: 'clamp(4rem, 12vw, 10rem)',
            width: 'auto',
          }}
        />
      </div>

      {/* Big number */}
      <div style={{
        fontSize: 'clamp(12rem, 50vw, 30rem)',
        color: '#ff5926',
        lineHeight: 0.9,
        fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
      }}>
        {days}
      </div>

      {/* King David label */}
      <div style={{
        fontSize: 'clamp(2rem, 6vw, 5rem)',
        color: '#ff5926',
        lineHeight: 1,
        fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
        textAlign: 'center',
      }}>
        KING DAVID BREAKFAST TACOS
      </div>

      {/* Last catered date */}
      <div className="mt-4" style={{
        fontSize: 'clamp(1rem, 2.5vw, 2rem)',
        color: '#ff5926',
        fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
        textAlign: 'center',
      }}>
        LAST CATERED: {formattedDate.toUpperCase()}
      </div>

    </main>
  );
}
