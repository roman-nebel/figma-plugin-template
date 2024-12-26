import React, { useEffect, useState } from 'react';
import '../styles/ui.css';
import Title from 'antd/es/typography/Title';
import Button from 'antd/es/button';
import { Typography } from 'antd';
const { Text } = Typography;

function sendMessage(type: string, data: any) {
  parent.postMessage({ pluginMessage: { type, data } }, '*');
}

function sendTestMessage() {
  sendMessage('TEST', { message: 'Hello from UI' });
}

function App() {
  // App state
  const [data, setData] = useState(null);

  function messageHandler(event: MessageEvent) {
    const { type, data } = event.data.pluginMessage;
    switch (type) {
      case 'ECHO':
        console.log(`ECHO message: ${data.message}`);
        setData(data.message);
        break;
      default:
        console.log(`Unhandled plugin message: ${type}`, data);
    }
  }

  useEffect(() => {
    /* Put some logic here */

    // Handle messages from main plugin code
    window.addEventListener('message', messageHandler);
  }, []);
  return (
    <>  
      <Title level={2}>Start Your Jorney!</Title>
      <Button onClick={sendTestMessage}>Test</Button>
      {data && <Text>{data}</Text>}
    </>
  );
}

export default App;
