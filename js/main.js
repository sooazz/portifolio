/* ============================================
   BezerraRapoli Construtora — Main JS
   ============================================ */

(function () {
  'use strict';

  // ---------- Header Scroll Effect ----------
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ---------- Mobile Menu ----------
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- Scroll Reveal ----------
  const revealElements = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    var windowHeight = window.innerHeight;
    revealElements.forEach(function (el) {
      var elementTop = el.getBoundingClientRect().top;
      var revealPoint = 100;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('load', revealOnScroll);
  revealOnScroll();

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerOffset = 80;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- Active Nav Link on Scroll ----------
  var sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    var scrollY = window.pageYOffset;

    sections.forEach(function (section) {
      var sectionHeight = section.offsetHeight;
      var sectionTop = section.offsetTop - 120;
      var sectionId = section.getAttribute('id');

      var link = document.querySelector('.nav__link[href="#' + sectionId + '"]');
      if (link) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          link.style.color = '#ffffff';
        } else {
          link.style.color = '';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ---------- Phone Mask ----------
  var telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function (e) {
      var value = e.target.value.replace(/\D/g, '');
      if (value.length <= 2) {
        e.target.value = value.length ? '(' + value : '';
      } else if (value.length <= 7) {
        e.target.value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
      } else if (value.length <= 11) {
        e.target.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
      } else {
        e.target.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
      }
    });
  }

  // ---------- Contact Form ----------
  var contactForm = document.getElementById('contact-form');
  var formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nome = document.getElementById('nome').value.trim();
      var email = document.getElementById('email').value.trim();
      var telefone = document.getElementById('telefone').value.trim();
      var mensagem = document.getElementById('mensagem').value.trim();

      if (!nome || !email || !telefone || !mensagem) {
        formFeedback.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        formFeedback.className = 'form__feedback error';
        return;
      }

      // Email validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formFeedback.textContent = 'Por favor, informe um e-mail válido.';
        formFeedback.className = 'form__feedback error';
        return;
      }

      // Simulate form submission
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      setTimeout(function () {
        formFeedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        formFeedback.className = 'form__feedback success';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensagem';

        setTimeout(function () {
          formFeedback.className = 'form__feedback';
        }, 5000);
      }, 1500);
    });
  }

  // ---------- Staggered Reveal for Cards & Elements ----------
  var cards = document.querySelectorAll('.card.reveal');
  cards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.1) + 's';
  });

  var diferenciais = document.querySelectorAll('.diferencial.reveal');
  diferenciais.forEach(function (item, index) {
    item.style.transitionDelay = (index * 0.1) + 's';
  });

  // Staggered reveal for hotpage specs
  var specs = document.querySelectorAll('.hotpage__spec');
  specs.forEach(function (spec, index) {
    spec.style.transitionDelay = (index * 0.08) + 's';
  });

  // Staggered reveal for hotpage features
  var features = document.querySelectorAll('.hotpage__feature');
  features.forEach(function (feature, index) {
    feature.style.transitionDelay = (index * 0.06) + 's';
  });

  // Staggered reveal for hotpage timeline steps
  var steps = document.querySelectorAll('.hotpage__step');
  steps.forEach(function (step, index) {
    step.style.transitionDelay = (index * 0.15) + 's';
  });

})();
