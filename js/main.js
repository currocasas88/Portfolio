// Lightbox
function openLB(img) {
  if (!img) return;
  document.getElementById('lbimg').src = img.src;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLB();
});

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.background = a.getAttribute('href') === '#' + current ? 'var(--rule)' : '';
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--ink)' : '';
  });
});

// Brummell extraction loop: photo → read → pieces land. Static (phase 2) without JS or with reduced motion.
const bmEx = document.getElementById('bm-ex');
if (bmEx && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const status = bmEx.querySelector('.bm-ex-status');
  const steps = [
    [0, 'One photo of today\'s outfit.', 1100],
    [1, 'Reading the photo.', 1600],
    [2, '5 pieces added to your wardrobe.', 4200],
  ];
  let i = 0, timer = null;
  const tick = () => {
    const [phase, text, hold] = steps[i];
    bmEx.dataset.phase = phase;
    status.textContent = text;
    i = (i + 1) % steps.length;
    timer = setTimeout(tick, hold);
  };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !timer) { i = 0; tick(); }
    else if (!e.isIntersecting && timer) { clearTimeout(timer); timer = null; }
  }, { threshold: 0.35 }).observe(bmEx);
}
