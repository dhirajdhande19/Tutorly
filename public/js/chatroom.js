document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.chat-input input');
  const sendBtn = document.querySelector('.chat-input .btn-primary');
  const chatBox = document.querySelector('.chat-messages');

  //Function to scroll to the bottom of the chat box
  const scrollToBottom = () => {
    chatBox.scrollTop = chatBox.scrollHeight;
  };
// Function to animate the message
const animateMessage = (el) => {
  el.classList.add('slide-in');
  setTimeout(() => el.classList.remove('slide-in'), 600);
};

// Function to create and display a message
const createMessage = (type, text) => {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = `message ${type}-message`;
  div.innerHTML = `
    <div class="message-content">
      <p>${text}</p>
    </div>
    <div class="message-time">${time}</div>
  `;
  animateMessage(div);
  chatBox.appendChild(div);
  scrollToBottom();
};

  // Openrouter API Key
  const OPENROUTER_API_KEY = ''; // Add the Key here

  // Call OpenRouter AI API
  async function callOpenRouterAI(model, messages) {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages
      })
    });
    const data = await response.json();
    return data.choices && data.choices[0] && data.choices[0].message.content
      ? data.choices[0].message.content
      : "Sorry, I couldn't get a response.";
  }

  // Message sending functions
  const sendMessage = async () => {
    const msg = input.value.trim();
    if (!msg) return;
    createMessage('user', msg);
    input.value = '';

    // Ask the AI to classify the question type
    createMessage('bot', 'Detecting question type...');
    const classifierPrompt = [
      { role: 'system', content: 'You are a question classifier. Given a user question, respond with only the type of question it is (e.g., "math", "science", "history", "general", etc.). Respond with a single word.' },
      { role: 'user', content: msg }
    ];
    let questionType = await callOpenRouterAI('openai/gpt-3.5-turbo', classifierPrompt);
    questionType = questionType.replace(/[^a-zA-Z]/g, '').toLowerCase();

    // Ask AI the respond to the question
    createMessage('bot', `Detected type: ${questionType}. Getting answer...`);
    const responderPrompt = [
      { role: 'system', content: `You are an expert AI in ${questionType}. Answer the user's question in a helpful and concise way.` },
      { role: 'user', content: msg }
    ];
    const answer = await callOpenRouterAI('openai/gpt-3.5-turbo', responderPrompt);
    createMessage('bot', answer);
  };

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});

// Flash message handling
document.addEventListener("DOMContentLoaded", () => {
  const flashMessages = document.querySelectorAll(".flash-message");

  flashMessages.forEach(flash => {
  const timeout = setTimeout(() => {
    fadeOut(flash);
  }, 3000);

  const closeBtn = flash.querySelector(".flash-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
    clearTimeout(timeout);
    fadeOut(flash);
    });
  }
  });

  function fadeOut(element) {
  element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  element.style.opacity = "0";
  element.style.transform = "translateX(-50%) translateY(-20px)";
  setTimeout(() => {
    element.remove();
  }, 500);
  }
});
