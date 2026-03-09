// --- Wave Animation Logic ---
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

let width, height, waves = [];

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    waves = [
        { y: height * 0.5, length: 0.005, amplitude: 30, speed: 0.02, color: 'rgba(139, 92, 246, 0.1)' },
        { y: height * 0.6, length: 0.008, amplitude: 50, speed: 0.015, color: 'rgba(109, 40, 217, 0.05)' }
    ];
}

function animateWaves() {
    ctx.clearRect(0, 0, width, height);
    waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        for (let i = 0; i < width; i++) {
            ctx.lineTo(i, wave.y + Math.sin(i * wave.length + Date.now() * wave.speed * 0.05) * wave.amplitude);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    requestAnimationFrame(animateWaves);
}

window.addEventListener('resize', init);
init();
animateWaves();

// --- Burger Menu Logic ---
const burger = document.getElementById('burger');
const nav = document.getElementById('nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// --- Scroll Reveal & Skill Burst Logic ---
const revealElements = document.querySelectorAll('.reveal');
const skillCards = document.querySelectorAll('.skill-card');
const skillsSection = document.querySelector('#skills');

const handleScroll = () => {
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });

    const skillsTop = skillsSection.getBoundingClientRect().top;
    if (skillsTop < window.innerHeight - 150) {
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('burst');
            }, index * 80);
        });
    }
};

window.addEventListener('scroll', handleScroll);
handleScroll();

// --- Contact Form Handling ---
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!this.checkValidity()) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent(`Portfolio Message from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
    
    window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
    
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Email Client Opening...";
    setTimeout(() => {
        btn.innerText = originalText;
        this.reset();
    }, 2000);
});