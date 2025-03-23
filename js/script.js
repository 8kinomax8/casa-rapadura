gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.defaults({
  overwrite: 'auto',
  duration: 1.2,
  ease: 'power3.out'
});

// Config GSAP
gsap.config({ force3D: true });
gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

// Optimisation mobile
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});

ScrollTrigger.defaults({
  markers: false, // À désactiver en production
  toggleActions: 'play none none reverse'
});

// Timeline pour animer la section Hero
gsap.timeline()
  .to(".hero-content h1", { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" })
  .to(".subtitle", { opacity: 1, duration: 1.5, ease: "power4.out" }, "-=1")
  .to(".discover-btn", { opacity: 1, duration: 1, ease: "power4.out" }, "-=1");

// Bouton déclenche le scroll vers la première scène cinématique
document.querySelector('.discover-btn').addEventListener('click', () => {
  gsap.to(window, {
    scrollTo: "#localisation",
    duration: 2,
    ease: "power2.inOut"
  });
});

// Affichage de la Top Bar quand on scrolle (après 50px)
window.addEventListener('scroll', () => {
  const topbar = document.getElementById('topbar');
  if (window.scrollY > 50) {
    topbar.classList.add('visible');
  } else {
    topbar.classList.remove('visible');
  }
});

// Animations pour chaque élément des sections cinématiques et de la section en construction
gsap.utils.toArray(".cinematic h2, .cinematic p, .cinema-placeholder, .construction h2, .construction p, .progress-bar").forEach(elem => {
  ScrollTrigger.create({
    trigger: elem,
    start: "top 80%",
    onEnter: () => gsap.to(elem, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }),
    once: true
  });
});

// Ajoute des animations au scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Ajouter tabindex pour accessibilité
  document.querySelectorAll('.discover-btn, .back-btn').forEach(btn => {
    btn.setAttribute('tabindex', '0');
  });
});
// Bouton pour remonter en haut
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 350) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  gsap.to(window, {
    scrollTo: 0,
    duration: 1,
    ease: "power2.inOut"
  });
});

// script.js
const langButtons = document.querySelectorAll('.lang-btn');
const langElements = document.querySelectorAll('[data-lang]');

// Détection de la langue
function detectLanguage() {
  const browserLang = navigator.language.slice(0, 2);
  return ['fr', 'en', 'pt'].includes(browserLang) ? browserLang : 'fr';
}

// Chargement initial
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('siteLang') || detectLanguage();
  changeLanguage(savedLang);
});

// Gestion des clics
langButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedLang = button.dataset.lang;
    changeLanguage(selectedLang);
    localStorage.setItem('siteLang', selectedLang);
  });
});

function changeLanguage(lang) {
  // Mise à jour des boutons
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Traduction des éléments
  langElements.forEach(el => {
    if (el.dataset.lang === lang) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const discoverBtn = document.querySelector(".discover-btn");
  if (discoverBtn) {
    discoverBtn.addEventListener("click", showLogo);
  }
});


function showLogo() {
  const overlay = document.getElementById('logoOverlay');
  if (!overlay) {
    console.error("Erreur: #logoOverlay introuvable dans le DOM.");
    return;
  }
  
  // Afficher l'overlay et activer pointer-events pour empêcher toute interaction accidentelle
  overlay.style.display = 'flex';
  overlay.style.pointerEvents = 'auto';
  setTimeout(() => {
    overlay.style.opacity = 1;
  }, 10);

  // Déclencher le scroll vers la section localisation après 500ms (ajuste le timing si besoin)
  setTimeout(() => {
    gsap.to(window, {
      scrollTo: "#localisation",
      duration: 2,
      ease: "power2.inOut"
    });
  }, 500);

  // Après 3 secondes, masquer l'overlay
  setTimeout(() => {
    overlay.style.opacity = 0;
    // Désactiver pointer-events après la disparition
    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.style.pointerEvents = 'none';
    }, 500);
  }, 3000);
}
