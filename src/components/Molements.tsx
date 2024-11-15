import React from 'react';
import { Bell, UserPlus, RefreshCw } from 'lucide-react';

interface Molement {
  id: number;
  type: 'contact' | 'reminder' | 'update';
  message: string;
  timestamp: string;
}

export const Molements: React.FC = () => {
  const [molements] = React.useState<Molement[]>([
    { id: 1, type: 'contact', message: 'Jane added your contact profile!', timestamp: '2m ago' },
    { id: 2, type: 'reminder', message: 'Meeting reminder at 2 PM.', timestamp: '5m ago' },
    { id: 3, type: 'update', message: 'Your profile has been updated.', timestamp: '10m ago' },
  ]);

  const getIcon = (type: Molement['type']) => {
    switch (type) {
      case 'contact':
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-yellow-500" />;
      case 'update':
        return <RefreshCw className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-cream-50 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Your Molements!</h2>
      <div className="space-y-4">
        {molements.map((molement) => (
          <div
            key={molement.id}
            className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex-shrink-0">{getIcon(molement.type)}</div>
            <div className="flex-grow">
              <p className="text-gray-800">{molement.message}</p>
              <p className="text-sm text-gray-500">{molement.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};