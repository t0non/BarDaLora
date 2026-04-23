// Mobile Menu Logic
const menuToggle = document.querySelector('.menu-toggle');
const navWrapper = document.querySelector('.nav-wrapper');
const navLinksItems = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navWrapper.classList.toggle('active');
    document.body.style.overflow = navWrapper.classList.contains('active') ? 'hidden' : 'auto';
});

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navWrapper.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Premium Scroll Reveal System
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, no need to observe anymore
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, observerOptions);

document.querySelectorAll('[data-reveal]').forEach((el) => {
    revealObserver.observe(el);
});

// Testimonials Infinite Slider Logic
const track = document.getElementById('testimonial-track');
if (track) {
    // Strip data-reveal to bypass IntersectionObserver invisibility bug on flex scrolling items
    const cards = track.querySelectorAll('.card');
    cards.forEach(card => card.removeAttribute('data-reveal'));

    // Clone all cards internally so CSS animation can loop seamlessly
    const cardsHtml = track.innerHTML;
    track.innerHTML += cardsHtml;
}

// Global Premium Smooth Scroll (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: true // Ensure mobile smooth delay as requested
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Scroll-Linked Plate Rotation
lenis.on('scroll', (e) => {
    const plate1 = document.getElementById('rot-plate');
    if(plate1) plate1.style.transform = `scale(1) rotate(${e.animatedScroll * 0.12}deg)`;

    const plate2 = document.getElementById('rot-plate-2');
    if(plate2) plate2.style.transform = `scale(1) rotate(${-e.animatedScroll * 0.10}deg)`;

    const plate3 = document.getElementById('rot-plate-3');
    if(plate3) plate3.style.transform = `scale(1) rotate(${e.animatedScroll * 0.11}deg)`;
});

// Smooth Scroll for Navigation
document.querySelectorAll('.nav-links a, .footer-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only smooth scroll for internal links
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                if (this.parentElement.parentElement.classList.contains('nav-links')) {
                    this.classList.add('active');
                }
            }
        }
    });
});

// Dynamic Header Style on Scroll
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.padding = '0.8rem 0';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        header.style.padding = '1.2rem 0';
    }
});

// Video Audio Toggle Interaction (Testimonials & Instagram Reals)
document.querySelectorAll('.vt-video-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        const video = wrapper.querySelector('video');
        const muteState = wrapper.querySelector('.mute-state');
        
        if (video) {
            video.muted = !video.muted;
            
            // Visual toggle behavior
            if (muteState) {
                if (video.muted) {
                    muteState.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
                } else {
                    muteState.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
                }
            }
        }
    });
});
// Gallery Slider (Swiper) Initialization
const locationSwiper = new Swiper('.location-swiper', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    speed: 3500, // Faster than 6000
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    grabCursor: true,
    mousewheel: false,
    keyboard: true,
    // Free mode isn't compatible with delay: 0 for continuous effect usually,
    // but Swiper 11 handles linear autoplay well with speed and delay 0.
});
// FAQ Accordion Logic
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        // Close other items if desired
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
        
        faqItem.classList.toggle('active');
    });
});
