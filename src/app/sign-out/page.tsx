'use client';

import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut();
      router.push('/');
      router.refresh();
    };

    signOut();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Signing out...</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Please wait while we log you out.</p>
      </div>
    </div>
  );
}