'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Skeleton } from '../../../components/ui/skeleton';

type User = {
  username: string;
  email: string;
  phone: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-xl shadow-lg border border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ) : user ? (
            <>
              <p>
                <span className="font-semibold text-muted-foreground">Username:</span>{' '}
                {user.username}
              </p>
              <p>
                <span className="font-semibold text-muted-foreground">Email:</span>{' '}
                {user.email}
              </p>
              <p>
                <span className="font-semibold text-muted-foreground">Phone:</span>{' '}
                {user.phone}
              </p>
            </>
          ) : (
            <p className="text-center text-sm text-red-500">Failed to load profile.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
