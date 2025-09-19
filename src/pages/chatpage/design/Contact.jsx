import { assets } from '../../../assets/assets';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Contact = ({ isOpen, onClose }) => {
  const [animationClass, setAnimationClass] = useState('translate-x-full');
  
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure component is mounted before animation
      setTimeout(() => {
      setAnimationClass('translate-x-0 opacity-100 pointer-events-auto');
      }, 50);
    } else {
      setAnimationClass('translate-x-full opacity-0 pointer-events-none');
    }
  }, [isOpen]);

  return (
<div className={`fixed bottom-4 right-4 w-96 max-h-[80vh] h-auto bg-white shadow-2xl rounded-2xl z-50 transform transition-transform duration-300 ease-in-out ${animationClass}`}>
  <div className="flex flex-col h-full overflow-hidden">
    <div className="p-6 flex-1 overflow-y-auto">
      {/* Header with logo and close button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="text-black mr-2">
            {/* SVG Logo */}
            <img width="24" height="24" fill="none" 
              src={assets.logo_icon1}
            />
          </div>
          <div className="font-semibold text-lg text-black">ECAI</div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2 text-black">
          Hi <span className="text-2xl">👋</span>
        </h2>
        <h3 className="text-2xl font-bold text-black">How can we help?</h3>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-6 text-sm text-black">
      <div>
        <h2 className="font-semibold mb-1">About Us</h2>
        <p>
          Our platform uses AI to simplify learning through interactive and personalized lessons,
          making complex concepts easier and more accessible for all learners.
        </p>
      </div>

      <div>
        <h2 className="font-semibold mb-1">Contact / Support</h2>
        <p>
          For any questions, feedback, or technical support, feel free to reach out to us at: <br />
          📧 <a href="mailto:support@yourprojectname.com" className="text-blue-600 underline hover:text-blue-800">
            support@ecai.com
          </a>
          <br />
          We’re here to help and will get back to you as soon as possible.
        </p>
      </div>
      </div>

    </div>

  </div>
</div>

  );
};

export default Contact;