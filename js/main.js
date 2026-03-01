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

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formFeedback.textContent = 'Por favor, informe um e-mail válido.';
        formFeedback.className = 'form__feedback error';
        return;
      }

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

  // ---------- Staggered Reveal for Cards ----------
  var cards = document.querySelectorAll('.card.reveal');
  cards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.1) + 's';
  });

  var diferenciais = document.querySelectorAll('.diferencial.reveal');
  diferenciais.forEach(function (item, index) {
    item.style.transitionDelay = (index * 0.1) + 's';
  });

  // ---------- Sketch / Blueprint Animation ----------
  var sketchCanvas = document.getElementById('sketch-canvas');

  if (sketchCanvas) {
    var stages = document.querySelectorAll('.sketch-stage');
    var animStarted = false;

    // Stage activation delays (in seconds)
    var stageDelays = [0, 2, 5, 7.5];

    function startSketchAnimation() {
      if (animStarted) return;
      animStarted = true;

      // Add animate class to trigger all CSS transitions
      sketchCanvas.classList.add('animate');

      // Activate stage labels
      stages.forEach(function (stage, index) {
        setTimeout(function () {
          stage.classList.add('active');
        }, stageDelays[index] * 1000);
      });
    }

    // Trigger animation when section is in view
    function checkSketchInView() {
      if (animStarted) return;
      var rect = sketchCanvas.getBoundingClientRect();
      if (rect.top < window.innerHeight - 150) {
        startSketchAnimation();
      }
    }

    window.addEventListener('scroll', checkSketchInView, { passive: true });
    checkSketchInView();
  }

  // ---------- Construction Particle System ----------
  var bgAnimContainers = document.querySelectorAll('.bg-anim');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.innerWidth <= 768;

  if (bgAnimContainers.length > 0 && !prefersReducedMotion && !isMobile) {

    var particleConfigs = [
      { cls: 'bg-particle--brick', props: { '--w': ['18px','24px','30px'], '--h': ['8px','10px','12px'] } },
      { cls: 'bg-particle--square', props: { '--size': ['10px','14px','18px'] } },
      { cls: 'bg-particle--line', props: { '--w': ['30px','40px','55px'], '--rot': ['0deg','25deg','45deg','-15deg','90deg'] } },
      { cls: 'bg-particle--angle', props: { '--size': ['16px','20px','24px'], '--rot': ['0deg','45deg','90deg','135deg'] } }
    ];

    function randomFrom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function randomBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function spawnParticles(container) {
      var count = randomBetween(4, 7);
      for (var i = 0; i < count; i++) {
        var config = randomFrom(particleConfigs);
        var particle = document.createElement('div');
        particle.className = 'bg-particle ' + config.cls;

        // Random position
        particle.style.left = randomBetween(5, 90) + '%';
        particle.style.top = randomBetween(10, 85) + '%';

        // Set CSS custom props
        var keys = Object.keys(config.props);
        for (var k = 0; k < keys.length; k++) {
          particle.style.setProperty(keys[k], randomFrom(config.props[keys[k]]));
        }

        // Randomize animation variables
        particle.style.setProperty('--duration', randomBetween(10, 22) + 's');
        particle.style.setProperty('--delay', randomBetween(0, 10) + 's');
        particle.style.setProperty('--start-y', randomBetween(10, 40) + 'px');
        particle.style.setProperty('--travel', randomBetween(40, 100) + 'px');
        particle.style.setProperty('--drift', randomBetween(-15, 15) + 'px');
        particle.style.setProperty('--spin', randomBetween(-10, 10) + 'deg');
        particle.style.setProperty('--max-opacity', (Math.random() * 0.4 + 0.3).toFixed(2));

        container.appendChild(particle);
      }
    }

    bgAnimContainers.forEach(function (container) {
      spawnParticles(container);
    });
  }

  // ---------- Pulsing Grid Squares ----------
  if (!prefersReducedMotion && !isMobile) {
    var blueprintContainers = document.querySelectorAll('.bg-anim--blueprint');

    blueprintContainers.forEach(function (container) {
      var containerRect = container.parentElement.getBoundingClientRect();
      var cols = Math.floor(containerRect.width / 60);
      var rows = Math.floor(containerRect.height / 60);
      var totalCells = cols * rows;

      // Pick 6-10 random grid cells to pulse
      var pulseCount = Math.min(randomBetween(6, 10), totalCells);
      var usedCells = {};

      for (var i = 0; i < pulseCount; i++) {
        var cellIndex;
        do {
          cellIndex = randomBetween(0, totalCells - 1);
        } while (usedCells[cellIndex]);
        usedCells[cellIndex] = true;

        var col = cellIndex % cols;
        var row = Math.floor(cellIndex / cols);

        var square = document.createElement('div');
        square.className = 'bg-anim__pulse-square';
        square.style.left = (col * 60) + 'px';
        square.style.top = (row * 60) + 'px';
        square.style.setProperty('--pulse-duration', randomBetween(3, 7) + 's');
        square.style.setProperty('--pulse-delay', (Math.random() * 8).toFixed(1) + 's');

        container.appendChild(square);
      }
    });
  }

  // ---------- Number Counter Animation ----------
  var counterValues = document.querySelectorAll('.numeros__value');
  var counterStarted = false;

  function animateCounters() {
    if (counterStarted) return;
    var numerosSection = document.querySelector('.numeros');
    if (!numerosSection) return;

    var rect = numerosSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      counterStarted = true;

      counterValues.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(step);
      });
    }
  }

  if (counterValues.length > 0) {
    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();
  }

  // ---------- FAQ Accordion ----------
  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');
    if (question) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all other items
        faqItems.forEach(function (other) {
          other.classList.remove('open');
          var otherBtn = other.querySelector('.faq__question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ---------- Custom Cursor ----------
  var cursor = document.getElementById('cursor');
  var cursorRing = document.getElementById('cursor-ring');

  if (cursor && cursorRing && !isMobile && window.matchMedia('(hover: hover)').matches) {
    var mouseX = 0, mouseY = 0;
    var ringX = 0, ringY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover states
    var hoverTargets = document.querySelectorAll('a, button, .btn, .card, .galeria__item, .faq__question');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('cursor--hover');
        cursorRing.classList.add('cursor-ring--hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('cursor--hover');
        cursorRing.classList.remove('cursor-ring--hover');
      });
    });

    // Text hover for section titles
    var textTargets = document.querySelectorAll('.section__title, .hero__title, .cta__title');
    textTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('cursor--text');
        cursorRing.classList.add('cursor-ring--text');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('cursor--text');
        cursorRing.classList.remove('cursor-ring--text');
      });
    });

    // Hide system cursor
    document.body.style.cursor = 'none';
    hoverTargets.forEach(function (el) { el.style.cursor = 'none'; });
    textTargets.forEach(function (el) { el.style.cursor = 'none'; });
  }

  // ---------- Scroll Progress Bar ----------
  var scrollProgress = document.getElementById('scroll-progress');

  if (scrollProgress) {
    function updateScrollProgress() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var percent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = percent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

  // ---------- Hero Split Text Animation ----------
  var splitWords = document.querySelectorAll('.split-word');

  if (splitWords.length > 0) {
    splitWords.forEach(function (word, index) {
      setTimeout(function () {
        word.classList.add('visible');
      }, 300 + (index * 120));
    });
  }

  // ---------- Magnetic Buttons ----------
  var magneticBtns = document.querySelectorAll('.btn--magnetic');

  if (magneticBtns.length > 0 && !isMobile) {
    magneticBtns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.3) + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
        setTimeout(function () {
          btn.style.transition = '';
        }, 400);
      });
    });
  }

  // ---------- Parallax Watermarks on Scroll ----------
  var watermarks = document.querySelectorAll('[data-parallax]');

  if (watermarks.length > 0 && !isMobile && !prefersReducedMotion) {
    function updateParallax() {
      var scrollY = window.pageYOffset;

      watermarks.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax'));
        var rect = el.parentElement.getBoundingClientRect();
        var offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = 'translateY(calc(-50% + ' + offset + 'px))';
      });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  // ---------- Casa.html: Photo Gallery Lightbox ----------
  var galleryItems = document.querySelectorAll('.casa-galeria__item');
  var lightbox = document.getElementById('lightbox');

  if (galleryItems.length > 0 && lightbox) {
    var lightboxClose = lightbox.querySelector('.lightbox__close');
    var lightboxContent = lightbox.querySelector('.lightbox__content');

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var clone = item.querySelector('.image-placeholder').cloneNode(true);
        lightboxContent.innerHTML = '';
        lightboxContent.appendChild(clone);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', function () {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

})();
