// Beyond Code Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.close-menu');
    
    if (hamburgerIcon && mobileMenu && closeButton) {
        hamburgerIcon.addEventListener('click', function() {
            mobileMenu.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
        
        closeButton.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
    }

    // Tab functionality for hobbies
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.hobby-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all content sections
            contents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show corresponding content
            const targetContent = document.getElementById(tab.dataset.tab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Check if we're on mobile and scroll tab into view
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }, 100);
            }
        });
    });
    
    // Map markers interaction
    const mapMarkers = document.querySelectorAll('.map-marker');
    const countryName = document.getElementById('country-name');
    const countryDesc = document.getElementById('country-desc');
    
    if (mapMarkers.length > 0 && countryName && countryDesc) {
        const countryInfo = {
            'USA': 'Home to some of the most diverse landscapes and my favorite hiking trails in New Hampshire!',
            'Italy': 'Explored Roman ruins and mastered authentic pasta making in a small village outside Florence.',
            'Japan': 'Experienced the perfect blend of tradition and technology, and ate my weight in ramen!',
            'Australia': 'Dived in the Great Barrier Reef and learned to surf on the Gold Coast.',
            'Korea': 'Immersed in K-culture and discovered incredible street food in Seoul.'
        };
        
        mapMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                const country = marker.dataset.country;
                countryName.textContent = country;
                countryDesc.textContent = countryInfo[country];
                
                // Reset all markers
                mapMarkers.forEach(m => {
                    m.style.background = 'var(--accent)';
                    m.style.width = '16px';
                    m.style.height = '16px';
                });
                
                // Highlight selected marker
                marker.style.background = 'var(--primary)';
                marker.style.width = '20px';
                marker.style.height = '20px';
            });
            
            // Make markers larger on touch devices for better usability
            if ('ontouchstart' in window) {
                marker.style.width = '24px';
                marker.style.height = '24px';
            }
        });
        
        // Trigger a click on the first marker by default
        if (mapMarkers[0]) {
            setTimeout(() => {
                mapMarkers[0].click();
            }, 500);
        }
    }
    
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    
    function animateCounter(counter) {
        const target = parseInt(counter.dataset.count);
        const duration = window.innerWidth <= 480 ? 1000 : 2000; // Faster on mobile
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if(current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // Set up Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // Quiz card flip animation
    const quizCards = document.querySelectorAll('.quiz-card');
    
    quizCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        
        // Add touch support
        card.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent default touch behavior
            this.classList.toggle('flipped');
        });
    });
    
    // Add animation to wheel segments
    const wheelSegments = document.querySelectorAll('.wheel-segment');
    
    wheelSegments.forEach(segment => {
        segment.addEventListener('mouseenter', () => {
            // Highlight current segment
            segment.style.filter = 'brightness(1.2)';
            
            // Show category info
            const category = segment.dataset.category;
            const wheelCenter = document.querySelector('.wheel-center');
            if (wheelCenter) {
                wheelCenter.innerHTML = `<span>${category}</span>`;
                wheelCenter.style.transform = 'translate(-50%, -50%) scale(1.1)';
                wheelCenter.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }
        });
        
        segment.addEventListener('mouseleave', () => {
            // Reset effects
            segment.style.filter = 'none';
            
            const wheelCenter = document.querySelector('.wheel-center');
            if (wheelCenter) {
                wheelCenter.innerHTML = '<span>Balance</span>';
                wheelCenter.style.transform = 'translate(-50%, -50%)';
                wheelCenter.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Add touch support for wheel segments
        segment.addEventListener('touchstart', function(e) {
            e.preventDefault();
            
            // Get all segments
            const allSegments = document.querySelectorAll('.wheel-segment');
            
            // Reset all segments
            allSegments.forEach(s => {
                s.style.filter = 'none';
            });
            
            // Highlight current segment
            this.style.filter = 'brightness(1.2)';
            
            // Show category info
            const category = this.dataset.category;
            const wheelCenter = document.querySelector('.wheel-center');
            if (wheelCenter) {
                wheelCenter.innerHTML = `<span>${category}</span>`;
                wheelCenter.style.transform = 'translate(-50%, -50%) scale(1.1)';
                wheelCenter.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.style.filter = 'none';
                if (wheelCenter) {
                    wheelCenter.innerHTML = '<span>Balance</span>';
                    wheelCenter.style.transform = 'translate(-50%, -50%)';
                    wheelCenter.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                }
            }, 2000);
        });
    });
    
    // Add touch support for art/gift showcase
    const showcase = document.querySelector('.art-gift-showcase');
    if (showcase) {
        showcase.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const container = this.querySelector('.showcase-container');
            if (container) {
                // Toggle rotation
                if (container.style.transform === 'rotateY(180deg)') {
                    container.style.transform = 'rotateY(0deg)';
                } else {
                    container.style.transform = 'rotateY(180deg)';
                }
            }
        });
    }
    
    // Animate quote section on scroll
    const quoteSection = document.querySelector('.inspiring-quote-section');
    if (quoteSection) {
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    // Animate the decorative lines
                    const decorations = entry.target.querySelectorAll('.quote-decoration');
                    decorations.forEach(el => {
                        el.style.width = window.innerWidth <= 768 ? '50px' : '100px';
                    });
                    
                    // Animate the quote text
                    const blockquote = entry.target.querySelector('blockquote');
                    if (blockquote) {
                        blockquote.style.opacity = '1';
                        blockquote.style.transform = 'translateY(0)';
                    }
                    
                    // Animate the attribution
                    const attribution = entry.target.querySelector('.quote-attribution');
                    if (attribution) {
                        attribution.style.opacity = '1';
                    }
                }
            });
        }, { threshold: 0.5 });
        
        quoteObserver.observe(quoteSection);
    }
    
    // Animate the volunteer hours bar on scroll
    // Animate the volunteer hours bar on scroll
    const volunteerHours = document.querySelector('.volunteer-hours');
    if (volunteerHours) {
        const hoursObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const hoursFill = entry.target.querySelector('.hours-fill');
                    if(hoursFill) {
                        // Set the height to 0 first to ensure animation works
                        hoursFill.style.height = '0%';
                        
                        // Trigger animation after a small delay
                        setTimeout(() => {
                            hoursFill.style.height = '80%';
                        }, 300);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        hoursObserver.observe(volunteerHours);
    }
    
    // Add animation to initiatives cards
    const initiativesGrid = document.querySelector('.initiatives-grid');
    if (initiativesGrid) {
        const initiativeCards = initiativesGrid.querySelectorAll('.initiative-card');
        initiativeCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `all 0.3s ease ${index * 0.1}s`;
        });
        
        const initiativesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.initiative-card');
                    cards.forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }
            });
        }, { threshold: 0.2 });
        
        initiativesObserver.observe(initiativesGrid);
    }
    
    // Love items animation
    const loveItems = document.querySelectorAll('.love-item');
    loveItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.3s ease ${index * 0.05}s`;
    });
    
    const loveWall = document.querySelector('.love-wall');
    if (loveWall) {
        const loveWallObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    loveItems.forEach(item => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }
            });
        }, { threshold: 0.2 });
        
        loveWallObserver.observe(loveWall);
    }
    
    // Improve scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('show')) {
                        mobileMenu.classList.remove('show');
                        document.body.style.overflow = '';
                    }
                    
                    // Account for fixed header
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add intersection observers for all sections to animate on scroll
    const sections = document.querySelectorAll('section, .hero-content');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add hover effects for recipe book on touch devices
    const recipeBook = document.querySelector('.recipe-book');
    if (recipeBook && 'ontouchstart' in window) {
        recipeBook.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.toggle('touch-hover');
            
            if (this.classList.contains('touch-hover')) {
                this.style.transform = 'rotateX(5deg) rotateY(-20deg)';
                const rightPage = this.querySelector('.recipe-page.right');
                if (rightPage) {
                    rightPage.style.transform = 'rotateY(-5deg)';
                }
            } else {
                this.style.transform = '';
                const rightPage = this.querySelector('.recipe-page.right');
                if (rightPage) {
                    rightPage.style.transform = '';
                }
            }
        });
    }
    
    // Enhance accessibility by adding keyboard navigation for tabs
    tabs.forEach(tab => {
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('role', 'button');
        
        tab.addEventListener('keydown', function(e) {
            // Activate on Enter or Space key
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add keyboard support for quiz cards
    quizCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Click to reveal answer');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
    });
    
    // Enhance the bucket list checkboxes
    const bucketCheckboxes = document.querySelectorAll('.bucket-item input[type="checkbox"]');
    bucketCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.7';
            } else {
                label.style.textDecoration = 'none';
                label.style.opacity = '1';
            }
        });
        
        // Initialize styles based on checked state
        if (checkbox.checked) {
            const label = checkbox.nextElementSibling;
            if (label) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.7';
            }
        }
    });
    
    // Add smooth scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '100px';
    scrollToTopBtn.style.right = '30px';
    scrollToTopBtn.style.width = '40px';
    scrollToTopBtn.style.height = '40px';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.backgroundColor = 'var(--primary)';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.zIndex = '99';
    scrollToTopBtn.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Add hover effects to scrollToTopBtn
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--primary-dark)';
        this.style.transform = 'translateY(-3px)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary)';
        this.style.transform = 'translateY(0)';
    });
    
    // Enable page transition effects when loading the page
    window.addEventListener('load', function() {
        // First fade in the header
        const hero = document.querySelector('.beyond-code-hero');
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'translateY(20px)';
            hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }, 200);
        }
        
        // Then animate the hobby explorer
        const hobbyExplorer = document.querySelector('.hobby-explorer');
        if (hobbyExplorer) {
            hobbyExplorer.style.opacity = '0';
            hobbyExplorer.style.transform = 'translateY(30px)';
            hobbyExplorer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                hobbyExplorer.style.opacity = '1';
                hobbyExplorer.style.transform = 'translateY(0)';
            }, 500);
        }
    });
    
    // Add lazy loading for all images
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
    
    // Preload hover states for smoother experience
    setTimeout(() => {
        const stylesheet = document.createElement('style');
        stylesheet.textContent = `
            .tab:hover,
            .service-card:hover,
            .project-card:hover,
            .quiz-card:hover .quiz-front,
            .love-item:hover {
                transition: all 0.2s ease;
            }
        `;
        document.head.appendChild(stylesheet);
    }, 2000);
});