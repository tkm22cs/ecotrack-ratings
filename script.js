// Initialize AOS with custom settings
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    delay: 100
});

// Global variables
let currentUser = '';
const userRatings = new Map();

// DOM Elements
const backToTopButton = document.getElementById('backToTop');
const usernameInput = document.getElementById('username');
const userInputSection = document.getElementById('user-input');
const ratingSection = document.getElementById('rating-section');
const thankYouSection = document.getElementById('thank-you');
const userNameDisplay = document.getElementById('user-name-display');

// Logo refresh functionality
document.addEventListener('DOMContentLoaded', () => {
    // Logo click handler - complete refresh
    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = window.location.href.split('#')[0]; // Remove any hash
        window.location.reload(true); // Force reload from server
    });

    // Initialize rating cards
    const emojiCards = document.querySelectorAll('.emoji-card');
    emojiCards.forEach(card => {
        card.addEventListener('click', () => handleRating(card));
    });

    // Initialize smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Back to Top functionality
function handleScroll() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Throttled scroll event listener
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            handleScroll();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

backToTopButton.addEventListener('click', scrollToTop);

// Username handling
function setUsername() {
    const username = usernameInput.value.trim();
    
    if (username) {
        currentUser = username;
        userInputSection.classList.add('hidden');
        ratingSection.classList.remove('hidden');
        userNameDisplay.textContent = username;
        
        // Smooth scroll to rating section
        ratingSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    } else {
        // Shake animation for empty input
        usernameInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            usernameInput.style.animation = '';
        }, 500);
    }
}

// Enter key for username input
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setUsername();
    }
});

// Handle rating selection
function handleRating(card) {
    if (!currentUser) {
        userInputSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        return;
    }

    if (!userRatings.has(currentUser)) {
        const countElement = card.querySelector('.count');
        const usersList = card.querySelector('.users-list');
        const emojiType = card.dataset.emoji;

        // Update count with animation
        const currentCount = parseInt(countElement.textContent);
        countElement.style.transform = 'scale(1.2)';
        countElement.textContent = currentCount + 1;
        setTimeout(() => {
            countElement.style.transform = 'scale(1)';
        }, 200);
        
        // Add user to the list with animation
        const userSpan = document.createElement('span');
        userSpan.textContent = currentUser;
        userSpan.style.opacity = '0';
        usersList.appendChild(userSpan);
        
        // Fade in animation
        requestAnimationFrame(() => {
            userSpan.style.opacity = '1';
            userSpan.style.transition = 'opacity 0.3s ease';
        });
        
        // Store the rating
        userRatings.set(currentUser, emojiType);
        
        // Show thank you message with animation
        thankYouSection.classList.remove('hidden');
        thankYouSection.style.opacity = '0';
        thankYouSection.style.transform = 'translateY(10px)';
        
        requestAnimationFrame(() => {
            thankYouSection.style.opacity = '1';
            thankYouSection.style.transform = 'translateY(0)';
            thankYouSection.style.transition = 'all 0.3s ease';
        });
        
        // Scroll to thank you message
        setTimeout(() => {
            thankYouSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
        
        // Card animation feedback
        card.style.transform = 'scale(1.05)';
        card.style.backgroundColor = '#f0fdf4';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.backgroundColor = 'white';
            card.style.transition = 'all 0.3s ease';
        }, 300);
    }
}

// Add shake animation style
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(styleSheet);