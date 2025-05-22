document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Swiper for Resources and Testimonials
    const resourceSwiper = new Swiper('.resources-section .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    const testimonialSwiper = new Swiper('.testimonials-section .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        }
    });

    // Subjects Tab Switching
    const tabButtons = document.querySelectorAll('.subjects-tabs .tab-btn');
    const subjectCategories = document.querySelectorAll('.subject-category');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            subjectCategories.forEach(category => category.classList.remove('active'));

            button.classList.add('active');
            const categoryIndex = Array.from(tabButtons).indexOf(button);
            if (subjectCategories[categoryIndex]) {
                subjectCategories[categoryIndex].classList.add('active');
            }
        });
    });

    // Resources Tab Switching
    const resourceTabs = document.querySelectorAll('.resources-tabs .tab-btn');
    
    resourceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            resourceTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Add logic to update resources content based on tab
        });
    });

    // Chat Functionality
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input .btn-primary');
    const chatMessages = document.querySelector('.chat-messages');
    const newChatButton = document.querySelector('.chat-sidebar .btn-block');
    const chatItems = document.querySelectorAll('.chat-item');

    // Handle sending messages
    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.classList.add('message', 'user-message');
            userMessage.innerHTML = `
                <div class="message-content">
                    <p>${messageText}</p>
                </div>
                <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            `;
            chatMessages.appendChild(userMessage);

            // Simulate bot response
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.classList.add('message', 'bot-message');
                botMessage.innerHTML = `
                    <div class="message-content">
                        <p>I'm here to help! Can you provide more details about "${messageText}"?</p>
                        <div class="message-options">
                            <button class="btn btn-small">More Examples</button>
                            <button class="btn btn-small">Step-by-Step</button>
                            <button class="btn btn-small">Video Explanation</button>
                        </div>
                    </div>
                    <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                `;
                chatMessages.appendChild(botMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);

            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Handle new chat
    newChatButton.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-content">
                    <p>Hello! I'm your AI Tutor. How can I help you with your studies today?</p>
                </div>
                <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        `;
        chatItems.forEach(item => item.classList.remove('active'));
    });

    // Handle chat selection
    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            chatItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            // Load chat history (placeholder)
            chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">
                        <p>Loading chat: ${item.querySelector('h4').textContent}</p>
                    </div>
                    <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            `;
        });
    });

    // Handle message options
    chatMessages.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-small')) {
            const option = e.target.textContent;
            const response = document.createElement('div');
            response.classList.add('message', 'bot-message');
            response.innerHTML = `
                <div class="message-content">
                    <p>You selected "${option}". Here's more information...</p>
                </div>
                <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            `;
            chatMessages.appendChild(response);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
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

document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

})