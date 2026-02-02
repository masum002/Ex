
import React, { useState } from 'react';
import { User, Task, ReactionType } from '../types';
import { Coins, ExternalLink, ThumbsUp, Heart, Smile, AlertCircle } from 'lucide-react';

interface EarnProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Earn: React.FC<EarnProps> = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Mock list of available tasks from other users
  const availableTasks: Task[] = [
    {
      id: 'ext1',
      userId: 'u999',
      postUrl: 'https://facebook.com/posts/98765',
      reactionType: ReactionType.LIKE,
      coinsOffered: 5,
      completedCount: 20,
      targetCount: 50,
      createdAt: new Date().toISOString()
    },
    {
      id: 'ext2',
      userId: 'u888',
      postUrl: 'https://facebook.com/posts/44556',
      reactionType: ReactionType.LOVE,
      coinsOffered: 8,
      completedCount: 5,
      targetCount: 100,
      createdAt: new Date().toISOString()
    }
  ];

  const handleEarn = (taskId: string, coins: number) => {
    setLoading(true);
    // Simulate verification delay
    setTimeout(() => {
      setUser(prev => prev ? { ...prev, coins: prev.coins + coins } : null);
      setSuccess(`আপনি ${coins} কয়েন জিতেছেন!`);
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="px-2">
        <h2 className="text-2xl font-bold text-gray-900">কয়েন আয় করুন</h2>
        <p className="text-gray-500">অন্যদের পোস্টে রিয়েকশন দিয়ে কয়েন জমা করুন।</p>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-2xl flex items-center space-x-2 animate-bounce">
          <ThumbsUp size={20} />
          <span className="font-bold">{success}</span>
        </div>
      )}

      <div className="space-y-4">
        {availableTasks.map(task => (
          <div key={task.id} className="bg-white border rounded-2xl p-5 shadow-sm overflow-hidden relative group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                  {task.reactionType === ReactionType.LOVE ? <Heart size={24} /> : <ThumbsUp size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">রিয়েকশন টাস্ক</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{task.reactionType} REACTION REQUIRED</p>
                </div>
              </div>
              <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center space-x-1">
                <Coins size={14} className="text-yellow-600" />
                <span className="text-yellow-700 font-bold">+{task.coinsOffered}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
              "এই পোস্টে {task.reactionType} রিয়েক্ট দিলে আপনি কয়েন পাবেন।"
            </p>

            <div className="flex space-x-3">
              <a 
                href={task.postUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-blue-50 text-blue-600 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 border border-blue-100 active:scale-95 transition-all"
              >
                <ExternalLink size={18} />
                <span>লিঙ্ক ওপেন করুন</span>
              </a>
              <button
                onClick={() => handleEarn(task.id, task.coinsOffered)}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-100 active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? 'যাচাই করা হচ্ছে...' : 'কয়েন সংগ্রহ করুন'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-6 rounded-3xl flex items-start space-x-4">
        <div className="bg-gray-200 p-2 rounded-full text-gray-400">
          <AlertCircle size={24} />
        </div>
        <div>
          <h5 className="font-bold text-gray-800 text-sm">সতর্কবার্তা</h5>
          <p className="text-xs text-gray-500 leading-relaxed mt-1">
            রিয়েকশন দিয়ে আবার সরিয়ে ফেললে আপনার কয়েন কেটে নেওয়া হবে এবং অ্যাকাউন্ট সাময়িকভাবে ব্লক করা হতে পারে।
          </p>
        </div>
      </div>
    </div>
  );
};

export default Earn;
