import { useAuth } from '@/contexts/AuthContext';
import React from 'react'
import AuthHome from './AuthHome';
import GuestHome from './GuestHome';

const Home: React.FC<any> = () => {
  const { user } = useAuth();

  return user ? <AuthHome /> : <GuestHome />
}

export default Home
