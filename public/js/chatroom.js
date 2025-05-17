document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.chat-input .btn-primary');
    const chatBox = document.querySelector('.chat-messages');

    const scrollToBottom = () => {
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const animateMessage = (el) => {
        el.classList.add('slide-in');
        setTimeout(() => el.classList.remove('slide-in'), 600);
    };

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

    const sendMessage = () => {
        const msg = input.value.trim();
        if (!msg) return;
        createMessage('user', msg);
        input.value = '';

        setTimeout(() => {
            createMessage('bot', `This is a placeholder message for now whilst I route the rest of the application. You wanted to talk about "${msg}" maybe there are a few things we could cover with this!`);
        }, 800);
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});

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

