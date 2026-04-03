document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-in').forEach(el => {
        animationObserver.observe(el);
    });

    // Plan Selection Logic
    const planCards = document.querySelectorAll('.plan-card');
    const ctaButton = document.getElementById('cta-planos');
    const selectedText = document.getElementById('selected-plan-text');
    let selectedPlan = null;

    // Set default plan (3 TVs - Best Value)
    const defaultPlan = document.querySelector('.plan-card[data-plan="3"]');
    if (defaultPlan) {
        defaultPlan.classList.add('selected', 'border-primary', 'ring-2', 'ring-primary/50');
        const btn = defaultPlan.querySelector('.select-btn');
        if (btn) btn.textContent = 'Selecionado';
        selectedPlan = {
            name: defaultPlan.dataset.name,
            price: defaultPlan.dataset.price,
            text: defaultPlan.dataset.text
        };
        if (ctaButton) {
            ctaButton.href = `https://wa.me/5589981250222?text=${selectedPlan.text}`;
            ctaButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        if (selectedText) {
            selectedText.textContent = `Plano selecionado: ${selectedPlan.name} - ${selectedPlan.price}`;
        }
    }

    planCards.forEach(card => {
        card.addEventListener('click', () => {
            planCards.forEach(c => {
                c.classList.remove('selected', 'border-primary', 'ring-2', 'ring-primary/50');
                const btn = c.querySelector('.select-btn');
                if (btn) btn.textContent = 'Selecionar';
            });

            card.classList.add('selected', 'border-primary', 'ring-2', 'ring-primary/50');
            const btn = card.querySelector('.select-btn');
            if (btn) btn.textContent = 'Selecionado';

            selectedPlan = {
                name: card.dataset.name,
                price: card.dataset.price,
                text: card.dataset.text
            };

            if (ctaButton) {
                ctaButton.href = `https://wa.me/5589981250222?text=${selectedPlan.text}`;
                ctaButton.classList.remove('opacity-50', 'cursor-not-allowed');
            }
            if (selectedText) {
                selectedText.textContent = `Plano selecionado: ${selectedPlan.name} - ${selectedPlan.price}`;
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

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
            link.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary');
            link.classList.add('text-slate-400', 'hover:text-white');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-slate-400', 'hover:text-white');
                link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary');
            }
        });
    });

    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function openSidebar() {
        mobileSidebar.classList.remove('-translate-x-full');
        if (sidebarOverlay) sidebarOverlay.classList.remove('hidden');
    }

    function closeSidebar() {
        mobileSidebar.classList.add('-translate-x-full');
        if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
    }

    if (menuToggle && mobileSidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openSidebar();
        });

        if (menuClose) {
            menuClose.addEventListener('click', closeSidebar);
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeSidebar);
        }

        mobileSidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }

    const marqueeSection = document.getElementById('marquee-section');
    const marqueeTrack = document.getElementById('marquee-track');

    if (marqueeSection && marqueeTrack) {
        let position = 0;
        let isDragging = false;
        let startX = 0;
        let savedPosition = 0;
        const speed = 0.5;
        const halfWidth = marqueeTrack.offsetWidth / 2;
        
        const animate = () => {
            if (!isDragging) {
                position -= speed;
                if (position <= -halfWidth) {
                    position += halfWidth;
                }
                marqueeTrack.style.transform = `translateX(${position}px)`;
            }
            requestAnimationFrame(animate);
        };
        
        animate();

        const handleStart = (x) => {
            isDragging = true;
            startX = x;
            savedPosition = position;
        };

        const handleMove = (x) => {
            if (!isDragging) return;
            const diff = x - startX;
            position = savedPosition + diff;
            marqueeTrack.style.transform = `translateX(${position}px)`;
        };

        const handleEnd = () => {
            isDragging = false;
        };

        marqueeSection.addEventListener('mousedown', (e) => {
            handleStart(e.clientX);
        });

        document.addEventListener('mousemove', (e) => {
            handleMove(e.clientX);
        });

        document.addEventListener('mouseup', handleEnd);

        marqueeSection.addEventListener('touchstart', (e) => {
            handleStart(e.touches[0].clientX);
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            handleMove(e.touches[0].clientX);
        }, { passive: true });

        document.addEventListener('touchend', handleEnd);
    }
});
