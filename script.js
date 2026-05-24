document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Download button custom behavior
    const downloadBtn = document.getElementById('download-btn');
    const guideSection = document.getElementById('installation-guide');
    
    if (downloadBtn && guideSection) {
        downloadBtn.addEventListener('click', (e) => {
            // We don't use e.preventDefault() here because we want the download 
            // (triggered by the href="glyphe-v1.3.0.apk") to happen natively.
            
            // Wait a tiny bit to ensure the browser registers the download intent,
            // then smoothly scroll down to the installation guide to explain the next steps.
            setTimeout(() => {
                guideSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        });
    }

    // Optional: Add simple intersection observer to trigger animations on scroll
    // (If the sections are further down the page and we want them to slide up when visible)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Pause animations initially if they are below the fold
    // (In our CSS they play immediately, but this is a progressive enhancement if we added 'animation-play-state: paused' in CSS for elements out of viewport)
    // For this simple page, CSS handles it beautifully on load.
});
