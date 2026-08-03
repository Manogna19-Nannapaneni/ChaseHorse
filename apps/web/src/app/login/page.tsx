'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@chasehorse/shared';
import { login, api, useAuthStore } from '@chasehorse/auth-client';
import { ROLE_ROUTES } from '@chasehorse/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_NAME } from '@chasehorse/shared';
import type { UserRole } from '@chasehorse/shared';

const isLocalDev =
  typeof window !== 'undefined'
    ? window.location.hostname === 'localhost'
    : process.env.NODE_ENV === 'development';

const LOGIN_ART =
  process.env.NEXT_PUBLIC_LOGIN_ART_URL ??
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'email' | 'otp'>('email');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError('');
    try {
      const result = await login(data.email, data.password);
      api.setToken(result.accessToken);
      setAuth(result.user, result.accessToken, result.refreshToken);
      const route = ROLE_ROUTES[result.user.role as UserRole] ?? '/portal';
      router.push(route);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-[#0b0d12]">
      {/* Form column */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[48%] lg:bg-[#f7f8fa]">
        <div className="w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)] lg:shadow-xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#171a20]">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                <path d="M4 18h16v2H4v-2zm2-4h12l1-8H5l1 8zm3-10h6l1 4H8l1-4z" />
              </svg>
            </div>
            <h1 className="mt-4 text-xl font-semibold tracking-tight text-[#171a20]">{APP_NAME}</h1>
            <p className="mt-1 text-sm text-[#5c5e62]">Sign in to your account</p>
          </div>

          <div className="mb-5 flex gap-1 rounded-lg bg-[#f0f0f2] p-1">
            <button
              type="button"
              onClick={() => setMode('email')}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                mode === 'email' ? 'bg-white text-[#171a20] shadow-sm' : 'text-[#5c5e62]'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setMode('otp')}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                mode === 'otp' ? 'bg-white text-[#171a20] shadow-sm' : 'text-[#5c5e62]'
              }`}
            >
              Mobile OTP
            </button>
          </div>

          {mode === 'email' ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#393c41]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="h-11 border-[#e5e5e5] bg-[#fafafa]"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#393c41]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="h-11 border-[#e5e5e5] bg-[#fafafa]"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] py-3 text-[15px] font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Log in'}
              </button>
            </form>
          ) : (
            <OtpLogin
              onSuccess={(user, token) => {
                api.setToken(token);
                setAuth({ ...user, role: user.role as UserRole }, token);
                router.push(ROLE_ROUTES[user.role as UserRole] ?? '/portal');
              }}
            />
          )}

          <div className="mt-6">
            <p className="mb-3 text-center text-xs text-[#8e8e8e]">Or continue with</p>
            <div className="grid grid-cols-3 gap-2">
              {['google', 'microsoft', 'linkedin'].map((provider) => (
                <a
                  key={provider}
                  href={`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8787'}/api/auth/oauth/${provider}`}
                  className="rounded-lg border border-[#e5e5e5] py-2 text-center text-xs font-medium capitalize text-[#393c41] transition hover:bg-[#fafafa]"
                >
                  {provider}
                </a>
              ))}
            </div>
          </div>

          {isLocalDev && (
            <p className="mt-4 text-center text-xs text-[#8e8e8e]">
              Dev: superadmin@chasehorse.com / Password123!
            </p>
          )}
        </div>

        <footer className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#8e8e8e] lg:text-[#5c5e62]">
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <span>·</span>
          <Link href="/portal/support" className="hover:underline">
            Support
          </Link>
          <span>·</span>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
        </footer>
      </div>

      {/* Atmospheric right panel */}
      <div className="relative hidden flex-1 overflow-hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGIN_ART} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220]/85 via-[#1a1040]/70 to-[#0b0d12]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(59,130,246,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(124,58,237,0.3),transparent_50%)]" />
        <div className="relative z-10 flex h-full flex-col justify-end p-12 text-white">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/70">
            ChaseHorse Platform
          </p>
          <h2 className="mt-3 max-w-md text-3xl font-medium leading-tight">
            Logistics intelligence for every mile of your supply chain.
          </h2>
        </div>
      </div>
    </div>
  );
}

function OtpLogin({
  onSuccess,
}: {
  onSuccess: (user: { sub: string; email: string; role: string }, token: string) => void;
}) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async () => {
    setLoading(true);
    try {
      const { requestOtp } = await import('@chasehorse/auth-client');
      await requestOtp(phone);
      setStep('otp');
    } catch {
      alert('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const { verifyOtp } = await import('@chasehorse/auth-client');
      const result = await verifyOtp(phone, otp);
      onSuccess(result.user, result.accessToken);
    } catch {
      alert('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {step === 'phone' ? (
        <>
          <div className="space-y-2">
            <Label className="text-[#393c41]">Phone Number</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+919876543210"
              className="h-11 border-[#e5e5e5] bg-[#fafafa]"
            />
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] py-3 text-[15px] font-semibold text-white disabled:opacity-60"
            onClick={handleRequestOtp}
            disabled={loading || phone.length < 10}
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label className="text-[#393c41]">Enter OTP</Label>
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit code"
              maxLength={6}
              className="h-11 border-[#e5e5e5] bg-[#fafafa]"
            />
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] py-3 text-[15px] font-semibold text-white disabled:opacity-60"
            onClick={handleVerifyOtp}
            disabled={loading || otp.length !== 6}
          >
            Verify & Sign in
          </button>
        </>
      )}
    </div>
  );
}
