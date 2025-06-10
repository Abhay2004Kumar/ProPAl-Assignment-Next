'use client';

import { useState } from 'react';
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '', phone: '' });
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    if (res.ok){ 
      toast.success("You have registered successfully")
      router.push('/login');}
    else toast.error("Registration failed!")
  };

  return (
    <div className="p-4 max-w-md mx-auto min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <div className="space-y-3">
        {['username', 'email', 'password', 'phone'].map(key => (
          <input
            key={key}
            value={(form as any)[key]}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
            placeholder={key[0].toUpperCase() + key.slice(1)}
            className="border p-3 w-full rounded-md"
            type={key === 'password' ? 'password' : 'text'}
          />
        ))}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Sign Up
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-600 dark:text-gray-300">Already have an account? </span>
          <a
            onClick={() => router.push('/login')}
            className="text-blue-600 cursor-pointer hover:underline font-semibold"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
