// Mobile nav toggle
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

faders.forEach((el) => observer.observe(el));

// Work card video modal
const videoModal = document.getElementById('videoModal');
const videoModalIframe = document.getElementById('videoModalIframe');
const videoModalClose = document.getElementById('videoModalClose');

function openVideoModal(vimeoId) {
  videoModalIframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&byline=0&title=0&portrait=0`;
  videoModal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeVideoModal() {
  videoModal.classList.remove('open');
  document.body.classList.remove('modal-open');
  videoModalIframe.src = '';
}

document.querySelectorAll('.work-card').forEach((card) => {
  const trigger = card.querySelector('.work-click-catcher');
  if (!trigger) return;
  trigger.addEventListener('click', () => openVideoModal(card.dataset.vimeoId));
});

if (videoModal && videoModalClose) {
  videoModalClose.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('open')) closeVideoModal();
  });
}
