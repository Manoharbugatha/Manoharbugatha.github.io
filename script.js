// ========== PRELOADER ==========
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000);
  }, 1500);
});

// ========== 3D BACKGROUND WITH THREE.JS ==========
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bgCanvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i += 3) {
  posArray[i] = (Math.random() - 0.5) * 30;
  posArray[i+1] = (Math.random() - 0.5) * 20;
  posArray[i+2] = (Math.random() - 0.5) * 20 - 10;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.05,
  color: 0x3b82f6,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create central glowing torus knot
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 200, 32, 3, 4);
const material = new THREE.MeshStandardMaterial({
  color: 0x8b5cf6,
  emissive: 0x3b82f6,
  emissiveIntensity: 0.5,
  metalness: 0.7,
  roughness: 0.3,
  transparent: true,
  opacity: 0.8
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Add ambient and point lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight1 = new THREE.PointLight(0x3b82f6, 1);
pointLight1.position.set(2, 3, 4);
const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.8);
pointLight2.position.set(-2, 1, 3);
scene.add(ambientLight, pointLight1, pointLight2);

camera.position.z = 5;

// Mouse movement effect
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = (event.clientY / window.innerHeight) * 2 - 1;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  torusKnot.rotation.x += 0.005;
  torusKnot.rotation.y += 0.008;
  particlesMesh.rotation.y += 0.0005;
  particlesMesh.rotation.x += 0.0003;
  
  // Smooth camera following mouse
  camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.05;
  camera.lookAt(0, 0, 0);
  
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========== TYPING ANIMATION ==========
const roles = ['QA Engineer', 'Test Automation Expert', 'UI/UX Designer', 'Quality Advocate'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed-output');

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typedElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 500);
      return;
    }
  } else {
    typedElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// ========== SCROLL REVEAL ANIMATIONS ==========
const revealElements = document.querySelectorAll('.glass-effect, .skill-card, .project-card, .timeline-item, .cert-card');

function checkScroll() {
  revealElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
  
  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-fill');
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
      const width = bar.getAttribute('data-width');
      if (width && bar.style.width !== width + '%') {
        bar.style.width = width + '%';
      }
    }
  });
}

// Set initial styles for reveal elements
revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s ease';
});

window.addEventListener('scroll', checkScroll);
checkScroll();

// ========== SCROLL PROGRESS BAR ==========
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  document.querySelector('.scroll-progress').style.width = scrollPercentage + '%';
});

// ========== PROJECT FILTERING ==========
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    // Filter projects with animation
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (filterValue === 'all' || cardCategory.includes(filterValue)) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.custom-cursor');
const cursorGlow = document.querySelector('.cursor-glow');

if (cursor && cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 4 + 'px';
    cursor.style.top = e.clientY - 4 + 'px';
    cursorGlow.style.left = e.clientX - 20 + 'px';
    cursorGlow.style.top = e.clientY - 20 + 'px';
  });
  
  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .filter-btn, .social-links a');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorGlow.style.transform = 'scale(1.5)';
      cursorGlow.style.borderColor = 'var(--accent-cyan)';
    });
    el.addEventListener('mouseleave', () => {
      cursorGlow.style.transform = 'scale(1)';
      cursorGlow.style.borderColor = 'var(--accent-blue)';
    });
  });
}

// ========== CONTACT FORM VALIDATION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');
    
    if (!name || !email || !message) {
      formMessage.innerHTML = '<span style="color: #ef4444;">Please fill in all fields!</span>';
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      formMessage.innerHTML = '<span style="color: #ef4444;">Please enter a valid email!</span>';
      return;
    }
    
    // Show success message
    formMessage.innerHTML = '<span style="color: #10b981;">Message sent successfully! I\'ll get back to you soon.</span>';
    contactForm.reset();
    
    // Clear message after 5 seconds
    setTimeout(() => {
      formMessage.innerHTML = '';
    }, 5000);
  });
}

// ========== DOWNLOAD RESUME ==========
const downloadBtn = document.getElementById('downloadResumeBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const resumeContent = `BUGATHA CHITRA NAGA MANOHAR
QA Analyst | Manual and Automation Test Engineer | UI/UX Designer

Email: manoharbugatha@gmail.com
Phone: +91 8555979128
Location: Eluru, Andhra Pradesh, India

PROFESSIONAL SUMMARY
Detail-oriented QA Analyst and Test Engineer with 2.5+ years of experience in Manual and Automation Testing of web and mobile applications. Proficient in full Software Testing Life Cycle (STLC), Agile/Scrum methodology, and defect lifecycle management using Jira and ClickUp.

TECHNICAL SKILLS
• Testing Tools: Maestro, Katalon Studio, Postman
• Testing Types: Functional, Regression, UI, Integration, System, UAT
• Automation: Mobile Flow Automation, Web/Mobile Regression
• Design Tools: Figma, Adobe Photoshop
• Project Management: Jira, ClickUp, Asana

EXPERIENCE
QA Analyst – Manual Tester | Fugen Webtech Pvt.Ltd (Dec 2023 – Present)
• Designed and executed test plans for web/mobile applications
• Automated mobile flows using Maestro, reducing regression effort by 35%
• Developed automated regression suites using Katalon Studio
• Validated REST APIs using Postman

PROJECTS
• CivilBook: Construction-based web & mobile testing
• Payment Platform Migration: Financial services data validation
• Scan-Based Application: Lifestyle mobile testing

CERTIFICATIONS
ISTQB Foundation Level, UI/UX Design Bootcamp, Agile Testing & Jira, Katalon Studio Advanced`;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'Manohar_Bugatha_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

// ========== MOBILE MENU TOGGLE ==========
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = '';
      navLinks.style.flexDirection = '';
      navLinks.style.position = '';
      navLinks.style.backgroundColor = '';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
      navLinks.style.padding = '2rem';
      navLinks.style.borderRadius = '0 0 20px 20px';
    }
  });
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const elementPosition = target.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
        navLinks.style.display = '';
      }
    }
  });
});

// ========== THEME TOGGLE ==========
let isDarkMode = true;
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.style.setProperty('--primary-dark', '#0a0f1c');
      document.documentElement.style.setProperty('--primary-light', '#0f1525');
      document.documentElement.style.setProperty('--text-primary', '#f1f5f9');
    } else {
      document.documentElement.style.setProperty('--primary-dark', '#f0f4f8');
      document.documentElement.style.setProperty('--primary-light', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#0f172a');
    }
  });
}
