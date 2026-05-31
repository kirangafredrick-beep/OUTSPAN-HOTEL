import React, { useState, useRef, useEffect } from 'react';
import apiService from '../services/apiService';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! Welcome to Outspan Hotel. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await apiService.sendChat(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: response.reply || 'Thank you for your message. Our team will respond shortly.' }]);
    } catch (error) {
      // Fallback responses for common questions
      const fallbackResponses = {
        'hello': 'Hello! Welcome to Outspan Hotel Nyeri. How may we assist you?',
        'hi': 'Hi there! Welcome to Outspan Hotel. What can we help you with?',
        'price': 'Our rooms start from $80 per night for Standard, $120 for Deluxe, and $160 for Executive Suite. Would you like to make a booking?',
        'booking': 'You can book a room using our booking form above. Or I can help answer any questions you have!',
        'contact': 'You can reach us at +254 700 000 000 or info@outspanhotel.co.ke. Our address is Outspan Road, Nyeri, Kenya.',
        'location': 'We are located on Outspan Road, Nyeri, near Mount Kenya. It\'s about 2 hours drive from Nairobi.',
        'check in': 'Check-in time is from 2:00 PM. Early check-in may be available upon request.',
        'check out': 'Check-out time is 10:00 AM. Late check-out can be arranged for an additional fee.',
        'wifi': 'Yes, we offer free high-speed WiFi throughout the hotel.',
        'parking': 'Yes, we have free on-site parking for all our guests.',
        'pool': 'Yes, we have a beautiful outdoor swimming pool with views of Mount Kenya.',
        'restaurant': 'Our restaurant serves both local and international cuisine. Room service is also available.',
        'default': 'Thank you for your message. Our team will get back to you shortly. Is there anything else I can help you with?'
      };

      const lowerMessage = userMessage.toLowerCase();
      let response = fallbackResponses.default;
      
      for (const [key, value] of Object.entries(fallbackResponses)) {
        if (key !== 'default' && lowerMessage.includes(key)) {
          response = value;
          break;
        }
      }

      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className="btn chatbot-toggle"
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 998,
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Outspan Hotel Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                float: 'right'
              }}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chat-message bot">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatBot;