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
  console.log("Loaded DOM Carousel and Image Modals.")

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

  // Modal functionality
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    img.addEventListener('click', function() {
      modal.style.display = 'flex';
      modalImage.src = this.src;
      modalImage.alt = this.alt;
    });
  });

  modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Scroll reveal for elements with .reveal
  const revealElements = document.querySelectorAll('.reveal');
  // Always add .active as a fallback so text never disappears
  revealElements.forEach(el => el.classList.add('active'));

  // Optionally, keep IntersectionObserver for animation if you want staggered effect
  // (but .active is always present, so text never animates out)
});
