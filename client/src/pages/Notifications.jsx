const Chatbot = () => (
  <div
      style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
      }}
  >
      <iframe
          width="500"
          height="550"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/c43ecdf3-584b-4328-ac4f-f9c266e0ddd3"
          style={{
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          title="Chatbot"
      />
  </div>
);

export default Chatbot;
