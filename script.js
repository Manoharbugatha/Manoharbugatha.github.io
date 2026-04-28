/* =====================================================
   MANOHAR QA PORTFOLIO — script.js
   ===================================================== */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Hamburger mobile menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Dark / Light mode toggle ── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

// Persist preference
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);
themeIcon.className = saved === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', next);
});

/* ── Typing animation ── */
const typingEl   = document.getElementById('typingText');
const typingTexts = [
  'QA Analyst & Test Engineer',
  'Manual & Automation Tester',
  'UI/UX Design Enthusiast',
  'Quality-Driven Developer',
];
let tIdx = 0, cIdx = 0, deleting = false, typingPaused = false;

function type() {
  if (typingPaused) return;
  const word = typingTexts[tIdx];
  if (!deleting) {
    typingEl.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; typingPaused = true; setTimeout(() => { typingPaused = false; type(); }, 1800); return; }
    setTimeout(type, 70);
  } else {
    typingEl.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % typingTexts.length;
      typingPaused = true;
      setTimeout(() => { typingPaused = false; type(); }, 400);
      return;
    }
    setTimeout(type, 35);
  }
}
type();

/* ── Reveal on scroll (IntersectionObserver) ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Animated progress bars ── */
const barFills = document.querySelectorAll('.bar__fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.w + '%';
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
barFills.forEach(b => barObserver.observe(b));

/* ── Animated stat counters ── */
const statNums = document.querySelectorAll('.stat-num');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const target = parseFloat(el.dataset.target);
      const isFloat = target % 1 !== 0;
      const duration = 1500;
      const step = 16;
      const totalSteps = Math.ceil(duration / step);
      let current = 0;
      const increment = target / totalSteps;

      const tick = () => {
        current = Math.min(current + increment, target);
        el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
        if (current < target) requestAnimationFrame(tick);
        else el.textContent = isFloat ? target.toFixed(1) : target;
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => countObserver.observe(el));

/* ── Project filtering ── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cats = (card.dataset.category || '').split(' ');
      const show = filter === 'all' || cats.includes(filter);
      card.style.transition = 'all 0.35s cubic-bezier(0.4,0,0.2,1)';
      if (show) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'none';
          });
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => card.classList.add('hidden'), 300);
      }
    });
  });
});

/* ── Contact form validation ── */
const form          = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');

function validate(id, errorId, test, msg) {
  const el  = document.getElementById(id);
  const err = document.getElementById(errorId);
  if (!test(el.value.trim())) {
    el.classList.add('error');
    err.textContent = msg;
    return false;
  }
  el.classList.remove('error');
  err.textContent = '';
  return true;
}

function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function validateAll() {
  const n = validate('name',    'nameError',    v => v.length >= 2,   'Please enter your name (min 2 chars).');
  const e = validate('email',   'emailError',   v => isEmail(v),      'Please enter a valid email address.');
  const s = validate('subject', 'subjectError', v => v.length >= 3,   'Subject must be at least 3 characters.');
  const m = validate('message', 'messageError', v => v.length >= 10,  'Message must be at least 10 characters.');
  return n && e && s && m;
}

// Live validation on blur
['name','email','subject','message'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('blur', () => {
    const errId = id + 'Error';
    if (id === 'name')    validate(id, errId, v => v.length >= 2,  'Please enter your name (min 2 chars).');
    if (id === 'email')   validate(id, errId, v => isEmail(v),     'Please enter a valid email address.');
    if (id === 'subject') validate(id, errId, v => v.length >= 3,  'Subject must be at least 3 characters.');
    if (id === 'message') validate(id, errId, v => v.length >= 10, 'Message must be at least 10 characters.');
  });
  el.addEventListener('input', () => { if (el.classList.contains('error')) el.classList.remove('error'); });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateAll()) return;

  // Simulate send (in production: replace with fetch to backend / EmailJS / Formspree)
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    formSuccess.classList.add('show');
    form.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

/* ── Active nav link highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObserver.observe(s));
