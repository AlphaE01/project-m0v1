import React, { useState, useEffect } from 'react';
import { Share2, Download, Monitor, ChevronDown } from 'lucide-react';

interface TicketViewProps {
  name: string;
  company: string;
  eventDate: string;
  eventType: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const TicketView: React.FC<TicketViewProps> = ({
  name,
  company,
  eventDate,
  eventType,
  isExpanded,
  onToggleExpand,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = document.querySelector('.ticket-card') as HTMLElement;
      if (card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const rotateY = ((e.clientX - centerX) / rect.width) * 10;
        const rotateX = ((e.clientY - centerY) / rect.height) * -10;
        
        setRotation({ x: rotateX, y: rotateY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name}'s Next.js Conf Ticket`,
          text: `Join me at Next.js Conf on ${eventDate}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          `Join me at Next.js Conf on ${eventDate}! ${window.location.href}`
        )}`,
        '_blank'
      );
    }
  };

  return (
    <div className={`transition-all duration-500 transform ${
      isExpanded ? 'scale-105' : 'scale-100'
    }`}>
      <div 
        className="ticket-card bg-[#0070F3] rounded-3xl shadow-xl overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="relative p-8 space-y-6">
          <div className="ticket-shine" />
          
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-blue-200 text-sm font-mono">NEXT.JS CONF</p>
              <h2 className="text-white text-3xl font-bold font-mono">{name}</h2>
              <p className="text-blue-200 font-mono">{company}</p>
            </div>
            <Monitor className="text-white w-8 h-8 floating" />
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex justify-between items-center border-t border-blue-500/30 pt-4">
              <span className="text-blue-200 font-mono">Date</span>
              <span className="text-white font-mono">{eventDate}</span>
            </div>
            <div className="flex justify-between items-center border-t border-blue-500/30 pt-4">
              <span className="text-blue-200 font-mono">Type</span>
              <span className="text-white font-mono">{eventType}</span>
            </div>
          </div>

          <div className={`transition-all duration-500 ${
            isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
          } overflow-hidden`}>
            <div className="mt-8 bg-blue-600/30 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4 font-mono">Event Details</h3>
              <div className="space-y-4 text-blue-100">
                <p className="text-sm">
                  Join us for an immersive experience at Next.js Conf, where we'll explore
                  the future of web development.
                </p>
                <ul className="space-y-2 text-sm font-mono">
                  <li>• Live keynote presentations</li>
                  <li>• Interactive workshops</li>
                  <li>• Networking opportunities</li>
                  <li>• Q&A sessions</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={onToggleExpand}
            className="w-full group flex items-center justify-center space-x-2 text-blue-200 hover:text-white transition-colors"
          >
            <span className="font-mono text-sm">
              {isExpanded ? 'Show Less' : 'View Details'}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-between space-x-4">
        <button
          onClick={handleShare}
          className="flex-1 bg-[#0070F3] text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-all hover:scale-105 transform"
        >
          <span className="font-mono flex items-center justify-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </span>
        </button>
        <button
          onClick={() => alert('Ticket saved!')}
          className="flex-1 border-2 border-[#0070F3] text-[#0070F3] px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-all hover:scale-105 transform"
        >
          <span className="font-mono flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Save</span>
          </span>
        </button>
      </div>
    </div>
  );
};