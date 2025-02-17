document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".product--wrapper", {
    y: -300,
    opacity: 0,
    stagger: 10,
    duration: 0.5,
    stagger: 0.1,
  });
  gsap.from(".cart", {
    x: 200,
    opacity: 0,
    duration: 1.5,
    delay: 0.8,
    ease: "elastic.out(0.8,0.4)",
  });
});
