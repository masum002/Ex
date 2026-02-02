
import React, { useState } from 'react';
import { Facebook, Zap, ShieldCheck, Heart } from 'lucide-react';
import { User } from '../types';

interface LandingPageProps {
  onLogin: (user: User) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const simulateFBLogin = () => {
    setIsLoggingIn(true);
    // Simulate FB Auth flow
    setTimeout(() => {
      const mockUser: User = {
        id: 'u123',
        name: 'John Doe',
        fbId: '1000000000',
        coins: 100,
        avatar: 'https://picsum.photos/seed/user/200'
      };
      onLogin(mockUser);
      setIsLoggingIn(false);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto p-4">
      <div className="bg-blue-600 text-white p-4 rounded-3xl shadow-xl mb-8 transform rotate-3">
        <Facebook size={64} />
      </div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Facebook <span className="text-blue-600">Reaction</span> Exchange
      </h1>
      
      <p className="text-gray-600 text-lg mb-10">
        সহজেই আপনার ফেসবুক পোস্টে রিয়েকশন বাড়ান। একে অন্যকে সাহায্য করুন এবং কয়েন জিতুন।
      </p>

      <div className="grid grid-cols-1 gap-4 mb-10 w-full">
        <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
          <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
            <Zap size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold">Fast Delivery</h3>
            <p className="text-sm text-gray-500">তাত্ক্ষণিক রিয়েকশন পান আপনার পোস্টে।</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
          <div className="bg-green-100 p-2 rounded-lg text-green-600">
            <ShieldCheck size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold">Secure System</h3>
            <p className="text-sm text-gray-500">আপনার অ্যাকাউন্ট ১০০% নিরাপদ থাকবে।</p>
          </div>
        </div>
      </div>

      <button
        onClick={simulateFBLogin}
        disabled={isLoggingIn}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center space-x-3 shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-70"
      >
        {isLoggingIn ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
        ) : (
          <>
            <Facebook size={24} />
            <span>Login with Facebook</span>
          </>
        )}
      </button>

      <p className="mt-6 text-xs text-gray-400">
        By logging in, you agree to our Terms and Community Guidelines.
      </p>
    </div>
  );
};

export default LandingPage;
