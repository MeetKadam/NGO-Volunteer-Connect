import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Chatbot.css"; // Import custom CSS

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(
    () => localStorage.getItem('chatbotOpen') === 'true'
  );
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to the Assistant! How can I assist you with your  queries today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('chatbotOpen', isOpen);
  }, [isOpen]);

  const generateResponse = async (prompt) => {
    try {
      const response = await axios.post(
        'https://api.cohere.ai/v1/generate',
        {
          model: 'command-xlarge-nightly',
          prompt: prompt,
          max_tokens: 300,
          temperature: 0.9,
          k: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE',
        },
        {
          headers: {
            Authorization: `Bearer GstpGkjpCDH1x7cTMDrOHr9oSGnZhimtZZ28DPo0`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.generations[0].text.trim();
    } catch (error) {
      console.error('Error calling Cohere API:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const conversationHistory = newMessages
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join('\n');
    const prompt = `${conversationHistory}\nbot:`;

    try {
      const botResponse = await generateResponse(prompt);
      setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <button onClick={toggleChatbot} className="chatbot-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3 className="chatbot-title"> Assistant</h3>
        <button onClick={toggleChatbot} className="chatbot-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cross"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="chatbot-loading">Thinking...</div>}
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          placeholder="Ask me anything about..."
          className="chatbot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage} className="chatbot-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
