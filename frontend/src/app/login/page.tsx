'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { useAuthStore } from '@/store/authStore';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', values);
      const { user, token } = response.data as any;
      
      // The backend response format we saw earlier:
      // user: { id, firstName, lastName, role } (role is string in backend controller)
      // But our store expects role object. I'll normalize it here.
      
      const normalizedUser = {
        ...user,
        role: {
          name: user.role, // role string from backend
          code: user.role, // using same for code for now
        }
      };

      login(normalizedUser, token);
      
      // Role based redirect
      if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        router.push('/admin');
      } else if (user.role === 'FIELD_EXECUTIVE') {
        router.push('/field');
      } else if (user.role === 'CUSTOMER') {
        router.push('/customer');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary tracking-tight">NAMMA HEALTH</h1>
          <p className="text-slate-400 mt-2">Premium Healthcare Membership Portal</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-8">Please enter your credentials to login.</p>

          {error && (
            <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm mb-6 border border-rose-100 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                {...register('email')}
                type="email"
                placeholder="name@company.com"
                className={`input-field ${errors.email ? 'border-rose-500 focus:ring-rose-200' : ''}`}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`input-field pr-10 ${errors.password ? 'border-rose-500 focus:ring-rose-200' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" />
                <label className="ml-2 block text-sm text-slate-600">Remember me</label>
              </div>
              <a href="#" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary h-12 flex items-center justify-center gap-2 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Logging in...
                </>
              ) : (
                'Login to Account'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 mt-8 text-sm">
          Don't have an account?{' '}
          <a href="#" className="text-primary font-semibold hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
