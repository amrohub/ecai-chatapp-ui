import { assets } from '../../assets/assets';
import PromptBox from "./design/PromptBox";
import Sidebar from "./design/Sidebar";
import { useState, useEffect } from "react";
import Contact from './design/Contact';

export default function Chat() {
  const [expand, setExpand] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Apply theme to body and handle mobile sidebar
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Handle mobile sidebar body scroll
  useEffect(() => {
    if (expand && window.innerWidth < 768) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [expand]);
  
  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {expand && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setExpand(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile unless expanded */}
      <div className={`
        ${expand ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:relative inset-y-0 left-0 z-50 md:z-auto
        w-64 md:w-auto
      `}>
        <Sidebar 
          expand={expand} 
          setExpand={setExpand} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          toggleContact={() => setIsContactOpen(true)}
        />
      </div>
      
      {/* Main Chat Interface - Full width on mobile */}
      <div className={`flex-1 w-full md:w-auto flex flex-col ${darkMode ? 'bg-[#0e0d15] text-white' : 'bg-gray-50 text-gray-800'} relative`}>
        {/* Mobile Top Bar - Always visible on mobile */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm z-30">
          <button
            onClick={() => setExpand(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <img
              className="w-5 h-5"
              src={assets.menu_icon}
              alt="menu"
            />
          </button>
          <div className="flex items-center gap-2">
            <img className="w-6 h-6" src={assets.logo_icon1} alt="logo" />
            <span className="text-lg font-semibold text-gray-800">ECAI</span>
          </div>
          <div className="w-9"></div> {/* Spacer for centering */}
        </div>

        {/* Centered Content Container */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl w-full flex flex-col items-center">
            {/* Welcome Section */}
            <div className="text-center max-w-md w-full mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src={assets.logo_icon1} alt="logo" className="h-12 w-12 sm:h-16 sm:w-16" />
              </div>
              <h2 className={`text-2xl sm:text-3xl font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Hi, I'm ECAI
              </h2>
              <p className={`text-base sm:text-lg mb-6 ${darkMode ? 'text-white/80' : 'text-gray-600'}`}>
                Ask me anything to get started
              </p>
            </div>

            {/* Centered PromptBox */}
            <div className="w-full max-w-2xl">
              <PromptBox darkMode={darkMode} />
              
              <p className={`text-xs text-center mt-3 px-2 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                AI-generated responses may contain inaccuracies.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact modal */}
      <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Enhanced scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? 'rgba(156, 163, 175, 0.3)' : 'rgba(156, 163, 175, 0.5)'};
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? 'rgba(156, 163, 175, 0.5)' : 'rgba(156, 163, 175, 0.7)'};
        }
        
        /* Dark mode body styles */
        body.dark-mode {
          background: #0e0d15;
          color: white;
        }
        
        body.light-mode {
          background: #f9fafb;
          color: #1f2937;
        }

        /* Mobile sidebar animations */
        @media (max-width: 768px) {
          .sidebar-mobile {
            width: 100vw;
            height: 100vh;
          }
        }
        
        /* Prevent body scroll when mobile sidebar is open */
        body.sidebar-open {
          overflow: hidden;
        }
        
        /* Prevent mobile zoom on input focus */
        input, textarea, select {
          font-size: 16px;
        }
        
        @media (max-width: 768px) {
          input, textarea, select {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}