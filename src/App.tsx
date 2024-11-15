import React, { useState } from 'react';
import { Toggle } from './components/Toggle';
import { CursorEffect } from './components/CursorEffect';
import { TicketView } from './components/TicketView';
import { ProfileShare } from './components/ProfileShare';
import { LiveFeed } from './components/LiveFeed';

function App() {
  const [isProfileView, setIsProfileView] = useState(false);
  const [isTicketExpanded, setIsTicketExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <CursorEffect />
      
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Event Ticket</h1>
          <Toggle
            isActive={isProfileView}
            onChange={() => setIsProfileView(!isProfileView)}
            label="Profile"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex justify-center">
            <div className={`grid transition-all duration-500 ${
              isProfileView ? 'grid-cols-1 lg:grid-cols-2 gap-8 w-full' : 'grid-cols-1 max-w-md'
            }`}>
              {/* Ticket View */}
              <div className={`transition-all duration-500 ${
                isProfileView ? 'lg:order-2' : ''
              }`}>
                <TicketView
                  name="Haziq Faris"
                  company="REKA"
                  eventDate="October 24th"
                  eventType="Virtual"
                  isExpanded={isTicketExpanded}
                  onToggleExpand={() => setIsTicketExpanded(!isTicketExpanded)}
                />
              </div>

              {/* Profile Share & Live Feed */}
              {isProfileView && (
                <div className="lg:order-1 transform transition-all duration-500 slide-up">
                  <div className="space-y-8">
                    <ProfileShare
                      name="Haziq Faris"
                      title="CEO"
                      company="REKA"
                      imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
                    />
                    <LiveFeed />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">GET A DEMO</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">PRIVACY POLICY</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900">EVENT TERMS & COND.</a>
            </div>
            <p className="text-sm text-gray-500">© 2024 - ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;