import React from 'react';
import { MessageCircleMore, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="bg-gray-800 text-gray-300 py-3 px-4 text-sm  bottom-0 w-full z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MessageCircleMore className='mr-2 text-green-400' size={16} />
          <span>WhatsApp Panel © {currentYear} DigiCoder Technology</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Help</a>
          <div className="flex items-center">
            <span className="mr-1">Made with</span>
            <Heart size={14} className="text-red-400 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;