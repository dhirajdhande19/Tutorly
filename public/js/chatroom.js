document.addEventListener('DOMContentLoaded', () => {
    // Chat elements
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.chat-input .btn-primary');
    const chatBox = document.querySelector('.chat-messages');

    // Flash message logic
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

    // Chat helpers
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

    // OPENROUTER.AI API Integration
    async function fetchAIResponse(userMessage) {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'openai/gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: userMessage }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error('AI API error');
            }

            const data = await response.json();
            const aiText = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
            createMessage('bot', aiText);
        } catch (error) {
            createMessage('bot', "Sorry, there was a problem contacting the AI.");
        }
    }

    // Send message logic
    function sendMessage() {
        const msg = input.value.trim();
        if (!msg) return;
        createMessage('user', msg);
        input.value = '';
        fetchAIResponse(msg);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});