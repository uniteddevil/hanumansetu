/**
 * Reusable Carousel Component
 * @param {Object} options 
 * @param {string} options.id - Unique ID for the carousel
 * @param {Array} options.items - Array of HTML strings or objects for slides
 * @param {number} options.autoPlayInterval - Interval in ms (default 5000)
 * @param {string} options.className - Additional CSS classes (optional)
 */
export function renderCarousel({ id, items, autoPlayInterval = 5000, className = '' }) {
  if (!items || items.length === 0) return '';

  const slidesHtml = items.map((item, index) => `
    <div class="carousel__slide ${index === 0 ? 'active' : ''}" data-index="${index}">
      ${typeof item === 'string' ? item : item.html}
    </div>
  `).join('');

  const dotsHtml = items.map((_, index) => `
    <button class="carousel__dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
  `).join('');

  return `
    <div class="carousel ${className}" id="${id}" data-interval="${autoPlayInterval}">
      <div class="carousel__track-container">
        <div class="carousel__track">
          ${slidesHtml}
        </div>
      </div>
      <div class="carousel__dots">
        ${dotsHtml}
      </div>
    </div>
  `;
}

export function initCarousel(id) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel__dot'));
  const interval = parseInt(carousel.dataset.interval) || 5000;

  let currentIndex = 0;
  let autoPlayTimer = null;

  const updateCarousel = (index) => {
    currentIndex = index;

    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // Move track
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateCarousel(nextIndex);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, interval);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  };

  // Dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
      startAutoPlay(); // Reset timer on manual click
    });
  });

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Initial start
  startAutoPlay();

  // Return teardown function if needed
  return () => stopAutoPlay();
}
