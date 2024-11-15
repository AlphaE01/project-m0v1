import React from 'react';
import { Share2, Download, Bell } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  title: string;
  imageUrl: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, imageUrl }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name}'s Profile`,
          text: `Check out ${name}'s profile!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      window.open(`https://wa.me/?text=${encodeURIComponent(`Check out ${name}'s profile at ${window.location.href}`)}`, '_blank');
    }
  };

  const handleSaveToPhone = () => {
    // In a real implementation, this would generate a vCard or similar format
    alert('Profile saved to phone!');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
      <div className="relative h-48 bg-emerald-600 p-8 flex flex-col justify-between">
        <div className="absolute top-4 right-4 space-x-2">
          <button
            onClick={handleSaveToPhone}
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            <Download className="inline-block w-4 h-4 mr-1" />
            Save to Phone
          </button>
          <button
            onClick={handleShare}
            className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
          >
            <Share2 className="inline-block w-4 h-4 mr-1" />
            Share to WhatsApp
          </button>
        </div>
        <h2 className="text-white text-2xl font-bold rotate-180" style={{ writingMode: 'vertical-rl' }}>
          {name}
        </h2>
      </div>
      
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-lg"
        />
      </div>

      <div className="px-8 pt-20 pb-8">
        <h3 className="text-center text-2xl font-bold text-gray-800">{name}</h3>
        <p className="text-center text-gray-600 mt-2">{title}</p>
        
        <div className="mt-8">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="ml-2 text-sm text-gray-600">Next Event</span>
            </div>
            <span className="text-sm font-medium text-gray-800">Oct 24, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}