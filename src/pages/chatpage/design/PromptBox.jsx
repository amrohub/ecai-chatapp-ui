import React, { useState, useRef, useEffect } from 'react';
import { assets } from "../../../assets/assets";
import { Mic, Send, Search, Paperclip, Sparkles } from 'lucide-react';

const PromptBox = ({ darkMode }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const formRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Enhanced suggestions
  const suggestions = [
    "Explain quantum computing simply",
    "Write a professional email",
    "Debug my React code",
    "Create a workout plan",
    "Summarize this article"
  ];

  const handleInput = (e) => {
    setInput(e.target.value);
    setShowSuggestions(e.target.value.length === 0 && isFocused);

    // Auto resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    // UI demo - simulate loading
    setLoading(true);
    setShowSuggestions(false);
    setTimeout(() => {
      setLoading(false);
      setInput(''); // Clear input after "sending"
    }, 2000);
  };

  // Handler for keyboard Enter event
  const handleKeySubmit = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  // Auto resize on input change
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Handle click outside to remove focus state
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFocused(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Start Recording (UI demo only)
  const startRecording = () => {
    setRecording(true);
    // Auto stop after 3 seconds for demo
    setTimeout(() => {
      setRecording(false);
    }, 3000);
  };

  // Stop Recording
  const stopRecording = () => {
    setRecording(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(input.length === 0);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Enhanced Suggestions Dropdown */}
      {showSuggestions && (
        <div className={`absolute bottom-full mb-2 left-0 right-0 rounded-2xl shadow-2xl border backdrop-blur-md z-50 overflow-hidden
          ${darkMode 
            ? 'bg-[#1a1925]/95 border-gray-700/50' 
            : 'bg-white/95 border-gray-200/50'
          }`}>
          <div className={`p-3 border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <div className="flex items-center gap-2">
              <Sparkles className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Try asking about:
              </span>
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 hover:scale-[1.01]
                  ${darkMode 
                    ? 'text-white/70 hover:text-white hover:bg-white/10' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-blue-50'
                  }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <form 
        ref={formRef}
        onSubmit={handleSubmit}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative w-full transition-all duration-500 ease-out
          ${darkMode ? 'bg-[#1a1925]' : 'bg-white'} 
          rounded-3xl border-2
          ${isFocused 
            ? `${darkMode 
                ? 'border-blue-500/60 shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
                : 'border-blue-500/60 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
              } scale-[1.02]` 
            : `${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}
          ${isHovering && !isFocused
            ? `${darkMode 
                ? 'border-gray-600/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                : 'border-gray-300/60 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
              } translate-y-[-2px]` 
            : ''}
          shadow-xl backdrop-blur-sm`}
      >
        {/* Enhanced Floating Label Effect */}
        {(isFocused || input) && (
          <div className={`absolute -top-2 left-4 px-2 text-xs font-medium transition-all duration-300
            ${darkMode ? 'bg-[#1a1925] text-blue-400' : 'bg-white text-blue-600'}`}>
            Message ECAI
          </div>
        )}

        <div className="p-4">
          {/* Main Input Area */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              className={`w-full resize-none bg-transparent outline-none transition-all duration-200
                ${darkMode ? 'text-white placeholder:text-gray-500' : 'text-gray-800 placeholder:text-gray-400'}
                scrollbar-thin ${darkMode 
                  ? 'scrollbar-thumb-blue-500/30 scrollbar-track-transparent' 
                  : 'scrollbar-thumb-blue-400/30 scrollbar-track-gray-100'
                } scrollbar-thumb-rounded-full`}
              rows={1}
              placeholder={!isFocused ? "Message ECAI..." : "Type your message..."}
              onChange={handleInput}
              onKeyDown={handleKeySubmit}
              onFocus={handleFocus}
              value={input}
              disabled={loading}
              style={{
                minHeight: '24px',
                maxHeight: '200px',
                fontSize: '16px', // Prevent zoom on mobile
              }}
            />

            {/* Character count indicator for long messages */}
            {input.length > 100 && (
              <div className={`absolute bottom-0 right-0 text-xs
                ${input.length > 500 
                  ? 'text-red-500' 
                  : darkMode ? 'text-white/40' : 'text-gray-400'
                }`}>
                {input.length}/1000
              </div>
            )}
          </div>

          {/* Enhanced Action Bar */}
          <div className="flex items-center justify-between mt-4">
            {/* Left Actions */}
            <div className="flex items-center gap-2">
              {/* Enhanced Search Button */}
              <button
                type="button"
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border transition-all duration-300
                  hover:scale-105 active:scale-95 group
                  ${darkMode 
                    ? 'border-gray-600/50 text-white/70 hover:text-white hover:bg-white/5 hover:border-gray-500' 
                    : 'border-gray-300/50 text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-400'
                  }`}
              >
                <Search className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Search
              </button>

              {/* File Attachment Button */}
              <button
                type="button"
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95
                  ${darkMode ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              >
                <Paperclip className="w-5 h-5" />
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Enhanced Voice Button */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={recording ? stopRecording : startRecording}
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95
                    ${recording 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' 
                      : darkMode 
                        ? 'text-white/70 hover:text-white hover:bg-white/10' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  <Mic className={`w-5 h-5 transition-transform duration-300 
                    ${recording ? 'scale-110' : 'group-hover:scale-110'}`} />
                  
                  {recording && (
                    <div className="absolute -inset-2 border-2 border-red-400 rounded-full animate-ping opacity-75" />
                  )}
                </button>

                {/* Enhanced Tooltip */}
                <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg text-xs whitespace-nowrap
                  transition-all duration-200 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 pointer-events-none
                  ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'} shadow-lg`}>
                  {recording ? 'Stop Recording' : 'Voice Message'}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-gray-800" />
                </div>
              </div>

              {/* Enhanced Send Button */}
              <div className="relative group">
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className={`relative p-3 rounded-full transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden
                    ${input.trim() && !loading
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/40" 
                      : darkMode 
                        ? "bg-gray-700/50 text-gray-400" 
                        : "bg-gray-200 text-gray-500"
                    } disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className={`w-5 h-5 transition-all duration-300
                      ${input.trim() ? "group-hover:translate-x-0.5 group-hover:scale-110" : ""}`} />
                  )}
                  
                  {input.trim() && !loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 
                                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  )}
                </button>

                {/* Enhanced Tooltip */}
                <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg text-xs whitespace-nowrap
                  transition-all duration-200 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 pointer-events-none
                  ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'} shadow-lg`}>
                  {loading ? 'Sending...' : !input.trim() ? 'Type a message' : 'Send Message'}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Loading State Overlay */}
        {loading && (
          <div className={`absolute inset-0 rounded-3xl backdrop-blur-[2px] flex items-center justify-center
            ${darkMode ? 'bg-black/20' : 'bg-white/20'}`}>
            <div className="flex items-center gap-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className={`text-sm font-medium ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Thinking...
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PromptBox;