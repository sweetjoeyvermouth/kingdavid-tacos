'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

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
    <main className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: '#0a0a0a' }}>
      <h1 className="text-4xl uppercase mb-8 text-center"
        style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f5ff00',
          textShadow: '3px 3px 0px #ff2d78' }}>
        Update Taco Date
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
        <label className="text-xs uppercase tracking-widest"
          style={{ color: '#00f5ff', fontFamily: 'Inter, sans-serif' }}>
          Date of Last Taco Catering
        </label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          className="px-4 py-3 text-xl bg-transparent border-2 text-white"
          style={{ borderColor: '#f5ff00', fontFamily: "'Bebas Neue', sans-serif",
            colorScheme: 'dark' }}
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="py-3 text-xl uppercase tracking-widest transition-opacity"
          style={{ background: '#f5ff00', color: '#0a0a0a',
            fontFamily: "'Bebas Neue', sans-serif",
            opacity: status === 'loading' ? 0.5 : 1 }}>
          {status === 'loading' ? 'Saving...' : 'Save Date'}
        </button>

        {status === 'error' && (
          <p className="text-sm text-center" style={{ color: '#ff2d78', fontFamily: 'Inter, sans-serif' }}>
            {errorMsg}
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
