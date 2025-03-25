import React, { useState, useRef, useEffect } from 'react';
import { Send, FileSearch } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import "../styles/Chatbot.css";

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! What brings you here today? Are you exploring my portfolio or looking for something specific?", sender: 'bot', timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [resultsFound, setResultsFound] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to the latest message whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]); // Trigger on messages or isTyping change

  const handleBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    try {
      const response = await fetch('https://artemis101.pythonanywhere.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.response;
      
      setMessages(prevMessages => [
        ...prevMessages,
        { text: botResponse, sender: 'bot', timestamp: new Date() }
      ]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: "Sorry, there was an error connecting to the server.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    const newMessage: Message = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
    
    toast({
      title: "Message sent",
      description: "Your message has been received."
    });
    
    handleBotResponse(inputMessage);
  };

  return (
    <div className="chatbot-container">
      {messages.length > 0 && (
        <div className="chatbot-messages">
          {resultsFound && (
            <div className="found-information">
              <FileSearch size={16} />
              <span>Found information about your question</span>
              <span className="found-count">{resultsFound} relevant items found</span>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`chatbot-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chatbot-message bot-message">
              <div className="typing-indicator">
                <p>Thinking..</p>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <form onSubmit={handleSendMessage} className="chatbot-input mb-12">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask anything about Manas..."
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping || !inputMessage.trim()}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;