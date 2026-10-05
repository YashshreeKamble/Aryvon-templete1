document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const revealTargets = document.querySelectorAll(
    '.hero-standalone > div:first-child, .feature-card, .section .heading, .section .grid-3 > .card, .section .grid-4 > .card, .section .stats, .section .quote-box'
  );
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealTargets.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.body.classList.add('motion-ready');
    revealTargets.forEach((target) => {
      target.setAttribute('data-reveal', '');
      revealObserver.observe(target);
    });
  }

  const brandScene = document.querySelector('.brand-scene');
  const supportsTilt = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches;

  if (brandScene && supportsTilt) {
    brandScene.addEventListener('pointermove', (event) => {
      const bounds = brandScene.getBoundingClientRect();
      const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
      const verticalPosition = (event.clientY - bounds.top) / bounds.height;

      brandScene.style.setProperty('--scene-tilt-x', `${(0.5 - verticalPosition) * 7}deg`);
      brandScene.style.setProperty('--scene-tilt-y', `${(horizontalPosition - 0.5) * 9}deg`);
      brandScene.style.setProperty('--scene-glow-x', `${horizontalPosition * 100}%`);
      brandScene.style.setProperty('--scene-glow-y', `${verticalPosition * 100}%`);
      brandScene.classList.add('is-pointer-tilting');
    });

    brandScene.addEventListener('pointerleave', () => {
      brandScene.style.removeProperty('--scene-tilt-x');
      brandScene.style.removeProperty('--scene-tilt-y');
      brandScene.style.removeProperty('--scene-glow-x');
      brandScene.style.removeProperty('--scene-glow-y');
      brandScene.classList.remove('is-pointer-tilting');
    });
  }
});
