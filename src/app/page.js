"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabaseClient';

import styles from './auth.module.css';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    let error;
    if (isSignUp) {
      ({ error } = await supabase.auth.signUp({ email, password }));
      if (!error) setMessage('Sign up successful! Please check your email to confirm.');
    } else {
      ({ error } = await supabase.auth.signInWithPassword({ email, password }));
    }
    setLoading(false);
    if (error) setMessage(error.message);
    else if (!isSignUp) {
      setMessage('Logged in!');
      router.replace('/home');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      router.replace('/home');
    }
  }, [user, router]);

  if (user) {
    // While redirecting, render nothing
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>Sign in to Shared AI Workspace</div>
        <div className={styles.subtitle}>Real-time collaborative AI chat for teams</div>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              borderRadius: 4,
              border: '1px solid #333',
              background: '#111',
              color: '#fff',
              fontSize: '1rem',
              marginBottom: '1rem',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              borderRadius: 4,
              border: '1px solid #333',
              background: '#111',
              color: '#fff',
              fontSize: '1rem',
              marginBottom: '1rem',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? (isSignUp ? 'Signing up...' : 'Signing in...') : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button
              type="button"
              className={styles.button}
              style={{ background: '#222', border: '1px solid #444', color: '#aaa', fontSize: '0.95rem', padding: '0.5rem 1.2rem' }}
              onClick={() => setIsSignUp((v) => !v)}
              disabled={loading}
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
