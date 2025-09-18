import React, { useState, useRef, useEffect } from 'react';


const SaarthiChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setLoading(true);
    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: input }] }]
        })
      });
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not understand.';
      setMessages(msgs => [...msgs, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'Error connecting to Saarthi.' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, width: minimized ? 120 : 340, zIndex: 1000 }}>
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          style={{ width: '100%', height: 48, borderRadius: 12, background: '#2563eb', color: '#fff', fontWeight: 600, border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', cursor: 'pointer' }}
        >Saarthi ↑</button>
      ) : (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.12)', padding: 16, height: 420, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontWeight: 600, color: '#2563eb' }}>Saarthi Assistant</span>
            <button
              onClick={() => setMinimized(true)}
              style={{ background: 'none', border: 'none', fontSize: 18, color: '#2563eb', cursor: 'pointer', fontWeight: 700 }}
              title="Minimize"
            >_</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: 8 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 8, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                <span style={{ background: msg.role === 'user' ? '#e0e7ff' : '#f3f4f6', borderRadius: 8, padding: '6px 12px', display: 'inline-block' }}>{msg.content}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' ? sendMessage() : undefined}
              placeholder="Ask Saarthi..."
              style={{ flex: 1, borderRadius: 8, border: '1px solid #d1d5db', padding: '8px' }}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{ background: '#2563eb', color: '#fff', borderRadius: 8, padding: '8px 16px', border: 'none', fontWeight: 500 }}
            >Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaarthiChatBox;
