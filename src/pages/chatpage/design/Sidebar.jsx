import React, { useState, useEffect } from 'react';
import { assets } from '../../../assets/assets';
import { Link } from "react-router-dom";
import { Sun, Moon, HelpCircle, MoreVertical, Trash2, Edit3 } from 'lucide-react'; 

const Sidebar = ({ expand, setExpand, darkMode, setDarkMode, toggleContact }) => {
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });
  const [mounted, setMounted] = useState(false);

  // Mock chat history data for UI demo
  const mockChatHistory = [
    { id: 1, title: "How to learn React hooks?", date: "Today" },
    { id: 2, title: "Best practices for responsive design", date: "Today" },
    { id: 3, title: "JavaScript async/await explained", date: "Yesterday" },
    { id: 4, title: "CSS Grid vs Flexbox comparison", date: "Yesterday" },
    { id: 5, title: "Node.js authentication setup", date: "2 days ago" },
    { id: 6, title: "Database optimization techniques", date: "3 days ago" },
    { id: 7, title: "React performance optimization", date: "1 week ago" },
    { id: 8, title: "API design best practices", date: "1 week ago" },
  ];

  // Add mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (e) => {
    e.stopPropagation();
    setDarkMode(!darkMode);
  };

  const handleToggleContact = (e) => {
    e.stopPropagation();
    toggleContact();
  };

  const handleMenuToggle = (id) => {
    setOpenMenu(openMenu.id === id && openMenu.open ? { id: 0, open: false } : { id, open: true });
  };


  // Chat history item component
  const ChatHistoryItem = ({ chat }) => (
    <div className={`group relative p-2 rounded-lg cursor-pointer transition-all duration-200
      ${darkMode ? 'hover:bg-white/10 text-white/70' : 'hover:bg-gray-100 text-gray-600'}
      ${openMenu.id === chat.id && openMenu.open ? (darkMode ? 'bg-white/10' : 'bg-gray-100') : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className={`text-sm truncate ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
            {chat.title}
          </p>
          <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'} mt-1`}>
            {chat.date}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMenuToggle(chat.id);
            }}
            className={`opacity-0 group-hover:opacity-100 p-1 rounded-full transition-all duration-200
              ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-200'}`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {openMenu.id === chat.id && openMenu.open && (
            <div className={`absolute right-0 top-8 w-32 py-1 rounded-lg shadow-lg border z-50
              ${darkMode ? 'bg-[#2a2a3a] border-gray-600' : 'bg-white border-gray-200'}`}>
              <button className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors
                ${darkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-gray-100 text-gray-700'}`}>
                <Edit3 className="w-3 h-3" />
                Rename
              </button>
              <button className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors text-red-500
                ${darkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}>
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Common styles for action buttons
  const collapsedButtonStyles = "group relative hover:bg-gray-500/20 transition-all duration-300 h-10 w-10 mx-auto rounded-lg hover:rotate-3 flex items-center justify-center";
  
  const expandedButtonStyles = (isPrimary = false) => `
    flex items-center justify-center gap-2 p-2.5 rounded-lg transition-all duration-300
    ${isPrimary ? 
      "bg-[#3a6cff] hover:opacity-90 hover:shadow-md hover:shadow-primary/30 text-white transform hover:-translate-y-0.5 rounded-2xl" : 
      `${darkMode ? 'hover:bg-white/10 border-gray-700' : 'hover:bg-blue-50/80 border-gray-200'} 
       border transform hover:-translate-y-0.5 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}
  `;

  return (
    <div 
      className={`flex flex-col justify-between pt-7 transition-all duration-300 ease-in-out
        z-50 max-md:absolute max-md:h-screen shadow-lg h-screen
        ${expand ? 'p-4 w-64' : 'w-16 md:w-20 max-md:overflow-hidden'}
        ${darkMode ? 'bg-[#0e0d15]' : 'bg-gray-100'}
        ${expand && darkMode ? 'bg-[#1a1925]' : ''}
        ${expand && !darkMode ? 'bg-white' : ''}
        ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
    >
      {/* Top Section */}
      <div className="flex flex-col h-full">
        {/* Logo and Toggle Section */}
        <div className={`flex items-center ${expand ? 'justify-between' : 'flex-col gap-6'}`}>
          <Link to="/chatpage" className="transition-all duration-300">
            <img
              className={`transition-all duration-300 ease-in-out ${
                expand ? 'w-24 h-auto scale-100' : 'w-10 h-auto hover:scale-110'
              }`}
              src={expand ? assets.logo_text : assets.logo_icon1}
              alt="logo"
            />
          </Link>

          <div
            onClick={() => setExpand(!expand)}
            aria-label={expand ? 'Close sidebar' : 'Open sidebar'}
            className={`${collapsedButtonStyles} ${expand ? 'ml-2' : 'mt-6'}`}
          >
            <img src={assets.menu_icon} className="md:hidden transform transition-transform duration-300" alt="menu" />
            <img
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              className="hidden md:block w-6 transform transition-transform duration-300"
              alt="toggle sidebar"
            />
          </div>
        </div>

        <Link to="/chatpage/new">
          {/* New Chat Button */}
          <button className={`mt-6 ${expand ? expandedButtonStyles(true) : collapsedButtonStyles}`}>
            <img 
              className={`${expand ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-300`} 
              src={expand ? assets.chat_icon : assets.chat_icon_dull} 
              alt="New chat" 
            />
            {expand && <p className="text-white font-medium">New chat</p>}
          </button>
        </Link>

        {/* Chat History Section */}
        <div className={`mt-6 ${darkMode ? 'text-white/40' : 'text-gray-500'} text-sm transition-all duration-300 ease-in-out
          ${expand ? "opacity-100 block" : "opacity-0 hidden"} flex-1 overflow-hidden space-y-1`}>
          <p className="my-1 px-2 font-medium">Recents</p>
          
          {/* Scrollable Container with mock chat history */}
          <div className="relative">
            {/* Fade effect at the bottom of the list */}
            {darkMode ? (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t 
                from-[#1a1925] to-transparent z-10 pointer-events-none"></div>
            ) : (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t 
                from-white to-transparent z-10 pointer-events-none"></div>
            )}
              
            <div className="h-[calc(100vh-400px)] max-h-[300px] overflow-y-auto pr-1 chat-history-container
              scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
              {mockChatHistory.map((chat) => (
                <ChatHistoryItem key={chat.id} chat={chat} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto space-y-3">
        {/* Theme Toggle */}
        <div 
          onClick={toggleTheme}
          className={expand ? expandedButtonStyles() : collapsedButtonStyles}
        >
          {darkMode ? 
            <Sun className={`${expand ? 'w-5 h-5' : 'w-5 h-5'} ${expand ? (darkMode ? 'text-white' : 'text-gray-700') : 'text-gray-400'}`} /> : 
            <Moon className={`${expand ? 'w-5 h-5' : 'w-5 h-5'} ${expand ? (darkMode ? 'text-white' : 'text-gray-700') : 'text-gray-600'}`} />
          }
          {expand && (
            <p className="font-medium text-sm">
              {darkMode ? 'Light mode' : 'Dark mode'}
            </p>
          )}
        </div>
        
        {/* Support Button */}
        <div
          className={expand ? expandedButtonStyles() : collapsedButtonStyles}
          onClick={handleToggleContact}
        >
          <HelpCircle
            className={`${expand ? 'w-5 h-5' : 'w-5 h-5'} ${expand ? (darkMode ? 'text-white/80' : 'text-gray-700') : 'text-gray-500'}`}
          />
          {expand && <span className="font-medium text-sm">Support</span>}
        </div>
        
        {/* User Profile Button */}
        <div className={expand ? expandedButtonStyles() : collapsedButtonStyles}>
          <img src={assets.profile_icon} alt="Profile" className="w-6 h-6" />
          {expand && <span className="font-medium text-sm">Profile</span>}
        </div>
      </div>

      {/* Click outside handler */}
      {openMenu.open && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpenMenu({ id: 0, open: false })}
        />
      )}

      {/* CSS for scrollbar styling */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 20px;
        }
        
        .scrollbar-thin:hover::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
        }
        
        .scrollbar-thin:hover {
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;