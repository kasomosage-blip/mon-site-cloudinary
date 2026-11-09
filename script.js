const carousel = document.querySelector(".carousel");

if (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".card"));
    const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
    const playButton = carousel.querySelector(".carousel-play");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activeIndex = 0;
    let userPaused = false;
    let autoplayTimer;

    const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${activeIndex * 100}%)`;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            dot.classList.toggle("is-active", isActive);
            if (isActive) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });
    };

    const stopAutoplay = () => {
        window.clearInterval(autoplayTimer);
    };

    const startAutoplay = () => {
        stopAutoplay();
        if (!userPaused && !reducedMotion.matches) {
            autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1), 5000);
        }
    };

    const updateMotionPreference = () => {
        playButton.hidden = reducedMotion.matches;
        startAutoplay();
    };

    carousel.querySelectorAll(".carousel-arrow").forEach((button) => {
        button.addEventListener("click", () => {
            showSlide(activeIndex + Number(button.dataset.direction));
            startAutoplay();
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoplay();
        });
    });

    playButton.addEventListener("click", () => {
        userPaused = !userPaused;
        playButton.setAttribute("aria-pressed", String(userPaused));
        playButton.setAttribute("aria-label", userPaused ? "Reprendre le défilement" : "Mettre le défilement en pause");
        playButton.textContent = userPaused ? "Lecture" : "Pause";
        if (!userPaused) {
            startAutoplay();
        } else {
            stopAutoplay();
        }
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) {
            startAutoplay();
        }
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            showSlide(activeIndex - 1);
            startAutoplay();
        } else if (event.key === "ArrowRight") {
            showSlide(activeIndex + 1);
            startAutoplay();
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    reducedMotion.addEventListener("change", updateMotionPreference);
    updateMotionPreference();
    showSlide(activeIndex);
}
