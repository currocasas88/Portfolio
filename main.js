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

// Resume modal
function openR() { document.getElementById('rov').classList.add('open'); }
function closeR() { document.getElementById('rov').classList.remove('open'); }

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeR(); closeLB(); }
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
