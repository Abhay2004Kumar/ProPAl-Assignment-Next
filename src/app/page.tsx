import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    try {
      verifyToken(token);
      redirect('/dashboard');
    } catch {
      // Token invalid; show landing page
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl border border-border rounded-2xl backdrop-blur-md bg-white/90 dark:bg-gray-900/80">
        <CardContent className="p-8 space-y-6">
          <div className="flex flex-col items-center">
            <Sparkles className="text-blue-600 dark:text-blue-400 mb-2 h-8 w-8" />
            <h1 className="text-4xl font-bold text-center text-foreground">Welcome to PropalAI</h1>
            <p className="text-muted-foreground text-center mt-2">
              Your intelligent authentication and settings dashboard.
            </p>
          </div>

          <Link href="/signup" className="block">
            <Button size="lg" className="w-full">
              Get Started
            </Button>
          </Link>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
