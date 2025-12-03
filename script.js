// Advanced Snow Particle System
class SnowParticleSystem {
    constructor() {
        this.canvas = document.getElementById('snowCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 150;
        this.isActive = true;
        this.wind = 0;
        this.windChange = 0;
        
        this.init();
        this.animate();
    }
    
    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Create initial particles
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle(true);
        }
        
        // Initialize wind
        this.wind = Math.random() * 2 - 1;
        
        // Setup snow toggle
        const snowToggle = document.getElementById('snowToggle');
        if (snowToggle) {
            snowToggle.addEventListener('click', () => {
                this.isActive = !this.isActive;
                snowToggle.classList.toggle('active');
            });
        }
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticle(randomY = false) {
        const types = ['❄', '•', '·'];
        const type = types[Math.floor(Math.random() * types.length)];
        const size = Math.random() * 4 + 2;
        const speed = Math.random() * 1 + 0.5;
        const opacity = Math.random() * 0.5 + 0.3;
        
        this.particles.push({
            x: Math.random() * this.canvas.width,
            y: randomY ? Math.random() * this.canvas.height : -10,
            type: type,
            size: size,
            speed: speed,
            opacity: opacity,
            sway: Math.random() * 0.5 - 0.25,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1
        });
    }
    
    updateParticles() {
        // Update wind
        this.windChange += 0.01;
        this.wind = Math.sin(this.windChange) * 0.5;
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            if (!this.isActive) {
                p.y -= 2; // Make snow rise when disabled
                if (p.y < -10) {
                    this.particles.splice(i, 1);
                    this.createParticle();
                }
                continue;
            }
            
            // Update position
            p.y += p.speed;
            p.x += p.sway + this.wind;
            p.rotation += p.rotationSpeed;
            
            // Add slight randomness to sway
            p.sway += (Math.random() * 0.1 - 0.05);
            p.sway = Math.max(-0.5, Math.min(0.5, p.sway));
            
            // Reset particle if it goes off screen
            if (p.y > this.canvas.height + 10 || 
                p.x < -10 || 
                p.x > this.canvas.width + 10) {
                this.particles.splice(i, 1);
                this.createParticle();
            }
        }
        
        // Maintain particle count
        while (this.particles.length < this.maxParticles) {
            this.createParticle();
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.isActive) return;
        
        this.ctx.save();
        
        for (const p of this.particles) {
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation * Math.PI / 180);
            
