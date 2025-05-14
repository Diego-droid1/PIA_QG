// =====================
// 🌙 Modo Oscuro / Claro Inteligente
// =====================
const toggleModeButton = document.getElementById('toggle-mode');
const body = document.body;

// Establecer icono del botón basado en modo actual
const updateToggleIcon = () => {
    toggleModeButton.textContent = body.classList.contains('dark-mode') ? '🌞' : '🌙';
};

// Cargar preferencia del tema al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
    }
    updateToggleIcon();
    observeScrollAnimations(); // Activar animaciones si ya hay elementos en vista
});

// Alternar el modo y guardar la preferencia
toggleModeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateToggleIcon();
});

// =====================
// 📜 Scroll Suave (Mejorado)
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =====================
// 👁️‍🗨️ Animaciones en Scroll con IntersectionObserver
// =====================
function observeScrollAnimations() {
    const targets = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Mejor rendimiento
            }
        });
    }, {
        threshold: 0.2
    });

    targets.forEach(target => observer.observe(target));
}

// =====================
// 🔽 Mostrar contenido extra con animación
// =====================
const showMoreButton = document.getElementById('show-more');
const extraContent = document.getElementById('extra-content');

if (showMoreButton && extraContent) {
    showMoreButton.addEventListener('click', () => {
        const isVisible = extraContent.classList.toggle('show');
        showMoreButton.textContent = isVisible ? 'Ver menos' : 'Ver más';
        showMoreButton.setAttribute('aria-expanded', isVisible);
        extraContent.setAttribute('aria-hidden', !isVisible);
    });

    // Accesibilidad inicial
    showMoreButton.setAttribute('aria-controls', 'extra-content');
    showMoreButton.setAttribute('aria-expanded', 'false');
    extraContent.setAttribute('aria-hidden', 'true');
}

// ========== MODAL LOGIC ==========
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.querySelector('.modal-close');

// Contenido HTML para cada sección
const termsContent = `
  <h1>Términos y Condiciones</h1>
  <p><strong>Última actualización:</strong> 13 de mayo de 2025</p>
  <h2>1. Uso del Sitio</h2>
  <p>Este sitio está destinado a proporcionar información sobre el producto Flexi-Dig...</p>
  <h2>2. Propiedad Intelectual</h2>
  <p>Todos los contenidos del sitio son propiedad de Flexi-Dig...</p>
  <h2>3. Responsabilidad del Usuario</h2>
  <p>El usuario se compromete a utilizar el sitio de forma legal y ética...</p>
  <h2>4. Limitación de Responsabilidad</h2>
  <p>Flexi-Dig no se hace responsable por errores...</p>
  <h2>5. Enlaces Externos</h2>
  <p>No tenemos control sobre el contenido de sitios enlazados...</p>
`;

const privacyContent = `
  <h1>Aviso de Privacidad</h1>
  <p><strong>Última actualización:</strong> 13 de mayo de 2025</p>
  <h2>1. Responsable del Tratamiento</h2>
  <p>Flexi-Dig es responsable del uso y protección de tus datos...</p>
  <h2>2. Datos que Recopilamos</h2>
  <p>Podemos recopilar nombre, correo electrónico, información de contacto...</p>
  <h2>3. Finalidades</h2>
  <p>Usamos tus datos para contactarte, responder consultas...</p>
  <h2>4. Derechos ARCO</h2>
  <p>Puedes acceder, rectificar, cancelar u oponerte escribiendo a contacto@flexidig.com</p>
  <h2>5. Seguridad</h2>
  <p>Protegemos tu información contra accesos no autorizados...</p>
`;

// Función para abrir el modal con contenido
function openModal(contentHTML) {
    modalBody.innerHTML = contentHTML;
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

// Cerrar el modal
function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Eventos
document.getElementById('open-terms').addEventListener('click', e => {
    e.preventDefault();
    openModal(termsContent);
});

document.getElementById('open-privacy').addEventListener('click', e => {
    e.preventDefault();
    openModal(privacyContent);
});

closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

 const scrollBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('moreOptionsBtn').addEventListener('click', function() {
    var menu = document.getElementById('moreOptionsMenu');
    var isVisible = menu.style.display === 'block';

    menu.style.display = isVisible ? 'none' : 'block';
});
