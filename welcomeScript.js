// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
//variables
const btnScrollTo = document.querySelector(".btn--scroll-to");
const scrollSection = document.querySelector("#section--1");

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
//creating cooking message
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");
// cookieMsg.textContent =
//   "we use cookie for better user expereince and analytics";
cookieMsg.innerHTML =
  'we use cookie for better user expereince and analytics<button class="btn btn--close-cookie">Got it </button>';

document.querySelector(".header").append(cookieMsg);
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", () => cookieMsg.remove());
cookieMsg.style.backgroundColor = "#37383d";
// cookieMsg.style.width = "100%";
cookieMsg.style.height =
  parseFloat(getComputedStyle(cookieMsg).height, 10) + 25 + "px";

//get set attribute
// console.log(cookieMsg.getAttribute(""));
//old school way of doing smooth scrolling

btnScrollTo.addEventListener("click", function (e) {
  //   const scrollCordinate = scrollSection.getBoundingClientRect();

  //   window.scrollTo({
  //     left: scrollCordinate.x + window.scrollX,
  //     top: scrollCordinate.y + window.scrollY,
  //     behavior: "smooth",
  //   });
  scrollSection.scrollIntoView({ behavior: "smooth" });
});

// setTimeout(() => {
//     btnScrollTo.removeEventListener("click",function_name );
// }, 3000);
//event propogation
//using event delegation implementing smoothscrolling
//finding common parent element
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///Tabbed components changing javascript
const tabContainer = document.querySelector(".operations__tab-container");
const operationTab = document.querySelectorAll(".operations__tab");
const operationContent = document.querySelectorAll(".operations__content");
tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  //   console.log(clicked);
  if (!clicked) return;
  operationTab.forEach((el) => el.classList.remove("operations__tab--active"));
  operationContent.forEach((el) =>
    el.classList.remove("operations__content--active")
  );
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//implementing fade anitmaiton
const nav_bar = document.querySelector(".nav");

const hoverFade = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    //implementing feature
    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
nav_bar.addEventListener("mouseover", hoverFade.bind(0.5));

nav_bar.addEventListener("mouseout", hoverFade.bind(1));

//implementing sticky navitgation
// window.addEventListener("scroll", function () {
//   const cordinates = scrollSection.getBoundingClientRect();
//   if (cordinates.top < window.scrollY) {
//     nav_bar.classList.add("sticky");
//   } else nav_bar.classList.remove("sticky");
// });

//implementing Sticky Navigation in a better way through Intersection API
const obsCallback = function (entries) {
  //   entries.forEach((entry)  => console.log(entry));
  const [entry] = entries;
  entry.isIntersecting
    ? nav_bar.classList.remove("sticky")
    : nav_bar.classList.add("sticky");
};
const nav_bar_height = nav_bar.getBoundingClientRect().height;
const obsoptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav_bar_height}px`,
};
const headObserver = new IntersectionObserver(obsCallback, obsoptions);
headObserver.observe(document.querySelector(".header"));

//Implementing  revealing scrolling sections using Intersection API
const _Allsections = document.querySelectorAll(".section");
const revealSec = function (entries, observe) {
  const [entry] = entries;
  //   console.log(`${entry.target.id}`);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observe.unobserve(entry.target);
};
const secObs = {
  root: null,
  threshold: 0.15,
};
const revealSection = new IntersectionObserver(revealSec, secObs);

_Allsections.forEach((section) => {
  //   console.log(section);
  section.classList.add("section--hidden");
  revealSection.observe(section);
});
//lazy loading images
const revImage = function (entries, observations) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observations.unobserve(entry.target);
};
const revealImages = new IntersectionObserver(revImage, {
  root: null,
  threshold: 0.28,
});
const allImages = document.querySelectorAll(".features__img");
allImages.forEach((element) => {
  revealImages.observe(element);
});

//slider buttons
let currSlide = 0;
const slides = document.querySelectorAll(".slide");

slides.forEach((el, i) => {
  el.style.transform = `translateX(${i * 100}%)`;
});

const btn_left = document.querySelector(".slider__btn--left");
const btn_right = document.querySelector(".slider__btn--right");
// console.log(slides.length - 1);
const slide_right = function () {
  if (currSlide == slides.length - 1) {
    currSlide = 0;
  } else currSlide++;

  goToSlidemover(currSlide);
};
btn_right.addEventListener("click", slide_right);
const slide_left = function () {
  if (currSlide == 0) {
    currSlide = slides.length - 1;
  } else currSlide--;
  goToSlidemover(currSlide);
};
btn_left.addEventListener("click", slide_left);

const goToSlidemover = function (currSlide) {
  slides.forEach((el, i) => {
    el.style.transform = `translateX(${(i - currSlide) * 100}%)`;
  });
};

document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowLeft") slide_left();
  if (e.key == "ArrowRight") slide_right();
});

const dots = document.querySelector(".dots");

slides.forEach((_, i) => {
  dots.insertAdjacentHTML(
    "beforeend",
    `<button class="dots__dot" data-slide="${i}"></button>`
  );
});

dots.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const tnum = e.target.dataset.slide;
    goToSlidemover(tnum);
    // console.log(tnum);
    activateDot(e);
    // e.target.classList.add("dots__dot--active");
  }
});

const activateDot = function (e) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((el) => el.classList.remove("dots__dot--active"));
  // document
  //   .querySelector(`.dots_dot[data-slide="${tnum}"]`)
  //   .classList.add("dots__dot--active");
  e.target.classList.add("dots__dot--active");
};

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   e.returnValue = " ";
// });
