'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/profile');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Redirecting to profile...</span>
      </div>
    </div>
  );
}
