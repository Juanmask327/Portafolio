// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Scroll effects ──
const navbar       = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.style.padding = '0.6rem 2.5rem';
    scrollTopBtn.classList.add('visible');
  } else {
    navbar.style.padding = '1rem 2.5rem';
    scrollTopBtn.classList.remove('visible');
  }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Container Scroll Animation (Aceternity style) ──
const csaContainer = document.getElementById('csaContainer');
const scrollReveal = document.getElementById('scroll-reveal');

function lerp(a, b, t) { return a + (b - a) * t; }

function updateContainerScroll() {
  if (!csaContainer || !scrollReveal) return;

  const rect = scrollReveal.getBoundingClientRect();
  const windowH = window.innerHeight;

  // progress: 0 when section top is at bottom of viewport, 1 when at top
  const raw = 1 - (rect.top / windowH);
  const progress = Math.max(0, Math.min(1, raw));

  // Ease the progress
  const eased = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  const rotateX = lerp(22, 0, eased);
  const scale   = lerp(0.88, 1, eased);
  const opacity = lerp(0.5, 1, eased);

  csaContainer.style.transform = `rotateX(${rotateX}deg) scale(${scale})`;
  csaContainer.style.opacity   = opacity;
}

window.addEventListener('scroll', updateContainerScroll, { passive: true });
updateContainerScroll();

// ── Intersection Observer for fade-in ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Counter animation ──
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseFloat(el.dataset.target);
      const start  = el.dataset.start ? parseFloat(el.dataset.start) : 0;
      const isFloat = el.dataset.target.includes('.');
      let current  = start;
      const steps  = 40;
      const step   = (target - start) / steps;
      let frame    = 0;

      const timer = setInterval(() => {
        frame++;
        current = Math.min(current + step, target);
        if (isFloat) {
          el.textContent = current.toFixed(1) + '+';
        } else {
          el.textContent = Math.floor(current) + '+';
        }
        if (frame >= steps) {
          el.textContent = target + '+';
          clearInterval(timer);
        }
      }, 40);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── Active nav link on scroll ──
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navAnchors.forEach(a => {
    const href = a.getAttribute('href');
    const matches = href === '#' + current;
    a.classList.toggle('active', matches);
    a.style.color = '';
  });
}, { passive: true });

// ── Contact form ──
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const asunto  = document.getElementById('asunto').value || 'Contacto desde portafolio';
  const mensaje = document.getElementById('mensaje').value.trim();
  const btn     = this.querySelector('button[type="submit"]');

  // Disable button and show status
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  // Send AJAX request via FormSubmit
  fetch("https://formsubmit.co/ajax/Juanmabennitez2008@gmail.com", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      Nombre: nombre,
      Email: email,
      Asunto: asunto,
      Mensaje: mensaje
    })
  })
  .then(response => {
    if (response.ok) {
      this.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } else {
      throw new Error('Error al enviar');
    }
  })
  .catch(error => {
    alert('Hubo un problema al enviar el mensaje. Por favor, escríbeme directamente a: Juanmabennitez2008@gmail.com');
    btn.disabled = false;
    btn.textContent = 'Enviar mensaje';
  });
});

// ── Modal helpers ──
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

['firmaModal', 'firmaModal2', 'codeModal', 'validacionModal'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('click', e => {
    if (e.target === el) closeModal(id);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['firmaModal', 'firmaModal2', 'codeModal', 'validacionModal'].forEach(id => {
      if (document.getElementById(id).classList.contains('open')) closeModal(id);
    });
  }
});

// ── Modal functions (called from inline HTML) ──
function openFirmaModal()       { openModal('firmaModal'); }
function closeFirmaModal()      { closeModal('firmaModal'); }
function openFirmaModal2()      { openModal('firmaModal2'); }
function closeFirmaModal2()     { closeModal('firmaModal2'); }
function openCodeModal()        { openModal('codeModal'); }
function closeCodeModal()       { closeModal('codeModal'); }
function openValidacionModal()  { openModal('validacionModal'); }
function closeValidacionModal() { closeModal('validacionModal'); }

// ── Copy code ──
function copyCode() {
  const text = document.getElementById('codeContent').innerText;
  const btn  = document.getElementById('copyBtn');
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copiado';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copiar código';
      btn.classList.remove('copied');
    }, 2000);
  });
}
