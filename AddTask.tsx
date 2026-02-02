
import React, { useState } from 'react';
import { User, ReactionType } from '../types';
import { PlusSquare, Link as LinkIcon, Users, Coins, Info } from 'lucide-react';

interface AddTaskProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AddTask: React.FC<AddTaskProps> = ({ user, setUser }) => {
  const [postUrl, setPostUrl] = useState('');
  const [reactionType, setReactionType] = useState<ReactionType>(ReactionType.LIKE);
  const [count, setCount] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const costPerReaction = 10;
  const totalCost = count * costPerReaction;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!postUrl.includes('facebook.com')) {
      setError('দয়া করে একটি সঠিক ফেসবুক লিঙ্ক প্রদান করুন।');
      return;
    }

    if (user.coins < totalCost) {
      setError('আপনার পর্যাপ্ত কয়েন নেই। দয়া করে আগে কয়েন আয় করুন।');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setUser(prev => prev ? { ...prev, coins: prev.coins - totalCost } : null);
      setIsSubmitting(false);
      alert('সফলভাবে টাস্ক যোগ করা হয়েছে!');
      setPostUrl('');
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="px-2">
        <h2 className="text-2xl font-bold text-gray-900">নতুন টাস্ক যোগ করুন</h2>
        <p className="text-gray-500">আপনার ফেসবুক পোস্টে রিয়েকশন পেতে তথ্যগুলো পূরণ করুন।</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 flex items-center space-x-2">
            <Info size={18} />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
            <LinkIcon size={16} className="text-blue-500" />
            <span>পোস্টের লিঙ্ক (URL)</span>
          </label>
          <input
            type="url"
            required
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            placeholder="https://facebook.com/..."
            className="w-full bg-gray-50 border-gray-200 border rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
            <Users size={16} className="text-blue-500" />
            <span>রিয়েকশন টাইপ</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(ReactionType).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setReactionType(type as ReactionType)}
                className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                  reactionType === type 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PlusSquare size={16} className="text-blue-500" />
              <span>কতটি রিয়েকশন প্রয়োজন?</span>
            </div>
            <span className="text-blue-600 font-bold">{count}</span>
          </label>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Min: 10</span>
            <span>Max: 500</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Reaction Rate:</span>
            <span className="font-bold text-gray-800">{costPerReaction} coins / reaction</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-bold text-gray-800">Total Cost:</span>
            <div className="flex items-center space-x-1 text-blue-600">
              <Coins size={20} className="text-yellow-500" />
              <span className="font-black">{totalCost}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
          ) : (
            <>
              <PlusSquare size={20} />
              <span>টাস্ক কনফার্ম করুন</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
