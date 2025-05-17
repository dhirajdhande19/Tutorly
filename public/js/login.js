/**
 * Tutorly JavaScript - login.js
 * Handles mobile menu (hidden by default), dark mode, smooth scrolling, and login form validation.
 */

// Utility function to toggle classes
const toggleClass = (element, className) => element?.classList.toggle(className);

// Mobile Menu Initialization (Hidden by Default)
const initMobileMenu = () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    if (!mobileMenuBtn || !mainNav) {
        console.warn('Mobile menu elements not found.');
        return;
    }

    mainNav.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');

    mobileMenuBtn.addEventListener('click', () => {
        toggleClass(mainNav, 'active');
        const isOpen = mainNav.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mainNav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
        }
    });

    mobileMenuBtn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            mobileMenuBtn.click();
        }
    });
};

// Dark Mode Toggle
const initDarkMode = () => {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (!darkModeToggle) return console.warn('Dark mode toggle not found.');

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        toggleClass(document.body, 'dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    });
};

// Smooth Scrolling for Anchor Links
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
};

// Form Validation
const initFormValidation = () => {
    const form = document.getElementById('login-form');
    if (!form) return console.warn('Login form not found.');

    const setError = (field, message) => {
        const formGroup = field.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    };

    const clearError = (field) => {
        const formGroup = field.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
    };

    const validateField = (field) => {
        const value = field.value.trim();
        const name = field.name;

        if (!value) {
            setError(field, `${name.charAt(0).toUpperCase() + name.slice(1)} is required`);
            return false;
        }

        if (name === 'username') {
            if (value.length < 2) {
                setError(field, 'Username must be at least 2 characters');
                return false;
            }
        } else if (name === 'password') {
            if (value.length < 8) {
                setError(field, 'Password must be at least 8 characters');
                return false;
            }
        }

        clearError(field);
        return true;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = form.querySelectorAll('input[type="text"], input[type="password"]');
        let isValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            // console.log('Form submitted:', {
            //     username: form.querySelector('#username').value,
            //     password: form.querySelector('#password').value,
            //     rememberMe: form.querySelector('#remember-me').checked
            // });
            // alert('Login successful! (Mock action)');
            // form.reset();
            // fields.forEach(field => clearError(field));
            form.submit(); // submit the form natively to backend
        }
    });

    form.querySelectorAll('input[type="text"], input[type="password"]').forEach(field => {
        field.addEventListener('input', () => validateField(field));
        field.addEventListener('blur', () => validateField(field));
    });
};


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



// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initDarkMode();
    initSmoothScrolling();
    initFormValidation();
});