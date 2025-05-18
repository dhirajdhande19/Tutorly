document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            // Position ripple
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// CSS for ripple effect (included in JS for context, but applied via CSS file)
const style = document.createElement('style');
style.innerHTML = `
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        width: 100px;
        height: 100px;
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);