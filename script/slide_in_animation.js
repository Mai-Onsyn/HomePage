function slideInAnimation(className) {
    console.log(className);

    let animationQueue = [];
    let isProcessingQueue = false;

    function initScrollAnimation() {
        const observerOptions = {
            root: null,
            threshold: 0.01,
            // rootMargin: "50px"
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animationQueue.push(entry.target);
                    observer.unobserve(entry.target);
                    processQueue();
                }
            });
        }, observerOptions);

        const targets = document.querySelectorAll(className);
        targets.forEach(target => observer.observe(target));
    }

    function processQueue() {
        if (animationQueue.length === 0 || isProcessingQueue) {
            return;
        }

        isProcessingQueue = true;

        const delayBetweenAnimations = 100;

        function next() {
            if (animationQueue.length > 0) {

                const target = animationQueue.shift();

                target.addEventListener('transitionend', function handler(event) {
                    if (event.propertyName === 'transform') {
                        target.classList.add('ready');
                        target.removeEventListener('transitionend', handler);
                    }
                });

                target.classList.add('show');

                setTimeout(next, delayBetweenAnimations);
            } else {
                isProcessingQueue = false;
            }
        }

        next();
    }

    setTimeout(() => {
        initScrollAnimation();
    }, 100);
}