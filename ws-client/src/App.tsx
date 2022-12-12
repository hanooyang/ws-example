import React, { useCallback, useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import logo from './logo.svg';
import './App.css';

function App() {
  const [progress, setProgress] = useState(0);
  const [wsInstance, setWsInstance] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket('wss://10.196.9.239:3088');
    setWsInstance(ws);
    ws.onmessage = (evt) => {
      setProgress(Number.parseInt(evt.data));
    };
  }, []);

  const onStart = useCallback(() => {
    if (!wsInstance) return;
    wsInstance.send('start');
  }, [wsInstance]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <ProgressBar completed={progress * 10} width='600px' />
        <h3 onClick={onStart}>Start</h3>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
