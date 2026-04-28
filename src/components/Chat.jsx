import { useEffect, useState } from 'react';

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

  const selectedContact = contacts.find((contact) => contact.id === selectedId);
  const messages = conversations[selectedId] || [];

  useEffect(() => {
    const activeSection = document.querySelector('.content-area');
    if (activeSection) {
      activeSection.scrollTop = 0;
    }
  }, [selectedId]);

  const sendMessage = () => {
    const text = chatInput.trim();
    if (!text) return;

    const newMessage = { from: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setConversations((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMessage],
    }));
    setChatInput('');

    setTimeout(() => {
      const reply = {
        from: 'them',
        text: 'Thanks for your question! I will get back to you shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setConversations((prev) => ({
        ...prev,
        [selectedId]: [...(prev[selectedId] || []), reply],
      }));
    }, 1200);
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
