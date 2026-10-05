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
    'main > .page-hero .hero-box, main > .hero .hero-box .hero-standalone > div:first-child, main > .hero .hero-box .feature-band > *, main > .section .container > .heading, main > .section .container > .grid-2 > *, main > .section .container > .grid-3 > *, main > .section .container > .grid-4 > *, main > .section .container.grid-2 > *, main > .section .container.grid-3 > *, main > .section .container.grid-4 > *, main > .section .container > .feature-band > *, main > .section .container > .text-columns > *, main > .section .container.text-columns > *, main > .section .container > .value-grid > *, main > .section .container > .team-grid > *, main > .section .container > .form-grid > *, main > .section .container.form-grid > *, main > .contact-list > *, main > .section .container > .project-grid > *, main > .section .container.project-grid > *, main > .section .container > .gallery-grid > *, main > .section .container.gallery-grid > *, main > .section .container > .process > *, main > .section .container > .stats, main > .section .container > .quote-box'
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

  const tiltCards = document.querySelectorAll(
    'main .card, main .feature-card, main .value-card, main .person, main .project-card, main .gallery-item, main .process-step'
  );
  const raisedSurfaces = document.querySelectorAll(
    'main .form-card, main .contact-item, main .stats, main .quote-box'
  );

  tiltCards.forEach((card) => card.classList.add('is-3d-card'));
  raisedSurfaces.forEach((surface) => surface.classList.add('is-3d-surface'));

  if (supportsTilt) {
    tiltCards.forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
        const verticalPosition = (event.clientY - bounds.top) / bounds.height;

        card.style.setProperty('--card-tilt-x', `${(0.5 - verticalPosition) * 5}deg`);
        card.style.setProperty('--card-tilt-y', `${(horizontalPosition - 0.5) * 7}deg`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--card-tilt-x');
        card.style.removeProperty('--card-tilt-y');
      });
    });
  }

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
