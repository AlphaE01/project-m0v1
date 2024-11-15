import React from 'react';
import { Bell, UserPlus, RefreshCw } from 'lucide-react';

interface FeedItem {
  id: number;
  type: 'contact' | 'reminder' | 'update';
  message: string;
  timestamp: string;
}

export const LiveFeed: React.FC = () => {
  const feedItems: FeedItem[] = [
    { id: 1, type: 'contact', message: 'Jane added your contact profile!', timestamp: '2m ago' },
    { id: 2, type: 'reminder', message: 'Meeting reminder at 2 PM.', timestamp: '5m ago' },
    { id: 3, type: 'update', message: 'Your profile has been updated.', timestamp: '10m ago' },
  ];

  const getIcon = (type: FeedItem['type']) => {
    switch (type) {
      case 'contact':
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-yellow-500" />;
      case 'update':
        return <RefreshCw className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 font-mono">Your Molements!</h2>
      <div className="space-y-4">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex-shrink-0">{getIcon(item.type)}</div>
            <div className="flex-grow">
              <p className="text-gray-800 font-mono">{item.message}</p>
              <p className="text-sm text-gray-500 font-mono">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};