            if (p.type === '❄') {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                this.ctx.font = `${p.size * 4}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(p.type, 0, 0);
            } else {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
            
            this.ctx.restore();
        }
        
        this.ctx.restore();
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// SIMPLIFIED Music Player - Working version
class ChristmasMusicPlayer {
    constructor() {
        this.audio = document.getElementById('christmasMusic');
        this.playButton = document.getElementById('musicToggle');
        this.isPlaying = false;
        
        this.init();
    }
    
    init() {
        // Set initial volume to 50%
        this.audio.volume = 0.5;
        
        // Make sure audio is paused initially
        this.audio.pause();
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('Music player initialized');
        console.log('Audio element:', this.audio);
        console.log('Play button:', this.playButton);
    }
    
    setupEventListeners() {
        // Play/Pause button
        if (this.playButton) {
            console.log('Setting up play button listener');
            this.playButton.addEventListener('click', (e) => {
                console.log('Music button clicked');
                e.preventDefault();
                e.stopPropagation();
                this.togglePlay();
            });
        } else {
            console.error('Music button not found!');
        }
        
        // Update button state when audio starts/stops
        this.audio.addEventListener('play', () => {
            console.log('Audio started playing');
            this.isPlaying = true;
            this.updateButtonState();
        });
        
        this.audio.addEventListener('pause', () => {
            console.log('Audio paused');
            this.isPlaying = false;
            this.updateButtonState();
        });
        
        // Handle errors
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            console.error('Audio error details:', this.audio.error);
        });
    }
    
    togglePlay() {
        console.log('togglePlay called, isPlaying:', this.isPlaying);
        
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().then(() => {
                console.log('Audio playback started successfully');
            }).catch(error => {
                console.error('Failed to play audio:', error);
                // Show error message
                this.showPlaybackError();
            });
        }
    }
    
    updateButtonState() {
        if (!this.playButton) return;
        
        if (this.isPlaying) {
            this.playButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.playButton.classList.add('active');
            this.playButton.title = 'Pause Music';
            console.log('Button updated: Playing state');
        } else {
            this.playButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            this.playButton.classList.remove('active');
            this.playButton.title = 'Play Music';
            console.log('Button updated: Paused state');
        }
    }
    
    showPlaybackError() {
        // Simple error message
        alert('Could not play music. Please try clicking the music button again.');
    }
}

// Main Application - SIMPLIFIED
class ChristmasApp {
    constructor() {
        this.currentSection = 'home';
        this.videos = [
            {
                title: "Your Beautiful Smile",
                description: "The way your smile lights up my world... It's the first thing I think about when I wake up and the last thing I see before I sleep.",
                src: "videos/day1.mp4"
            },
            {
                title: "Your Infectious Laughter",
                description: "The sound of your laughter is my favorite melody. It fills our home with joy and makes even the hardest days better.",
                src: "videos/day2.mp4"
            },
            {
                title: "Your Kind Heart",
                description: "How you care for everyone around you... Your compassion and empathy inspire me to be a better person every day.",
                src: "videos/day3.mp4"
            }
        ];
        
        this.init();
    }
    
    init() {
        console.log('Initializing Christmas App...');
        
        // Initialize particle system
        this.particleSystem = new SnowParticleSystem();
        
        // Initialize music player ONLY - remove any other music setup
        this.musicPlayer = new ChristmasMusicPlayer();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup modal
        this.setupModal();
        
        this.initializeSections();
        
        console.log('Christmas App initialized successfully');
    }

    initializeSections() {
        const sections = ['home', 'videos', 'letter'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'none';
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }
        });

        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.style.display = 'block';
            setTimeout(() => {
                homeSection.style.opacity = '1';
                homeSection.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                this.switchToSection(sectionId);
                
                // Update active states
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Also setup the button clicks
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const text = button.textContent || button.innerText;
                if (text.includes('Videos')) {
                    this.scrollToSection('videos');
                } else if (text.includes('Letter')) {
                    this.scrollToSection('letter');
                }
            });
        });
    }
    
    switchToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        const currentSection = document.getElementById(this.currentSection);

        if (!targetSection || targetSection.id === this.currentSection) return;

        if (currentSection) {
            currentSection.style.opacity = '0';
            currentSection.style.transform = 'translateY(20px)';
            setTimeout(() => {
                currentSection.style.display = 'none';
            }, 500);
        }
        targetSection.style.display = 'block';

        // Force reflow
        targetSection.offsetHeight;
        
        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
            
            this.currentSection = sectionId;

            // Smooth scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }, 50);
    }

    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!targetSection) return;
        
        // Update navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Switch to section
        this.switchToSection(sectionId);
    }
    
    setupModal() {
        this.modal = document.getElementById('videoModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.videoPlayer = document.getElementById('mainVideo');
        
        // Setup video card clicks
        document.querySelectorAll('.video-preview, .btn-watch').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const videoCard = element.closest('.video-card');
                if (videoCard) {
                    const day = parseInt(videoCard.getAttribute('data-day'));
                    this.openVideoModal(day);
                }
            });
        });
    }
    
    openVideoModal(day) {
        const videoIndex = day - 1;
        if (videoIndex < 0 || videoIndex >= this.videos.length) return;
        
        const video = this.videos[videoIndex];
        this.modalTitle.textContent = video.title;
        this.modalDescription.textContent = video.description;
        this.videoPlayer.src = video.src;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Play video
        setTimeout(() => {
            this.videoPlayer.play().catch(() => {
                // Autoplay prevented
            });
        }, 300);
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.videoPlayer.pause();
        this.videoPlayer.currentTime = 0;
    }
}

// Global helper functions - Keep these simple
function scrollToSection(sectionId) {
    if (window.christmasApp) {
        window.christmasApp.scrollToSection(sectionId);
    }
}

function openVideoModal(day) {
    if (window.christmasApp) {
        window.christmasApp.openVideoModal(day);
    }
}

function closeModal() {
    if (window.christmasApp) {
        window.christmasApp.closeModal();
    }
}

// Close modal on background click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('videoModal');
    if (e.target === modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('videoModal');
        if (modal.classList.contains('active')) {
            closeModal();
        }
    }
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.christmasApp = new ChristmasApp();
    
    // Debug: Test if elements exist
    console.log('Music button exists:', !!document.getElementById('musicToggle'));
    console.log('Audio element exists:', !!document.getElementById('christmasMusic'));
    
    // Test audio file
    const audio = document.getElementById('christmasMusic');
    if (audio) {
        audio.addEventListener('canplay', () => {
            console.log('Audio file is ready to play');
        });
        audio.addEventListener('error', () => {
            console.error('Audio file error:', audio.error);
        });
    }
});