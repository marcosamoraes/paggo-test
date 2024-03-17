'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Button from './UI/Button';

const GuestHome: React.FC<any> = () => {
  const { authIsLoading, login, register, errors } = useAuth();

  const [ isLogin, setIsLogin ] = useState(true);
  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(name, email, password);
  }

  return isLogin ? (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleLogin}
    >
      <input
        type="email"
        name="email"
        className="p-2 border border-gray-300 rounded-lg text-gray-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        name="password"
        className="p-2 border border-gray-300 rounded-lg text-gray-500"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" disabled={authIsLoading}>
        {authIsLoading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="text-white hover:text-gray-300 font-bold"
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </p>
    </form>
  ) : (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleRegister}
    >
      {errors && errors.map((error: string, index: number) => (
        <p key={index} className="text-red-500 text-center">{error}</p>
      ))}

      <input
        type="text"
        name="name"
        className="p-2 border border-gray-300 rounded-lg text-gray-500"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        name="email"
        className="p-2 border border-gray-300 rounded-lg text-gray-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        name="password"
        className="p-2 border border-gray-300 rounded-lg text-gray-500"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" disabled={authIsLoading}>
        {authIsLoading ? "Registering..." : "Register"}
      </Button>

      <p className="text-center">
        Already have an account?{" "}
        <button
          type="button"
          className="text-white hover:text-gray-300 font-bold"
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
      </p>
    </form>
  )
}

export default GuestHome
