'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      toast.success('Logged in successfully!');
      router.push('/dashboard');
    } else {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-xl border border-border rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Login to PropalAI</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials below</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full mt-2" onClick={handleLogin}>
              Login
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-4">
            Don&apos;t have an account?{' '}
            <span
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
              onClick={() => router.push('/signup')}
            >
              Sign Up
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
