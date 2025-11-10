document.addEventListener('DOMContentLoaded', function() {
    // ===============================
    // 1️⃣ Fade-in Animation on Scroll (Sections)
    // ===============================
    const sections = document.querySelectorAll('.page');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
  
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
  
    // ===============================
    // 2️⃣ Topic Items (Staggered Fade-In)
    // ===============================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
  
    const topicObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 120);
            }
        });
    }, observerOptions);
  
    document.querySelectorAll('.topic-item').forEach(item => topicObserver.observe(item));
  
    // ===============================
    // 3️⃣ Smooth Scrolling for Nav + Buttons
    // ===============================
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
  
    // Navbar links smooth scroll
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
  
    // Call-To-Action buttons smooth scroll
    const scrollMap = {
        '.cta-button': '#page5',
        '.explore-button': '#page2'
    };
  
    for (const [btnSelector, target] of Object.entries(scrollMap)) {
        document.querySelectorAll(btnSelector).forEach(btn =>
            btn.addEventListener('click', () => smoothScroll(target))
        );
    }
  
    // ===============================
    // 4️⃣ Navbar Hide/Show on Scroll
    // ===============================
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 120) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScrollY = window.scrollY;
    });
  
    // ===============================
    // 5️⃣ Mobile Menu Toggle
    // ===============================
    const menuIcon = document.querySelector('.nav-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('open');
        });
    }
  
    // ===============================
    // 6️⃣ Hero Title Letter Animation
    // ===============================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = text.split('').map((char, i) =>
            `<span class="char" style="animation-delay:${i * 0.05}s">${char}</span>`
        ).join('');
    }
});