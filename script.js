// --- Custom Cursor Logic ---
const cursorGlow = document.querySelector('.cursor-glow');
const interactables = document.querySelectorAll('a, button, .image-frame, .promise-item');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorGlow.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorGlow.classList.remove('hovering'));
    });
}

// --- Background Music Logic ---
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const icon = musicBtn.querySelector('i');

musicBtn.addEventListener('click', () => {
    if (bgMusic.muted) {
        bgMusic.muted = false;
        bgMusic.play();
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    } else {
        bgMusic.muted = true;
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    }
});

// Attempt to autoplay if possible (browsers often block this unmuted, but we request muted autoplay)
window.addEventListener('click', () => {
    // Fallback: start playing when user first interacts with page
    if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log('Audio play failed', e));
    }
}, { once: true });


// --- Typing Effect ---
const typingElement = document.getElementById('typing-text');
const phrase = "I messed up... but I don't want to lose you.";
let charIndex = 0;

function typeText() {
    if (charIndex < phrase.length) {
        typingElement.textContent += phrase.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100); // 100ms per character
    }
}

// Start typing effect slightly after load
setTimeout(typeText, 500);


// --- Scroll Animations (Intersection Observer) ---
const hiddenElements = document.querySelectorAll('.hidden-elem');

const observerOptions = {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible-elem');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

hiddenElements.forEach(el => observer.observe(el));


// --- Interactive Section Logic ---
const forgiveBtn = document.getElementById('forgive-btn');
const mainBtnContainer = document.getElementById('main-btn-container');
const decisionContainer = document.getElementById('decision-container');
const yesBtn = document.getElementById('yes-btn');
const timeBtn = document.getElementById('time-btn');
const finalMessage = document.getElementById('final-message');

forgiveBtn.addEventListener('click', () => {
    mainBtnContainer.style.display = 'none';
    decisionContainer.style.display = 'flex';
});

yesBtn.addEventListener('click', () => {
    decisionContainer.style.display = 'none';
    finalMessage.innerHTML = "Thank you for giving me another chance ❤️<br>I promise to do better.";
    createHeartBurst();
});

timeBtn.addEventListener('click', () => {
    decisionContainer.style.display = 'none';
    finalMessage.style.color = 'var(--soft-brown)';
    finalMessage.innerText = "I'll wait. No pressure. Just don't give up on us.";
});


// --- Heart Burst Animation (if YES is clicked) ---
function createHeartBurst() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart');
        heart.style.position = 'fixed';
        heart.style.color = '#ff4d4d'; // Soft red
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        // Random drift directions
        const tX = (Math.random() - 0.5) * 400;
        const tY = (Math.random() - 0.5) * 400;
        
        heart.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: `translate(calc(-50% + ${tX}px), calc(-50% + ${tY}px)) scale(1.5)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2500);
    }
}


// --- Floating Petals Generation ---
const petalsContainer = document.getElementById('petals-container');
const numPetals = 15;

for (let i = 0; i < numPetals; i++) {
    createPetal();
}

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Vary size, left position, animation duration, and delay for natural feel
    const size = Math.random() * 10 + 10; // 10px to 20px
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    
    petal.style.left = `${Math.random() * 100}vw`;
    
    const duration = Math.random() * 5 + 8; // 8s to 13s
    petal.style.animationDuration = `${duration}s`;
    
    const delay = Math.random() * 10;
    petal.style.animationDelay = `${delay}s`;
    
    petalsContainer.appendChild(petal);
}

// --- Floating "I Lub You" Popups ---
function createMiniPopup(x, y) {
    const popup = document.createElement('div');
    popup.classList.add('mini-popup');
    popup.innerHTML = 'I Lub You <i class="fas fa-heart" style="color: #ff4d4d; font-size: 0.9em;"></i>';
    
    const posX = x !== undefined ? x : Math.random() * window.innerWidth;
    const posY = y !== undefined ? y : Math.random() * window.innerHeight;
    
    popup.style.left = `${posX}px`;
    popup.style.top = `${posY}px`;
    
    document.body.appendChild(popup);
    
    setTimeout(() => popup.remove(), 2500);
}

document.addEventListener('click', (e) => {
    if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && !e.target.closest('button')) {
        createMiniPopup(e.clientX, e.clientY);
    }
});

setInterval(() => {
    createMiniPopup();
}, 2000);
