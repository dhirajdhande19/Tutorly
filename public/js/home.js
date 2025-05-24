

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

    // Tab Switching
    const tabButtons = document.querySelectorAll('.resources-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.resources-content .tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const activeContent = document.getElementById(tabId);
            
            if (activeContent) {
                activeContent.classList.add('active');
                // Update Swiper for the active tab
                const swiper = activeContent.querySelector('.swiper');
                if (swiper && swiper.swiper) {
                    swiper.swiper.update();
                }
            } else {
                console.warn(`Tab content with ID ${tabId} not found.`);
            }
        });
    });

    // Initialize Swiper for each tab
    const swipers = document.querySelectorAll('.swiper');
    swipers.forEach(swiper => {
        new Swiper(swiper, {
            slidesPerView: 3,
            spaceBetween: 20,
            pagination: {
                el: swiper.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: swiper.querySelector('.swiper-button-next'),
                prevEl: swiper.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                576: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
            },
        });
    });

    var swiper = new Swiper('.testimonials-swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 1600, // Faster transition (1.6 seconds between slides)
    disableOnInteraction: false,
  },
  speed: 700, // Faster slide animation speed
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModal = document.querySelector('.close-modal');

    // Data - Sample resources with PDF URLs
    const resources = {
        videos: [
            {
                id: 'video1',
                title: 'Understanding Calculus Limits',
                author: 'Prof. Sarah Johnson',
                thumbnail: 'https://i.pinimg.com/736x/df/f4/36/dff4367e6098fb9ed31a154b7fa198e1.jpg',
                duration: '12:45',
                rating: 4.7,
                reviews: 1203,
                subject: 'Mathematics',
                videoUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DWsQQvHm4lSw&psig=AOvVaw2WHp6-PeDF6s4oAMaL8H1M&ust=1748094029522000&source=images&cd=vfe&opi=89978449&ved=0CAYQrpoMahcKEwiQuMzv27mNAxUAAAAAHQAAAAAQBA'
            },
            {
                id: 'video2',
                title: 'Derivatives Made Easy',
                author: 'Dr. John Smith',
                thumbnail: 'https://i.pinimg.com/736x/35/9a/f4/359af45bf9d393960ec7df32fd3bfd13.jpg',
                duration: '15:30',
                rating: 4.8,
                reviews: 1500,
                subject: 'Mathematics',
                videoUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DWsQQvHm4lSw&psig=AOvVaw2WHp6-PeDF6s4oAMaL8H1M&ust=1748094029522000&source=images&cd=vfe&opi=89978449&ved=0CAYQrpoMahcKEwiQuMzv27mNAxUAAAAAHQAAAAAQBA'
            }
        ],
        practice: [
            {
                id: 'practice1',
                title: 'Calculus Practice Set',
                author: 'Tutorly Team',
                thumbnail: 'https://i.pinimg.com/736x/35/9a/f4/359af45bf9d393960ec7df32fd3bfd13.jpg',
                problemCount: 25,
                difficulty: 3,
                subject: 'Mathematics',
                pdfUrl: 'https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_All.pdf'
            },
            {
                id: 'practice2',
                title: 'Advanced Calculus Problems',
                author: 'Tutorly Team',
                thumbnail: 'https://i.pinimg.com/736x/11/ff/06/11ff06acae79a99197d35165cdb89e99.jpg',
                problemCount: 30,
                difficulty: 4,
                subject: 'Mathematics',
                pdfUrl: 'https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_All.pdf'
            }
        ],
        guides: [
            {
                id: 'guide1',
                title: 'Calculus Study Guide',
                author: 'Tutorly Team',
                thumbnail: 'https://i.pinimg.com/736x/11/ff/06/11ff06acae79a99197d35165cdb89e99.jpg',
                pages: 15,
                rating: 4.2,
                reviews: 856,
                subject: 'Mathematics',
                pdfUrl: 'https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_All.pdf'
            },
            {
                id: 'guide2',
                title: 'Differential Calculus Guide',
                author: 'Tutorly Team',
                thumbnail: 'https://i.pinimg.com/736x/c9/45/c4/c945c4c1aa190bfd424ef3a7f00376d4.jpg',
                pages: 20,
                rating: 4.5,
                reviews: 1024,
                subject: 'Mathematics',
                pdfUrl: 'https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_All.pdf'
            }
        ],
        cheatsheets: [
            {
                id: 'cheat1',
                title: 'Calculus Formulas',
                author: 'Tutorly Team',
                thumbnail: 'https://i.pinimg.com/736x/c9/45/c4/c945c4c1aa190bfd424ef3a7f00376d4.jpg',
                type: 'PDF',
                downloads: 1402,
                subject: 'Mathematics',
                pdfUrl: 'https://www.math.ucdavis.edu/~kouba/CalculusCheatSheet.pdf'
            },
            {
                id: 'cheat2',
                title: 'Integral Calculus Cheat Sheet',
                author: 'Tutorly Team',
                thumbnail: 'https://i.pinimg.com/736x/df/f4/36/dff4367e6098fb9ed31a154b7fa198e1.jpg',
                type: 'PDF',
                downloads: 1800,
                subject: 'Mathematics',
                pdfUrl: 'https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_All.pdf'
            }
        ]
    };

    // Initialize Swipers
    const swipers = {
        video: initSwiper('.video-swiper'),
        practice: initSwiper('.practice-swiper'),
        guides: initSwiper('.guides-swiper'),
        cheatsheets: initSwiper('.cheats-swiper')
    };

    // Initialize the app
    initTabs();
    populateAllSwipers();
    initModal();

    // Functions
    function initTabs() {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                setTimeout(() => {
                    Object.values(swipers).forEach(swiper => swiper.update());
                }, 300);
            });
        });
    }

    function initSwiper(selector) {
        return new Swiper(selector, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                nextEl: `${selector} .swiper-button-next`,
                prevEl: `${selector} .swiper-button-prev`,
            },
            pagination: {
                el: `${selector} .swiper-pagination`,
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });
    }

    function populateAllSwipers() {
        populateSwiper(swipers.video, resources.videos, 'video');
        populateSwiper(swipers.practice, resources.practice, 'practice');
        populateSwiper(swipers.guides, resources.guides, 'guide');
        populateSwiper(swipers.cheatsheets, resources.cheatsheets, 'cheat');
    }

    function populateSwiper(swiper, items, type) {
        const wrapper = swiper.el.querySelector('.swiper-wrapper');
        wrapper.innerHTML = '';
        
        items.forEach(item => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = createResourceCard(item, type);
            wrapper.appendChild(slide);
        });
        
        if (type === 'video') {
            wrapper.querySelectorAll('.play-button').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const card = e.target.closest('.resource-card');
                    const video = items.find(v => v.id === card.dataset.id);
                    if (video && video.videoUrl) {
                        console.log('Opening video with URL:', video.videoUrl);
                        openVideoModal(video.videoUrl);
                    } else {
                        console.error('Video URL not found for card:', card.dataset.id);
                    }
                });
            });
        } else {
            wrapper.querySelectorAll('.resource-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.play-button')) {
                        const item = items.find(v => v.id === card.dataset.id);
                        if (item && item.pdfUrl) {
                            console.log('Opening PDF:', item.pdfUrl);
                            window.open(item.pdfUrl, '_blank');
                        } else {
                            console.error('PDF URL not found for item:', card.dataset.id);
                        }
                    }
                });
            });
        }
        
        swiper.update();
    }

    function createResourceCard(item, type) {
        let extraContent = '';
        if (type === 'video') {
            extraContent = `
                <div class="play-button">
                    <i class="fas fa-play"></i>
                </div>
                <div class="duration">${item.duration}</div>
            `;
        } else if (type === 'practice') {
            extraContent = `<div class="problem-count">${item.problemCount} Problems</div>`;
        } else if (type === 'guide') {
            extraContent = `<div class="guide-pages">${item.pages} Pages</div>`;
        } else if (type === 'cheat') {
            extraContent = `<div class="sheet-type">${item.type}</div>`;
        }
        
        let ratingContent = '';
        if (type === 'video' || type === 'guide') {
            ratingContent = `
                <div class="rating">
                    ${generateStars(item.rating)}
                    <span>${item.rating.toFixed(1)} (${item.reviews.toLocaleString()})</span>
                </div>
            `;
        } else if (type === 'practice') {
            ratingContent = `
                <div class="difficulty">
                    <span>Difficulty:</span>
                    <div class="stars">
                        ${generateStars(item.difficulty, 5)}
                    </div>
                </div>
            `;
        } else if (type === 'cheat') {
            ratingContent = `
                <div class="downloads">
                    <i class="fas fa-download"></i>
                    <span>${item.downloads.toLocaleString()} downloads</span>
                </div>
            `;
        }
        
        return `
            <div class="resource-card" data-id="${item.id}">
                <div class="resource-image">
                    <img src="${item.thumbnail}" alt="${item.title}">
                    ${extraContent}
                </div>
                <div class="resource-info">
                    <span class="subject-tag">${item.subject}</span>
                    <h3>${item.title}</h3>
                    <p class="author">By ${item.author}</p>
                    ${ratingContent}
                </div>
            </div>
        `;
    }

    function generateStars(rating, max = 5) {
        return Array.from({ length: max }, (_, i) => {
            if (i < Math.floor(rating)) {
                return '<i class="fas fa-star"></i>';
            } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                return '<i class="fas fa-star-half-alt"></i>';
            } else {
                return '<i class="far fa-star"></i>';
            }
        }).join('');
    }

    function initModal() {
        function openVideoModal(url) {
            try {
                // Regular expression to match YouTube video IDs from various URL formats
                const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                if (!videoIdMatch || !videoIdMatch[1]) {
                    throw new Error('Invalid YouTube URL: could not extract video ID');
                }
                const videoId = videoIdMatch[1];
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                console.log('Extracted videoId:', videoId);
                console.log('Setting iframe src to:', embedUrl);
                videoFrame.src = embedUrl;
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            } catch (error) {
                console.error('Error opening video modal:', error.message);
                alert('Failed to load video. Please try again later.');
            }
        }

        function closeVideoModal() {
            videoFrame.src = '';
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('Video modal closed');
        }

        closeModal.addEventListener('click', closeVideoModal);
        
        window.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
});