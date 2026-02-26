/* COPYRIGHT SIGNATURE: Omkar R. Ghare | Front-End & Web Developer | Designed and Built January 2026 */

// Runtime integrity check — verifies signature exists in key files and shows a persistent overlay if missing.
;(async function pageIntegrityCheck(){
    const token = 'Omkar R. Ghare | Front-End & Web Developer | Designed and Built January 2026';
    const files = ['Index.html', 'css/style.css', 'js/script.js'];
    try {
        const texts = await Promise.all(files.map(f => fetch(f).then(r => r.ok ? r.text() : '')));
        const missing = files.filter((f, i) => !texts[i] || !texts[i].includes(token));
        if (missing.length) {
            const overlay = document.createElement('div');
            overlay.id = 'integrity-overlay';
            Object.assign(overlay.style, {
                position: 'fixed',
                inset: '0',
                background: 'rgba(10,10,15,0.95)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '2147483647',
                padding: '20px',
                textAlign: 'center',
                fontFamily: 'sans-serif',
                lineHeight: '1.4'
            });
            overlay.innerHTML = '<div><h2 style="margin-bottom:8px;">Integrity Check Failed</h2><p style="opacity:0.9;">This page has been modified and the required copyright signature is missing from: ' + missing.join(', ') + '.</p></div>';
            document.documentElement.appendChild(overlay);
            console.error('Integrity check failed. Missing signature in: ', missing);
            document.documentElement.style.pointerEvents = 'none';
            overlay.style.pointerEvents = 'auto';
        }
    } catch (e) {
        console.warn('Integrity check error', e);
    }
})();

        // ============================================
        // PRELOADER
        // ============================================
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            const body = document.body;
            
            setTimeout(() => {
                preloader.classList.add('hidden');
                body.classList.remove('loading');
            }, 1500);
        });

        // ============================================
        // THEME TOGGLE
        // ============================================
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // ============================================
        // MOBILE MENU
        // ============================================
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // ============================================
        // NAVBAR SCROLL EFFECT
        // ============================================
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ============================================
        // SCROLL TO TOP BUTTON
        // ============================================
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ============================================
        // SCROLL REVEAL ANIMATIONS
        // ============================================
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const revealPoint = 150;

            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        // ============================================
        // FAQ ACCORDION
        // ============================================
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // ============================================
        // SMOOTH SCROLL FOR ANCHOR LINKS
        // ============================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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

        // ============================================
        // PERFORMANCE OPTIMIZATION: Intersection Observer
        // ============================================
        if ('IntersectionObserver' in window) {
            const lazyElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });

            lazyElements.forEach(element => {
                observer.observe(element);
            });
        }

        // ============================================
        // COUNTER ANIMATION
        // ============================================
        const animateCounters = () => {
            const counters = document.querySelectorAll('.stat-value');
            
            counters.forEach(counter => {
                const target = counter.innerText;
                const hasPlus = target.includes('+');
                const hasPercent = target.includes('%');
                const hasDollar = target.includes('$');
                const hasB = target.includes('B');
                
                let numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
                
                if (counter.dataset.animated) return;
                
                counter.dataset.animated = true;
                let current = 0;
                const increment = numericValue / 50;
                const duration = 2000;
                const stepTime = duration / 50;

                const updateCounter = () => {
                    current += increment;
                    if (current < numericValue) {
                        let displayValue = current.toFixed(1);
                        
                        if (hasDollar) displayValue = '$' + displayValue;
                        if (hasB) displayValue += 'B';
                        if (hasPlus) displayValue += '+';
                        if (hasPercent) displayValue = current.toFixed(1) + '%';
                        
                        counter.innerText = displayValue;
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCounter();
            });
        };

        // Trigger counter animation when stats are visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            statsObserver.observe(heroStats);
        }

        // ============================================
        // PARALLAX EFFECT FOR ORBS
        // ============================================
        let ticking = false;

        document.addEventListener('mousemove', (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const orbs = document.querySelectorAll('.floating-orb');
                    const x = e.clientX / window.innerWidth;
                    const y = e.clientY / window.innerHeight;

                    orbs.forEach((orb, index) => {
                        const speed = (index + 1) * 20;
                        const xMove = (x - 0.5) * speed;
                        const yMove = (y - 0.5) * speed;
                        orb.style.transform = `translate(${xMove}px, ${yMove}px)`;
                    });

                    ticking = false;
                });

                ticking = true;
            }
        });

        // ============================================
        // ACTIVE NAV LINK ON SCROLL
        // ============================================
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + current) {
                    link.style.color = 'var(--accent-primary)';
                }
            });
        });

        // ============================================
        // PRELOAD CRITICAL RESOURCES
        // ============================================
        const preloadResources = () => {
            const fontLinks = [
                'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap'
            ];

            fontLinks.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = href;
                document.head.appendChild(link);
            });
        };

        preloadResources();

        console.log('🚀 NexusChain - Web3 & Blockchain Landing Page Loaded Successfully!');
