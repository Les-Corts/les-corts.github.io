document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Header scroll class
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('is-active');
    });
  }

  // Close mobile nav when clicking outside
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileNavToggle.classList.remove('is-active');
    }
  });

  // Smooth scroll for navigation and other links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile nav when a nav link is clicked
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileNavToggle.classList.remove('is-active');
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll reveal animations
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });
  
  fadeElements.forEach(el => {
    fadeInObserver.observe(el);
  });

  // Counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'));
        let count = 0;
        const speed = 2000 / countTo;
        
        const updateCount = setInterval(() => {
          count++;
          target.textContent = count;
          
          if (count === countTo) {
            clearInterval(updateCount);
          }
        }, speed);
        
        countObserver.unobserve(target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  statNumbers.forEach(el => {
    countObserver.observe(el);
  });

  // Projects/Portfolio hover effect
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.project-overlay').style.opacity = '1';
      this.querySelector('.project-overlay').style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.project-overlay').style.opacity = '0';
      this.querySelector('.project-overlay').style.transform = 'translateY(20px)';
    });
  });

  // Testimonials slider/carousel
  try {
    new Swiper('.testimonials-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      slidesPerGroup: 2, // Show next 2 testimonials on pagination click
      loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        992: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        }
      },
      on: {
        init: function () {
          // Set equal height for all testimonial items
          setTimeout(() => {
            const items = document.querySelectorAll('.testimonial-item');
            let maxHeight = 0;
            
            items.forEach(item => {
              const height = item.offsetHeight;
              maxHeight = Math.max(maxHeight, height);
            });
            
            items.forEach(item => {
              item.style.height = `${maxHeight}px`;
            });
          }, 100);
        }
      }
    });
  } catch (error) {
    console.log('Swiper not initialized: ', error);
  }

  // Form validation and submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      let isValid = true;
      const inputs = this.querySelectorAll('.form-control');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      });
      
      if (isValid) {
        // Form submission logic would go here
        // For now, just show a success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission delay
        setTimeout(() => {
          this.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          
          // Show success message
          const successDiv = document.createElement('div');
          successDiv.className = 'alert alert-success mt-3';
          successDiv.innerHTML = 'Your message has been sent successfully!';
          this.appendChild(successDiv);
          
          // Remove success message after a delay
          setTimeout(() => {
            successDiv.remove();
          }, 5000);
        }, 2000);
      }
    });
    
    // Remove invalid class when user starts typing
    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', function() {
        if (this.value.trim()) {
          this.classList.remove('is-invalid');
        }
      });
    });
  }

  // Parallax effect for background sections
  window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(el => {
      const scrollPosition = window.pageYOffset;
      const elementOffset = el.offsetTop;
      const distance = (scrollPosition - elementOffset) * 0.4;
      
      el.style.backgroundPositionY = `${distance}px`;
    });
  });

  // AOS initialization for on-scroll animations
  try {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  } catch (error) {
    console.log('AOS not initialized: ', error);
  }
  
  // Back to Top Button
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});