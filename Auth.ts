'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [address, setAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchAddress() {
      try {
        const res = await fetch('/_chopin/address');
        const data = await res.json();
        setAddress(data.address);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
    fetchAddress();
  }, []);

  const handleLogin = () => {
    router.push('/_chopin/login');
  };

  const handleLogout = () => {
    router.push('/_chopin/logout');
    setAddress(null);
  };

  return (
    <div className="flex items-center space-x-4">
      {address ? (
        <>
          <span className="text-sm">Connected: {address.slice(0, 6)}...{address.slice(-4)}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      )}
    </div>
  );
}