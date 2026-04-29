import { useEffect, useState, useRef } from 'react';

const contacts = [
  { id: 1, name: 'John Mwangi', status: 'Online' },
  { id: 2, name: 'Mary Achieng', status: 'Away' },
  { id: 3, name: 'David Ouma', status: 'Online' },
];

const initialConversations = {
  1: [
    { from: 'them', text: 'Hi there! I want to ask about the mountain bike available.', time: '09:12' },
    { from: 'me', text: 'Sure, it has a 21-speed drivetrain and hydraulic disc brakes.', time: '09:14' },
  ],
  2: [
    { from: 'them', text: 'Do you offer delivery to Nairobi?', time: '08:05' },
    { from: 'me', text: 'Yes, delivery is available across Nairobi for an extra fee.', time: '08:08' },
  ],
  3: [
    { from: 'them', text: 'Can I pay with M-Pesa for the commuter bike?', time: '10:03' },
    { from: 'me', text: 'Absolutely. We accept M-Pesa and card payments.', time: '10:04' },
  ],
};

const Chat = () => {
  const [selectedId, setSelectedId] = useState(contacts[0].id);
  const [chatInput, setChatInput] = useState('');
  const [conversations, setConversations] = useState(initialConversations);
  const messagesEndRef = useRef(null);

  const selectedContact = contacts.find((contact) => contact.id === selectedId);
  const messages = conversations[selectedId] || [];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedId]);

  const getBotReply = (text) => {
    const lower = text.toLowerCase();

    if (/price|cost|how much|charge/.test(lower)) {
      return 'Our bike prices vary by model and features. Tell me which bike you like and I will give you the best price.';
    }
    if (/delivery|ship|shipping|nairobi/.test(lower)) {
      return 'Yes, we offer delivery across Nairobi. Share your delivery area and we will confirm the cost.';
    }
    if (/mpesa|pay|payment|card/.test(lower)) {
      return 'You can pay with M-Pesa, card, or cash on delivery. I can help you finalize the order when you are ready.';
    }
    if (/order|buy|purchase|checkout/.test(lower)) {
      return 'Great choice! Add the bike to your cart and head to checkout. I can also help you with the payment steps.';
    }
    if (/hello|hi|hey|good morning|good afternoon|good evening/.test(lower)) {
      return 'Hello! I am here to help you find the perfect bicycle. What are you looking for today?';
    }
    if (/mountain|road|hybrid|electric|folding|cruiser|bmx/.test(lower)) {
      return 'We have multiple bike types available. Let me know if you want details on mountain, road, hybrid, or electric bikes.';
    }
    return 'Thanks for your message. Can you tell me which bike or feature you want to know more about?';
  };

  const sendMessage = () => {
    const text = chatInput.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = { from: 'me', text, time };
    setConversations((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMessage],
    }));
    setChatInput('');

    setTimeout(() => {
      const reply = {
        from: 'them',
        text: getBotReply(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setConversations((prev) => ({
        ...prev,
        [selectedId]: [...(prev[selectedId] || []), reply],
      }));
    }, 900);
  };

  return (
    <div className="chat-page">
      <div className="chat-layout">
        <aside className="chat-sidebar">
          <h2>Conversations</h2>
          <div className="contact-list">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                className={`contact-item ${contact.id === selectedId ? 'active' : ''}`}
                onClick={() => setSelectedId(contact.id)}
              >
                <div>
                  <strong>{contact.name}</strong>
                  <p>{contact.status}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="chat-window">
          <div className="chat-header">
            <div>
              <h2>{selectedContact?.name}</h2>
              <span>{selectedContact?.status}</span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-row ${message.from === 'me' ? 'message-own' : 'message-other'}`}
              >
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span>{message.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chat;
