
import React from 'react';
import { User, Task, ReactionType } from '../types';
import { TrendingUp, Clock, CheckCircle, ExternalLink } from 'lucide-react';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // Mock data for user tasks
  const myTasks: Task[] = [
    {
      id: 't1',
      userId: user.id,
      postUrl: 'https://facebook.com/posts/12345',
      reactionType: ReactionType.LOVE,
      coinsOffered: 10,
      completedCount: 45,
      targetCount: 100,
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <div className="space-y-6">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl border-2 border-white/50" />
          <div>
            <h2 className="text-2xl font-bold">স্বাগতম, {user.name.split(' ')[0]}!</h2>
            <p className="text-blue-100 text-sm opacity-90">আপনার ড্যাশবোর্ড আপডেট করা হয়েছে।</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3">
            <p className="text-xs uppercase font-semibold text-blue-100 mb-1">Total Coins</p>
            <p className="text-2xl font-bold">{user.coins}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3">
            <p className="text-xs uppercase font-semibold text-blue-100 mb-1">Active Tasks</p>
            <p className="text-2xl font-bold">{myTasks.length}</p>
          </div>
        </div>
      </header>

      <section>
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-bold text-lg text-gray-800 flex items-center space-x-2">
            <TrendingUp size={20} className="text-blue-600" />
            <span>আপনার সক্রিয় টাস্কসমূহ</span>
          </h3>
        </div>

        {myTasks.length > 0 ? (
          <div className="space-y-4">
            {myTasks.map(task => (
              <div key={task.id} className="bg-white border rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-1 rounded-lg uppercase">
                      {task.reactionType}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center space-x-1">
                      <Clock size={12} />
                      <span>২ ঘণ্টা আগে</span>
                    </span>
                  </div>
                  <a href={task.postUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    <ExternalLink size={18} />
                  </a>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">অগ্রগতি</span>
                    <span className="text-blue-600 font-bold">{Math.round((task.completedCount / task.targetCount) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${(task.completedCount / task.targetCount) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>{task.completedCount} reactions gained</span>
                    <span>Target: {task.targetCount}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm bg-gray-50 p-2 rounded-xl">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-gray-600">সঠিকভাবে কাজ করছে</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed rounded-3xl p-10 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">আপনার কোনো সক্রিয় টাস্ক নেই।</p>
            <p className="text-sm text-gray-400 mt-1">কয়েন খরচ করে আজই নতুন টাস্ক যোগ করুন।</p>
          </div>
        )}
      </section>

      <section className="bg-yellow-50 border border-yellow-100 rounded-3xl p-5">
        <h4 className="font-bold text-yellow-800 flex items-center space-x-2 mb-2">
          <TrendingUp size={18} />
          <span>বোনাস কয়েন পান!</span>
        </h4>
        <p className="text-sm text-yellow-700 leading-relaxed">
          প্রতিদিন অন্তত ৫টি টাস্ক সম্পন্ন করলে আপনি অতিরিক্ত ১০ কয়েন বোনাস পাবেন। আজই শুরু করুন!
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
