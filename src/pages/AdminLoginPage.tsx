import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (!supabase) {
      setError('Supabase is not configured yet. Add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY values to the local .env file.');
      return;
    }

    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    window.history.pushState({}, '', '/admin/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-cream-100 border border-cream-200 shadow-xl overflow-hidden">
        <div className="bg-cocoa-800 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.24em] text-cream-300">Zain Cake Admin</p>
          <h1 className="mt-2 font-display text-3xl text-cream-50">Secure Login</h1>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cocoa-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-cream-300 bg-white px-3 py-2.5 text-cocoa-700 outline-none focus:border-cocoa-400"
              placeholder="admin@zaincake.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cocoa-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-cream-300 bg-white px-3 py-2.5 text-cocoa-700 outline-none focus:border-cocoa-400"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-cocoa-700 px-4 py-3 text-sm font-medium text-cream-50 hover:bg-cocoa-600 disabled:opacity-60 transition-colors"
          >
            {loading ? 'Signing in...' : 'Login to admin dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
