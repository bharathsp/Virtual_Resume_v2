// ============================================
// CYBERPUNK ANIMATIONS & INTERACTIONS
// Matrix Rain, Typing Effects, Parallax, etc.
// ============================================

// Matrix Rain Animation
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
        
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00FF9C';
        this.ctx.font = `${this.fontSize}px JetBrains Mono`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillStyle = `rgba(0, 255, 156, ${Math.random() * 0.5 + 0.3})`;
            this.ctx.fillText(text, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Terminal Loading Animation
class TerminalLoader {
    constructor() {
        this.terminalText = document.getElementById('terminal-text');
        this.terminalLoader = document.getElementById('terminal-loader');
        this.messages = [
            'Initializing system...',
            'Loading profile data...',
            'Connecting to neural network...',
            'Compiling experience matrix...',
            'System ready.'
        ];
        this.currentMessage = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const current = this.messages[this.currentMessage];
        
        if (!this.isDeleting && this.currentChar < current.length) {
            this.terminalText.textContent = current.substring(0, this.currentChar + 1);
            this.currentChar++;
            setTimeout(() => this.type(), 50);
        } else if (this.isDeleting && this.currentChar > 0) {
            this.terminalText.textContent = current.substring(0, this.currentChar - 1);
            this.currentChar--;
            setTimeout(() => this.type(), 30);
        } else if (!this.isDeleting && this.currentChar === current.length) {
            if (this.currentMessage === this.messages.length - 1) {
                setTimeout(() => this.hideLoader(), 1500);
                return;
            }
            setTimeout(() => {
                this.isDeleting = true;
                this.type();
            }, 2000);
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentMessage = (this.currentMessage + 1) % this.messages.length;
            setTimeout(() => this.type(), 500);
        }
    }

    hideLoader() {
        this.terminalLoader.classList.add('hidden');
        setTimeout(() => {
            this.terminalLoader.style.display = 'none';
            initMainAnimations();
        }, 500);
    }
}

// Typing Effect for Skills
class SkillsTyping {
    constructor() {
        this.element = document.getElementById('typing-skills');
        this.skills = ['Python', 'GCP', 'BigQuery', 'ML Pipelines', 'PySpark', 'Azure', 'Databricks', 'Kafka'];
        this.currentSkill = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const current = this.skills[this.currentSkill];
        
        if (!this.isDeleting && this.currentChar < current.length) {
            this.element.textContent = current.substring(0, this.currentChar + 1);
            this.currentChar++;
            setTimeout(() => this.type(), 100);
        } else if (this.isDeleting && this.currentChar > 0) {
            this.element.textContent = current.substring(0, this.currentChar - 1);
            this.currentChar--;
            setTimeout(() => this.type(), 50);
        } else if (!this.isDeleting && this.currentChar === current.length) {
            setTimeout(() => {
                this.isDeleting = true;
                this.type();
            }, 2000);
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentSkill = (this.currentSkill + 1) % this.skills.length;
            setTimeout(() => this.type(), 500);
        }
    }
}

// Intro Text Typing
class IntroTyping {
    constructor() {
        this.element = document.getElementById('intro-text');
        this.text = 'loading profile...';
        this.currentChar = 0;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        if (this.currentChar < this.text.length) {
            this.element.textContent = this.text.substring(0, this.currentChar + 1);
            this.currentChar++;
            setTimeout(() => this.type(), 80);
        }
    }
}

// Scroll-triggered Animations
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        this.observeSections();
        window.addEventListener('scroll', () => this.handleScroll());
    }

    observeSections() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    handleScroll() {
        // Parallax effect for header
        const header = document.getElementById('body-header');
        if (header) {
            const scrolled = window.pageYOffset;
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
}

// Cursor Glow Effect
class CursorGlow {
    constructor() {
        this.cursor = document.querySelector('.cursor-glow');
        this.init();
    }

    init() {
        if (!this.cursor) return;
        
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });

        // Hide cursor on mobile
        if (window.innerWidth <= 768) {
            this.cursor.style.display = 'none';
        }
    }
}

// Parallax on Mouse Move
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const elements = document.querySelectorAll('.portfolio-image-container, .certification-image-container');
            elements.forEach((el, index) => {
                const speed = (index % 3 + 1) * 0.5;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

// Glitch Effect on Hover
class GlitchEffect {
    constructor() {
        this.init();
    }

    init() {
        const glitchElements = document.querySelectorAll('.glitch, .section-heading span:last-child');
        
        glitchElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.animation = 'glitch-anim 0.3s infinite';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.animation = 'glowPulse 2s ease-in-out infinite';
            });
        });
    }
}

// Initialize all animations
function initMainAnimations() {
    // Initialize Matrix Rain
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        new MatrixRain(canvas);
    }

    // Initialize Skills Typing
    new SkillsTyping();

    // Initialize Intro Typing
    new IntroTyping();

    // Initialize Scroll Animations
    new ScrollAnimations();

    // Initialize Cursor Glow
    new CursorGlow();

    // Initialize Parallax Effect
    if (window.innerWidth > 768) {
        new ParallaxEffect();
    }

    // Initialize Glitch Effect
    new GlitchEffect();

    // Smooth scroll for navigation
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

    // Sticky navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Initialize animations directly on page load
document.addEventListener('DOMContentLoaded', () => {
    initMainAnimations();
});

// Particle System for Background (Optional Enhancement)
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particles-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '1';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.3';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
        
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#00FF9C';
            this.ctx.fill();
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#00FF9C';
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 255, 156, ${1 - distance / 150})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system after main animations
setTimeout(() => {
    if (window.innerWidth > 768) {
        new ParticleSystem();
    }
}, 3000);
