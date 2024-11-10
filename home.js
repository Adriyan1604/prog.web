const images = [
  { 
    src: "assets/section.png", 
    title: "COFFEE FRAPPE",
    subheading: "THE PREMIUM QUALITY", 
    description: "Coffee frappe adalah minuman kopi dingin yang memiliki tekstur creamy dan rasa yang kaya, sering kali dilengkapi dengan tambahan es batu yang diblender hingga halus."
  },
  { 
    src: "assets/section.png", 
    title: "COFFEE VANILLA",
    subheading: "RICH VANILLA FLAVOR", 
    description: "Coffee vanilla memiliki sentuhan manis dengan aroma vanilla yang khas, menyajikan pengalaman minum kopi yang lembut dan memikat."
  },
  { 
    src: "assets/section.png", 
    title: "COFFEE MOCHA",
    subheading: "CHOCOLATE BLEND",
    description: "Coffee mocha menyajikan perpaduan rasa cokelat yang kaya dan kopi, memberikan keseimbangan sempurna antara manis dan pahit."
  }
];

let currentIndex = 0;
let isMovingRight = true;

const carouselImage = document.getElementById("carousel-image");
const menuTitle = document.getElementById("menu-title");
const subheadingElement = document.querySelector(".subheading");
const descriptionElement = document.querySelector(".description");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

// Mengubah selector untuk hanya memilih elemen yang perlu dianimasi
const animatedElements = document.querySelectorAll(`
  .hero-content h2,
  .hero-content .underline,
  .hero-content .icons,
  .hero-content .subheading,
  .hero-content .description,
  .hero-content .order-btn,
  .hero-image img,
  .hero-image .arrow
`);

function resetAnimationClasses() {
  animatedElements.forEach(element => {
    element.classList.remove("slide-in-left", "slide-out-left", "slide-in-right", "slide-out-right");
  });
}

function handleScroll() {
  const aboutUsSection = document.getElementById("about-us");
  const sectionPosition = aboutUsSection.getBoundingClientRect();

  if (sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0) {
    aboutUsSection.classList.add("visible");
  } else {
    aboutUsSection.classList.remove("visible");
  }
}

window.addEventListener("scroll", handleScroll);
document.addEventListener("DOMContentLoaded", handleScroll);

function prevImage() {
  if (currentIndex > 0) {
    isMovingRight = false;
    currentIndex--;
    changeContent(true);
  }
}

function nextImage() {
  if (currentIndex < images.length - 1) {
    isMovingRight = true;
    currentIndex++;
    changeContent(true);
  }
}

function changeContent(animate = false) {
  const slideOutClass = isMovingRight ? "slide-out-left" : "slide-out-right";
  const slideInClass = isMovingRight ? "slide-in-right" : "slide-in-left";

  if (animate) {
    resetAnimationClasses();
    
    animatedElements.forEach(element => {
      element.classList.add(slideOutClass);
    });
  }

  setTimeout(() => {
    carouselImage.src = images[currentIndex].src;
    menuTitle.textContent = images[currentIndex].title;
    subheadingElement.textContent = images[currentIndex].subheading;
    descriptionElement.textContent = images[currentIndex].description;

    if (animate) {
      resetAnimationClasses();
      animatedElements.forEach(element => {
        element.classList.add(slideInClass);
      });
    }
  }, animate ? 500 : 0);

  updateArrows();
}

function updateArrows() {
  leftArrow.classList.toggle("hidden", currentIndex === 0);
  rightArrow.classList.toggle("hidden", currentIndex === images.length - 1);
}

document.addEventListener("DOMContentLoaded", function() {
  updateArrows();
  changeContent(false);
});