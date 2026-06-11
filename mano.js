document.addEventListener('DOMContentLoaded', () => {
    // Nav smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Tracker Logic
    let reps = 0;
    let seconds = 0;
    let timerInterval = null;
    let isTracking = false;

    const repsElement = document.getElementById('repsCount');
    const timerElement = document.getElementById('timer');
    const addRepBtn = document.getElementById('addRepBtn');
    const resetBtn = document.getElementById('resetBtn');
    const startBtn = document.getElementById('startBtn');

    function formatTime(sec) {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateTimer() {
        seconds++;
        timerElement.textContent = formatTime(seconds);
    }

    function startTracker() {
        if (!isTracking) {
            isTracking = true;
            timerInterval = setInterval(updateTimer, 1000);
            document.querySelector('#tracker').scrollIntoView({ behavior: 'smooth' });
        }
    }

    startBtn.addEventListener('click', startTracker);

    addRepBtn.addEventListener('click', () => {
        if (!isTracking) startTracker();
        reps++;
        repsElement.textContent = reps;

        // Add a satisfying pop effect
        repsElement.style.transform = 'scale(1.2)';
        repsElement.style.color = '#fff';
        setTimeout(() => {
            repsElement.style.transform = 'scale(1)';
            repsElement.style.color = 'var(--accent-secondary)';
        }, 150);
    });

    resetBtn.addEventListener('click', () => {
        isTracking = false;
        clearInterval(timerInterval);
        reps = 0;
        seconds = 0;
        repsElement.textContent = reps;
        timerElement.textContent = formatTime(seconds);
    });

    // Animate cards on scroll via Intersection Observer
    const cards = document.querySelectorAll('.glass-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
