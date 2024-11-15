import React, { useState } from 'react';
import { Share2, Download } from 'lucide-react';

interface ProfileShareProps {
  name: string;
  title: string;
  company: string;
  imageUrl: string;
}

export const ProfileShare: React.FC<ProfileShareProps> = ({
  name,
  title,
  company,
  imageUrl,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name}'s Profile`,
          text: `Connect with ${name} from ${company}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          `Connect with ${name} from ${company}! ${window.location.href}`
        )}`,
        '_blank'
      );
    }
  };

  return (
    <div 
      className="bg-emerald-600 rounded-3xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative p-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
        
        {/* Profile Image */}
        <div className="relative z-10 flex justify-center mb-6">
          <img
            src={imageUrl}
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold font-mono mb-2">{name}</h2>
          <p className="text-emerald-100 font-mono mb-1">{title}</p>
          <p className="text-emerald-200 font-mono">{company}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => alert('Profile saved!')}
            className="bg-white text-emerald-600 px-6 py-3 rounded-full font-medium hover:bg-emerald-50 transition-all hover:scale-105 transform flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span className="font-mono">Save to Phone</span>
          </button>
          <button
            onClick={handleShare}
            className="bg-emerald-500 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-400 transition-all hover:scale-105 transform flex items-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span className="font-mono">Share to WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};