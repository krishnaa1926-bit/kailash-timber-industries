// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Dropdown Menu (for desktop, but can be enhanced)
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('a');
  const content = dropdown.querySelector('.dropdown-content');

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

// WhatsApp Integration
function redirectToWhatsApp(message = '') {
  let phoneNumber = "9977638326"; // LOCAL number only
  const countryCode = "91";

  phoneNumber = countryCode + phoneNumber.replace(/\D/g, "");

  const text = encodeURIComponent(
    message || "Hi, I would like to inquire about your timber products and services."
  );

  const appUrl = `whatsapp://send?phone=${phoneNumber}&text=${text}`;
  const webUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${text}`;

  // Try to open WhatsApp app (works on both desktop and mobile)
  window.location.href = appUrl;

  // Fallback to WhatsApp Web after 2 seconds if app doesn't open
  setTimeout(() => {
    window.open(webUrl, '_blank');
  }, 2000);
}



// Form Validation and WhatsApp Redirect
function submitForm() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const city = document.getElementById('city').value.trim();
  const product = document.getElementById('product').value;
  const message = document.getElementById('message').value.trim();

  let isValid = true;
  let errors = [];

  // Name validation
  if (!name) {
    errors.push('Name is required.');
    isValid = false;
  }

  // Phone validation (simple check for digits and length)
  const phoneRegex = /^\d{10,15}$/;
  if (!phone || !phoneRegex.test(phone)) {
    errors.push('Please enter a valid phone number.');
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please enter a valid email address.');
    isValid = false;
  }

  // Product interest
  if (!product) {
    errors.push('Please select a product of interest.');
    isValid = false;
  }

  // Message
  if (!message) {
    errors.push('Message is required.');
    isValid = false;
  }

  if (!isValid) {
    alert('Please correct the following errors:\n' + errors.join('\n'));
  } else {
    // Create WhatsApp message with form details
    const whatsappMessage = `Hi, I would like to inquire about your services.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nCity: ${city}\nProduct Interest: ${product}\nMessage: ${message}`;
    redirectToWhatsApp(whatsappMessage);
    document.getElementById('inquiry-form').reset();
  }
}

// Add WhatsApp redirect to CTA buttons
document.addEventListener('DOMContentLoaded', () => {
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    // Skip buttons that are inside forms (handled by form submission)
    if (button.closest('form')) return;

    if (button.textContent.toLowerCase().includes('quote') ||
        button.textContent.toLowerCase().includes('inquire') ||
        button.textContent.toLowerCase().includes('contact')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        // Check if it's an "Enquire Now" button in a product item
        const productItem = button.closest('.product-item');
        if (productItem) {
          const productName = productItem.querySelector('h3').textContent;
          const specs = productItem.querySelector('.product-specs').textContent.trim();
          const quantityInput = productItem.querySelector('input[type="number"]');
          const quantity = quantityInput ? quantityInput.value : '1';

          // Parse dimensions from product name (e.g., "Teak Planks - 1" × 6" × 8'")
          const dimensionMatch = productName.match(/(\d+)["']?\s*×\s*(\d+)["']?\s*×\s*(\d+)['"]/);
          let message = `Hi, I would like to inquire about ${productName}.\n\n`;
          if (dimensionMatch) {
            const thickness = dimensionMatch[1];
            const width = dimensionMatch[2];
            const length = dimensionMatch[3];
            message += `Length: ${length}'\nWidth: ${width}"\nThickness: ${thickness}"\nQuantity: ${quantity}`;
          } else {
            message += `Specifications: ${specs}\nQuantity: ${quantity}`;
          }
          redirectToWhatsApp(message);
        } else {
          redirectToWhatsApp();
        }
      });
    }
  });
});

// Product Category Tabs
function showCategory(category) {
  // Hide all product sections
  const sections = document.querySelectorAll('.product-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  // Remove active class from all tab buttons
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });

  // Show selected category
  const selectedSection = document.getElementById(category);
  if (selectedSection) {
    selectedSection.classList.add('active');
  }

  // Add active class to clicked button
  const clickedButton = event.target;
  clickedButton.classList.add('active');
}

// Smooth Scroll Animations (simple fade-in on scroll)
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Feedback Widget Functions
let currentRating = 0;

