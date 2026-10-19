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

// Brummell First Closet loop, ported from brummell.tech: photo → read → 5 pieces land → 2 more join →
// look 2 renders with Try-On. Static on look 2 without JS or with reduced motion.
const bmEx = document.getElementById('bm-ex');
if (bmEx && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const status = bmEx.querySelector('.bm-ex-status');
  const chip = bmEx.querySelector('.bm-chip');
  const pause = bmEx.querySelector('.bm-pause');
  const STATUS = [
    "One photo of today's outfit.",
    'Reading the photo.',
    '5 pieces added to your wardrobe.',
    '2 more pieces join them.',
    'Look 2, put together from pieces you own.',
  ];
  const SCHEDULE = [[1, 250], [2, 1400], [3, 3400], [4, 4900]];
  const CYCLE_MS = 8300;
  let timers = [], inView = false, paused = false;
  const setPhase = phase => {
    bmEx.dataset.phase = phase;
    status.textContent = STATUS[phase];
    chip.textContent = phase === 4 ? 'Look 2 · Try-On' : 'Your photo';
  };
  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  const run = () => {
    stop();
    if (!inView || paused) return;
    setPhase(0);
    timers = SCHEDULE.map(([phase, at]) => setTimeout(() => setPhase(phase), at));
    timers.push(setTimeout(run, CYCLE_MS));
  };
  pause.hidden = false;
  pause.addEventListener('click', () => {
    paused = !paused;
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-pressed', paused);
    paused ? stop() : run();
  });
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    inView ? run() : stop();
  }, { threshold: 0.35 }).observe(bmEx);
}
