
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(function() {
            preloader.style.display = 'none';
            animateHero();
        }, 500);
    }, 1500);

    // Animation GSAP pour le Hero
    function animateHero() {
        const tl = gsap.timeline();
        
        tl.to('.hero-content', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        tl.to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5");
        
        tl.to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5");
    }

    const nav = document.querySelector('.aero-nav');
    const hamburger = document.querySelector('.nav-hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll Event pour la navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Hamburger Menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu lors d'un clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section, header');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id') || 'hero';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current || (current === 'hero' && href === '')) {
                link.classList.add('active');
            }
        });
    });

    const zoomContainer = document.getElementById('zoomContainer');
    if (zoomContainer) {
        const baseImage = zoomContainer.querySelector('.zoom-base-image');
        const lens = zoomContainer.querySelector('.zoom-lens');
        const resultContainer = zoomContainer.querySelector('.zoom-result-container');
        const result = zoomContainer.querySelector('.zoom-result');
        const zoomBtns = document.querySelectorAll('.zoom-btn');
        let zoomLevel = 2;

        zoomBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                zoomBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                zoomLevel = parseFloat(this.dataset.zoom);
            });
        });

        // Gestionnaires d'événements de zoom
        zoomContainer.addEventListener('mouseenter', function() {
            lens.style.opacity = '1';
            resultContainer.style.opacity = '1';
        });

        zoomContainer.addEventListener('mouseleave', function() {
            lens.style.opacity = '0';
            resultContainer.style.opacity = '0';
        });

        zoomContainer.addEventListener('mousemove', function(e) {
            const rect = zoomContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Positionnement de la loupe
            lens.style.left = x + 'px';
            lens.style.top = y + 'px';
            
            // Calcul de la position pour l'image zoomée
            const ratio = baseImage.naturalWidth / baseImage.width;
            const resultX = x * ratio * zoomLevel;
            const resultY = y * ratio * zoomLevel;
            
            // Mise à jour de l'image zoomée
            result.style.backgroundImage = `url(${baseImage.src})`;
            result.style.backgroundPosition = `-${resultX}px -${resultY}px`;
            result.style.backgroundSize = `${baseImage.width * ratio * zoomLevel}px ${baseImage.height * ratio * zoomLevel}px`;
        });
    }

    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const avionCards = document.querySelectorAll('.avion-card');
    let currentIndex = 0;

    // Fonction pour mettre à jour le carousel
    function updateCarousel(index) {
        avionCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        avionCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

   
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = avionCards.length - 1;
            updateCarousel(newIndex);
        });

        nextBtn.addEventListener('click', function() {
            let newIndex = currentIndex + 1;
            if (newIndex >= avionCards.length) newIndex = 0;
            updateCarousel(newIndex);
        });

        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                updateCarousel(index);
            });
        });
    }

  
    const techCards = document.querySelectorAll('.tech-card');
    
  
    function animateProgressBars() {
        techCards.forEach(card => {
            const progressBar = card.querySelector('.progress-bar');
            const targetWidth = progressBar.style.width;
            
            // Réinitialiser pour l'animation
            progressBar.style.width = '0';
            
            // Observer la visibilité de la carte
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animer la barre lorsqu'elle est visible
                        setTimeout(() => {
                            progressBar.style.width = targetWidth;
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(card);
        });
    }
    
    animateProgressBars();

  
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation pour la section aéroports
    gsap.utils.toArray('.aeroport-card').forEach(card => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
   
    gsap.utils.toArray('.tech-card').forEach((card, index) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.tech-grid',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            
            alert('Merci pour votre message ! Nous vous contacterons bientôt.');
            contactForm.reset();
        });
    }

   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
