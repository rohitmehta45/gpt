import './App.css';
import { useEffect, useRef, useState } from "react";
import gptlogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import upgrade from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import sendMsgToOpenAI from './api.js';

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am ChatGPT, How can I help you?",
      isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input) return;
    const text = input;
    setInput('');
    setMessages([...messages, { text, isBot: false }]);

    const res = await sendMsgToOpenAI(text);
    setMessages(prev => [
      ...prev,
      { text: res, isBot: true }
    ]);
  }

  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      await handleSend();
    }
  }

  const handleQuery = async (queryText) => {
    if (!queryText) return;
    setInput('');
    setMessages(prev => [...prev, { text: queryText, isBot: false }]);

    const res = await sendMsgToOpenAI(queryText);
    setMessages(prev => [...prev, { text: res, isBot: true }]);
  }

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptlogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
            <button className="midBtn" onClick={() => { window.location.reload() }}>
              <img src={addBtn} alt="new chat" className="addBtn" />
              New chat
            </button>
          </div>

          <div className="upperSideBottom">
            <button className="query" onClick={() => handleQuery("What is Programming?")}>
              <img src={msgIcon} alt="Query" />
              What is Programming?
            </button>
            <button className="query" onClick={() => handleQuery("How to use an API?")}>
              <img src={msgIcon} alt="Query" />
              How to use an API?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <div className="listItem">
              <img src={home} className="listItemImg" alt='Home'/>
              Home
            </div>
            <div className="listItem">
              <img src={saved} className="listItemImg" alt='Saved'/>
              Saved
            </div>
            <div className="listItem">
              <img src={upgrade} className="listItemImg" alt='Upgrade'/>
              Upgrade to Pro
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        <div className='chats'>
          {messages.map((message, i) =>
            <div key={i} className={message.isBot ? 'chat bot' : "chat"}>
             <img className='chatImg' src={message.isBot ? gptImgLogo : userIcon} alt={message.isBot ? "Bot" : "User"} />
              <p className='txt'>{message.text}</p>
            </div>
          )}
          <div ref={msgEnd} />
        </div>

        <div className='chatFooter'>
          <div className='inp'>
            <input
              type="text"
              placeholder='Send a message'
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className='send' onClick={handleSend}>
              <img src={sendBtn} alt='send' />
            </button>
          </div>
          <p>ChatGPT may produce inaccurate info about people, places, or facts. ChatGPT December 20 Version.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
