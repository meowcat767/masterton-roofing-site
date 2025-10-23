document.addEventListener('DOMContentLoaded', function() {
  // Remove no-js class from <html> if JS is running
  document.documentElement.classList.remove('no-js');
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.querySelector('.modal-close');
  console.log("Loaded DOM Carousel and Image Modals.");

  // Only run carousel and modal logic if carousel exists
  if (carouselContainer && slides.length && prevButton && nextButton) {
    let currentIndex = 0;
    function updateCarousel() {
      const offset = -currentIndex * 100;
      carouselContainer.style.transform = `translateX(${offset}%)`;
    }
    prevButton.addEventListener('click', function() {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
      updateCarousel();
    });
    nextButton.addEventListener('click', function() {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });
    // Modal functionality for carousel images
    slides.forEach(slide => {
      const img = slide.querySelector('img');
      if (img && modal && modalImage) {
        img.addEventListener('click', function() {
          modal.style.display = 'flex';
          modalImage.src = this.src;
          modalImage.alt = this.alt;
        });
      }
    });
  }
  // Modal close logic (if modal exists)
  if (modal && modalClose) {
    modalClose.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Scroll reveal for elements with .reveal
  const revealElements = document.querySelectorAll('.reveal');
  // Fallback: if JS fails, .reveal elements are visible (no opacity:0 in CSS by default)
  if ('IntersectionObserver' in window) {
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        console.log('IntersectionObserver entry:', entry.target, 'isIntersecting:', entry.isIntersecting);
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => {
      el.classList.remove('active'); // Ensure hidden for animation
      revealOnScroll.observe(el);
    });
  } else {
    // Fallback: just show all elements
    revealElements.forEach(el => el.classList.add('active'));
  }
});
