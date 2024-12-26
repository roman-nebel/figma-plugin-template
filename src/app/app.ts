function sendMessage(type: string, data: any) {
  figma.ui.postMessage({ type, data });
}

function sendEchoMessage() {
  sendMessage('ECHO', { message: 'Hello from plugin' });
}

function messageHandler({ type, data }) {
  switch (type) {
    case 'TEST':
      console.log(`TEST message: ${data.message}`);
      sendEchoMessage()
      break;
    default:
      console.log(`Unhandled UI message: ${type}`, data);
  }
}

figma.showUI(__html__);

figma.ui.onmessage = messageHandler;
