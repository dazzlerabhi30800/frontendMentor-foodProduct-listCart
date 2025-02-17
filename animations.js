document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".product--wrapper", {
    y: -300,
    opacity: 0,
    stagger: 10,
    duration: 0.4,
  });
  gsap.from(".cart", {
    x: 200,
    opacity: 0,
    duration: 0.5,
    delay: 0.4,
  });
});