function openFeedbackModal() {
  const modal = document.getElementById('feedback-modal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeFeedbackModal() {
  const modal = document.getElementById('feedback-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
    resetFeedbackForm();
  }
}

function rateFeedback(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll('.star-rating');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function submitFeedback(event) {
  event.preventDefault();

  const name = document.getElementById('feedback-name').value.trim();
  const email = document.getElementById('feedback-email').value.trim();
  const message = document.getElementById('feedback-message').value.trim();

  if (!message) {
    alert('Please enter your feedback message.');
    return;
  }

  // Create feedback data
  const feedbackData = {
    rating: currentRating,
    name: name || 'Anonymous',
    email: email || '',
    message: message,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  };

  console.log('Feedback submitted:', feedbackData);

  // Create WhatsApp message with feedback details
  const whatsappMessage = `Feedback Received:\n\nRating: ${currentRating}/5 stars\nName: ${feedbackData.name}\nEmail: ${feedbackData.email}\nMessage: ${message}\nPage: ${window.location.pathname}\nTime: ${new Date().toLocaleString()}`;

  // Redirect to WhatsApp with feedback
  redirectToWhatsApp(whatsappMessage);

  // Reset form
  resetFeedbackForm();
}

function scrollToFeedback() {
  const feedbackSection = document.getElementById('feedback-section');
  if (feedbackSection) {
    feedbackSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function resetFeedbackForm() {
  currentRating = 0;
  const stars = document.querySelectorAll('.star-rating');
  stars.forEach(star => star.classList.remove('active'));

  document.getElementById('feedback-name').value = '';
  document.getElementById('feedback-email').value = '';
  document.getElementById('feedback-message').value = '';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('feedback-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeFeedbackModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeFeedbackModal();
    }
  });
});

// Function to handle product enquiry
function enquireProduct(button) {
  const productItem = button.closest('.product-item');
  if (productItem) {
    const productName = productItem.querySelector('h3').textContent;
    const specs = productItem.querySelector('.product-specs').textContent.trim();
    const quantityInput = productItem.querySelector('input[type="number"]');
    const quantity = quantityInput ? quantityInput.value : '1';

    // Parse dimensions from product name (e.g., "Teak Planks - 1" × 6" × 8'")
    const dimensionMatch = productName.match(/(\d+)["']?\s*×\s*(\d+)["']?\s*×\s*(\d+)['"]/);
    let message = `Hi, I would like to inquire about ${productName}.\n\n`;
    if (dimensionMatch) {
      const thickness = dimensionMatch[1];
      const width = dimensionMatch[2];
      const length = dimensionMatch[3];
      message += `Length: ${length}'\nWidth: ${width}"\nThickness: ${thickness}"\nQuantity: ${quantity}`;
    } else {
      message += `Specifications: ${specs}\nQuantity: ${quantity}`;
    }
    redirectToWhatsApp(message);
  }
}

// Custom Size Form Submission
function submitCustomSizeForm(event) {
  event.preventDefault();

  const length = document.getElementById('custom-length').value.trim();
  const width = document.getElementById('custom-width').value.trim();
  const thickness = document.getElementById('custom-thickness').value.trim();
  const quantity = document.getElementById('custom-quantity').value;

  let isValid = true;
  let errors = [];

  // Basic validation
  if (!length) {
    errors.push('Length is required.');
    isValid = false;
  }
  if (!width) {
    errors.push('Width is required.');
    isValid = false;
  }
  if (!thickness) {
    errors.push('Thickness is required.');
    isValid = false;
  }
  if (!quantity || quantity < 1) {
    errors.push('Please enter a valid quantity.');
    isValid = false;
  }

  if (!isValid) {
    alert('Please correct the following errors:\n' + errors.join('\n'));
  } else {
    // Create WhatsApp message with custom size details
    const whatsappMessage = `Hi, I would like to inquire about custom teak planks.\n\nLength: ${length}\nWidth: ${width}\nThickness: ${thickness}\nQuantity: ${quantity}`;
    redirectToWhatsApp(whatsappMessage);
    document.getElementById('custom-size-form').reset();
  }
}

// Timeline Slideshow Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.timeline-section .slide');
const dots = document.querySelectorAll('.timeline-section .slideshow-dots .dot');
let slideshowInterval;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function startSlideshow() {
    slideshowInterval = setInterval(nextSlide, 2500); // 2.5 seconds per slide
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
}

// Team Swiper Functionality
let currentTeamSlide = 0;
const teamSwiper = document.querySelector('.team-swiper');
const teamWrapper = document.querySelector('.swiper-wrapper');
const teamSlides = document.querySelectorAll('.swiper-slide');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

function setPositionByIndex() {
    currentTranslate = currentTeamSlide * -100;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

function setSliderPosition() {
    teamWrapper.style.transform = `translateX(${currentTranslate}%)`;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function touchStart(event) {
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    teamSwiper.classList.add('grabbing');
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    teamSwiper.classList.remove('grabbing');

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentTeamSlide < teamSlides.length - 1) currentTeamSlide += 1;
    if (movedBy > 100 && currentTeamSlide > 0) currentTeamSlide -= 1;

    setPositionByIndex();
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Touch events
if (teamSwiper) {
  teamSwiper.addEventListener('touchstart', touchStart, false);
  teamSwiper.addEventListener('touchend', touchEnd, false);
  teamSwiper.addEventListener('touchmove', touchMove, false);

  // Mouse events for desktop testing
  teamSwiper.addEventListener('mousedown', touchStart, false);
  teamSwiper.addEventListener('mouseup', touchEnd, false);
  teamSwiper.addEventListener('mouseleave', touchEnd, false);
  teamSwiper.addEventListener('mousemove', touchMove, false);
}

// Initialize
if (teamSwiper) {
  setPositionByIndex();
}

// Product Card Slideshow Functionality
let currentCardSlide = 0;
const cardSlides = document.querySelectorAll('.product-slideshow .slide-card');
let cardSlideshowInterval;
let isCardDragging = false;
let cardStartPos = 0;
let cardCurrentTranslate = 0;
let cardPrevTranslate = 0;
let cardAnimationID = 0;

function showCardSlide(index) {
    console.log('Showing card slide:', index);
    cardSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextCardSlide() {
    currentCardSlide = (currentCardSlide + 1) % cardSlides.length;
    showCardSlide(currentCardSlide);
}

function prevCardSlide() {
    currentCardSlide = (currentCardSlide - 1 + cardSlides.length) % cardSlides.length;
    showCardSlide(currentCardSlide);
}

function startCardSlideshow() {
    cardSlideshowInterval = setInterval(nextCardSlide, 2000); // 2 seconds per slide for testing
}

function stopCardSlideshow() {
    clearInterval(cardSlideshowInterval);
}

// Touch/Swipe functionality for mobile
function cardTouchStart(event) {
    cardStartPos = getCardPositionX(event);
    isCardDragging = true;
    cardAnimationID = requestAnimationFrame(cardAnimation);
    stopCardSlideshow(); // Pause auto-play during swipe
}

function cardTouchEnd() {
    isCardDragging = false;
    cancelAnimationFrame(cardAnimationID);

    const movedBy = cardCurrentTranslate - cardPrevTranslate;

    if (movedBy < -50 && currentCardSlide < cardSlides.length - 1) {
        nextCardSlide();
    } else if (movedBy > 50 && currentCardSlide > 0) {
        prevCardSlide();
    } else {
        showCardSlide(currentCardSlide); // Reset to current slide
    }

    cardPrevTranslate = 0;
    cardCurrentTranslate = 0;
    startCardSlideshow(); // Resume auto-play
}

function cardTouchMove(event) {
    if (isCardDragging) {
        const currentPosition = getCardPositionX(event);
        cardCurrentTranslate = cardPrevTranslate + currentPosition - cardStartPos;
    }
}

function getCardPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function cardAnimation() {
    if (isCardDragging) requestAnimationFrame(cardAnimation);
}

// Mobile logo span hide on scroll and navbar transparency
function handleMobileLogoScroll() {
    if (window.innerWidth <= 768) {
        const logoSpan = document.querySelector('.logo span');
        const header = document.querySelector('header');
        const navLinks = document.querySelector('.nav-links');
        if (logoSpan && header && navLinks) {
            if (window.scrollY > 100) {
                logoSpan.classList.add('hide-on-scroll');
                header.classList.add('scrolled');
                navLinks.classList.add('scrolled');
            } else {
                logoSpan.classList.remove('hide-on-scroll');
                header.classList.remove('scrolled');
                navLinks.classList.remove('scrolled');
            }
        }
    }
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll listener for mobile logo
    window.addEventListener('scroll', handleMobileLogoScroll);
    handleMobileLogoScroll(); // Check on load

    if (slides.length > 0) {
        showSlide(0);
        startSlideshow();

        // Add click handlers for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopSlideshow();
                startSlideshow(); // Restart with new timing
            });
        });

        // Pause on hover
        const slideshowContainer = document.querySelector('.timeline-section .slideshow-container');
        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }

    // Product card slideshow functionality
    if (cardSlides.length > 0) {
        console.log('Card slides found:', cardSlides.length);
        showCardSlide(0);
        setTimeout(() => {
            startCardSlideshow();
        }, 1000); // Delay start by 1 second

        // Pause on hover
        const productSlideshowContainer = document.querySelector('.product-slideshow .slideshow-container');
        productSlideshowContainer.addEventListener('mouseenter', stopCardSlideshow);
        productSlideshowContainer.addEventListener('mouseleave', startCardSlideshow);

        // Add touch/swipe events for mobile
        productSlideshowContainer.addEventListener('touchstart', cardTouchStart, false);
        productSlideshowContainer.addEventListener('touchend', cardTouchEnd, false);
        productSlideshowContainer.addEventListener('touchmove', cardTouchMove, false);

        // Mouse events for desktop testing
        productSlideshowContainer.addEventListener('mousedown', cardTouchStart, false);
        productSlideshowContainer.addEventListener('mouseup', cardTouchEnd, false);
        productSlideshowContainer.addEventListener('mouseleave', cardTouchEnd, false);
        productSlideshowContainer.addEventListener('mousemove', cardTouchMove, false);
    }


});
