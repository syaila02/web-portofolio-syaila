/*
*   File: script.js
*   Description: Custom JavaScript for Syaila Zahwa's personal portfolio website.
*   Author: Gemini CLI
*   Date: 2026-02-12
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Navbar Scroll Transparency ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Section Scroll Animations (Intersection Observer) ---
    const sections = document.querySelectorAll('section');

    const sectionObserverOptions = {
        root: null, // viewport
        threshold: 0.1, // 10% of section visible
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                // observer.unobserve(entry.target); // Uncomment if you want animation to run only once
            } else {
                // Optional: remove section-visible if you want sections to hide again when scrolled out
                // entry.target.classList.remove('section-visible');
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        section.classList.add('section-hidden'); // Add hidden class initially
        sectionObserver.observe(section);
    });

    // --- Skill Progress Bar Animations (Intersection Observer) ---
    const skillProgressBars = document.querySelectorAll('.progress-bar');

    const progressBarObserverOptions = {
        root: null,
        threshold: 0.7, // 70% of the progress bar container visible
    };

    const progressBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.dataset.progress;
                progressBar.style.width = `${progress}%`;
                observer.unobserve(progressBar); // Stop observing after animation
            }
        });
    }, progressBarObserverOptions);

    skillProgressBars.forEach(bar => {
        progressBarObserver.observe(bar);
    });

    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            // Save preference to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }



});
