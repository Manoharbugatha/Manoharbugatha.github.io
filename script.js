// ========== MOBILE MENU TOGGLE ==========
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// ========== ROLE TYPING ANIMATION ==========
const roles = ['QA Engineer', 'Test Automation Specialist', 'UI/UX Designer', 'Quality Advocate'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleElement = document.querySelector('.role-text');

function typeRole() {
  if (!roleElement) return;
  
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    roleElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500);
      return;
    }
  } else {
    roleElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 2000);
      return;
    }
  }
  setTimeout(typeRole, isDeleting ? 50 : 100);
}
typeRole();

// ========== SKILL BARS ANIMATION ON SCROLL ==========
const progressBars = document.querySelectorAll('.progress-bar');

function animateSkillBars() {
  progressBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;
    
    if (isVisible && (bar.style.width === '0px' || !bar.style.width || bar.style.width === '0%')) {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = progress + '%';
    }
  });
}

// ========== SCROLL REVEAL ANIMATION ==========
const animateElements = document.querySelectorAll('.about-card, .skill-group, .project-card, .timeline-item');

function checkScroll() {
  animateSkillBars();
  
  animateElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 50;
    
    if (isVisible) {
      element.style.opacity = '1';
    }
  });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// ========== ACTIVE NAVIGATION LINK ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    }
  });
});

// ========== CONTACT FORM VALIDATION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');
    
    if (!name || !email || !message) {
      formMessage.innerHTML = '<span style="color: #ff4444;">❌ Please fill in all fields!</span>';
      setTimeout(() => {
        formMessage.innerHTML = '';
      }, 3000);
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.innerHTML = '<span style="color: #ff4444;">❌ Please enter a valid email address!</span>';
      setTimeout(() => {
        formMessage.innerHTML = '';
      }, 3000);
      return;
    }
    
    // Simulate form submission
    formMessage.innerHTML = '<span style="color: #00ff88;">✓ Message sent successfully! I\'ll get back to you soon.</span>';
    contactForm.reset();
    
    setTimeout(() => {
      formMessage.innerHTML = '';
    }, 5000);
  });
}

// ========== DOWNLOAD RESUME PDF ==========
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Method 1: Direct download using anchor tag (works best for local files)
    const link = document.createElement('a');
    link.href = 'Manohar-QA-Resume.pdf';
    link.download = 'Manohar-QA-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloading...';
    downloadBtn.disabled = true;
    
    setTimeout(() => {
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;
    }, 2000);
  });
}

// ========== PARALLAX EFFECT ON SCROLL ==========
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 700;
  }
});

// ========== CURSOR EFFECT ==========
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-group');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursor.style.background = '#00ff88';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.background = '#00ff88';
  });
});

// ========== SCROLL PROGRESS INDICATOR ==========
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = scrollPercentage + '%';
});

// Add custom cursor styles dynamically
const style = document.createElement('style');
style.textContent = `
  .custom-cursor {
    width: 8px;
    height: 8px;
    background: #00ff88;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.2s ease;
    transform: translate(-50%, -50%);
  }
  
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00ff88, #00d4ff);
    z-index: 10001;
    transition: width 0.1s;
  }
  
  .nav-link.active {
    color: #00ff88;
  }
  
  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
  }
`;
document.head.appendChild(style);
