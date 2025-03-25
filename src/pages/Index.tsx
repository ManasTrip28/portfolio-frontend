import React, { useState, useEffect } from 'react';
import Chatbot from '@/components/Chatbot';
import { Button } from '@/components/ui/button';
import SkillsGraph from '@/components/SkillGraph';
import { Linkedin, Mail } from 'lucide-react';

const Index = () => {
  const [showChatButton, setShowChatButton] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);

  const fullText = "I aspire to pursue a challenging role that fosters growth and allows me to further develop my skills, ultimately contributing to the organization’s success while continuously enhancing my own capabilities";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    setShowChatButton(showChatbot);
  };

  const handleDownloadResume = () => {
    window.open('/Manas_Tripathi.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-10">
        {/* Hero section */}
        <div className="w-full mb-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <img 
                src="/profile.jpg" 
                alt="Manas Tripathi" 
                className="w-48 h-48 rounded-full object-cover border-2 border-blue-400"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Manas Tripathi
            </h1>
            <p className="text-xl text-white mb-12">
              {displayedText}
              <span className={index < fullText.length ? "animate-blink" : ""}>|</span>
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={handleDownloadResume} 
                className="bg-gray-700 hover:from-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Download Resume
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content with chatbot */}
        <div className="mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Explore My Portfolio: Ask My AI Assistant
              </h2>
              <p className="text gray-400 mb-6">
                Ask questions about my skills, experience, or projects
              </p>
              <div className="chatbot-wrapper">
                <Chatbot />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Technical Skills
            </h2>
            <p className="text-white font-bold mb-14 text-center">
              My core technical competencies
            </p>
            <div className="skills-graph-container h-[500px] w-full">
              <SkillsGraph />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 py-16 border-t border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Get in Touch
            </h2>
            <p className="text-gray-400 mb-8">
              Feel free to reach out for collaborations or just a friendly chat
            </p>
            
            <div className="flex justify-center gap-6">
              <a 
                href="https://www.linkedin.com/in/manas-tripathi-711320217/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="bg-blue-600 p-4 rounded-full transition-transform group-hover:scale-110">
                  <Linkedin size={28} />
                </div>
                <span className="mt-2 text-sm text-gray-400 group-hover:text-blue-400">LinkedIn</span>
              </a>
              
              <a 
                href="mailto:manast348@gmail.com" 
                className="flex flex-col items-center group"
              >
                <div className="bg-red-600 p-4 rounded-full transition-transform group-hover:scale-110">
                  <Mail size={28} />
                </div>
                <span className="mt-2 text-sm text-gray-400 group-hover:text-red-400">Email</span>
              </a>
            </div>
          </div>
        </div>

      {showChatButton && (
        <button 
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg md:hidden"
        >
          <span className="sr-only">Chat</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}
      
      {showChatbot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden">
          <div className="absolute inset-0 bg-black opacity-75" onClick={toggleChatbot}></div>
          <div className="relative w-full max-w-md bg-gray-900 rounded-lg shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium text-white">Chat with Me</h3>
              <button onClick={toggleChatbot} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Chatbot />
            </div>
          </div>
        </div>
      )}

      {/* Move CSS to a global scope */}
      <style>{`
        .animate-blink {
          animation: blink 0.8s infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;