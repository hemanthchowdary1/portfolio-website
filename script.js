// Live Time Clock
const timeElement = document.getElementById('live-time');

if (timeElement) {

    const now = new Date();

    // Get timezone
    const fullDateString = now.toString();
    const tzMatch = fullDateString.match(/\(([^)]+)\)/);

    let timeZoneAbbr = "";
    if (tzMatch) {
        const tzName = tzMatch[1];
        if (tzName.includes(" ")) {
            timeZoneAbbr = tzName.split(' ').map(word => word[0]).join('');
        } else {
            timeZoneAbbr = tzName;
        }
    }

    function updateTime() {
        const now = new Date();

        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: true, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });

        timeElement.innerHTML = `${timeZoneAbbr} ${timeString}`;
    }

    setInterval(updateTime, 1000);
    updateTime();
}

// Dark/Light Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if (themeBtn && themeIcon) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        } else {
            themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        }
    });
}

// Ambient Background Glow
const glow = document.querySelector('.ambient-glow');
if (glow) {
    window.addEventListener('mousemove', (e) => {
        glow.style.setProperty('--mouse-x', `${e.clientX}px`);
        glow.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
}

// Custom Cursor Logic
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

if (dot && outline) {

let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
});

function animateCursor() {

    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;

    outline.style.left = outlineX + "px";
    outline.style.top = outlineY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();

const interactives = document.querySelectorAll('a, button');

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        outline.style.width = '60px';
        outline.style.height = '60px';
        outline.style.backgroundColor = 'var(--card-bg)';
    });

    el.addEventListener('mouseleave', () => {
        outline.style.width = '40px';
        outline.style.height = '40px';
        outline.style.backgroundColor = 'transparent';
    });
});

}

// Hacker Text Scramble Effect
const hackerText = document.querySelector('.hacker-text');
if (hackerText) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    hackerText.addEventListener('mouseover', event => {
        let iterations = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {
                    if (index < iterations) return event.target.dataset.value[index];
                    return letters[Math.floor(Math.random() * 26)]
                }).join("");
            
            if (iterations >= event.target.dataset.value.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    });
}

// 3D Tilt Effect for Project Cards
const cards = document.querySelectorAll('.tilt-card');
if (cards.length > 0) {
    // This hardware check ensures the 3D tilt ONLY runs on devices with a real mouse
    if (window.matchMedia("(pointer: fine)").matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;  
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -15; 
                const rotateY = ((x - centerX) / centerX) * 15;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.transition = "transform 0.5s ease"; 
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.transition = "none"; 
            });
        });
    }
}

// Scroll Reveals
const reveals = document.querySelectorAll(".section-title, .timeline-item, .card, .archive-header, .project-header, .project-content h2, .project-content p, .meta-item");

if (reveals.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}
