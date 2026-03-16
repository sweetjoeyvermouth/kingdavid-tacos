'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

const IMPACT = 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif';

function UpdateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') ?? '';
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const res = await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, date }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      const data = await res.json();
      setErrorMsg(data.error ?? 'Something went wrong');
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8"
      style={{ background: '#fff948' }}>

      <h1 style={{
        fontFamily: IMPACT,
        fontSize: 'clamp(3rem, 8vw, 7rem)',
        color: '#ff5926',
        lineHeight: 1,
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        UPDATE TACO DATE
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-full" style={{ maxWidth: '600px', gap: '1.5rem' }}>
        <label style={{
          fontFamily: IMPACT,
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: '#ff5926',
        }}>
          DATE OF LAST TACO CATERING
        </label>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          style={{
            fontFamily: IMPACT,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#ff5926',
            background: 'transparent',
            border: '4px solid #ff5926',
            padding: '0.75rem 1rem',
            width: '100%',
            colorScheme: 'light',
          }}
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            fontFamily: IMPACT,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            background: '#ff5926',
            color: '#fff948',
            border: 'none',
            padding: '1rem',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            opacity: status === 'loading' ? 0.6 : 1,
          }}>
          {status === 'loading' ? 'SAVING...' : 'SAVE DATE'}
        </button>

        {status === 'error' && (
          <p style={{
            fontFamily: IMPACT,
            fontSize: '1.5rem',
            color: '#ff5926',
            textAlign: 'center',
          }}>
            {errorMsg.toUpperCase()}
          </p>
        )}
      </form>
    </main>
  );
}

export default function UpdatePage() {
  return (
    <Suspense>
      <UpdateForm />
    </Suspense>
  );
}
