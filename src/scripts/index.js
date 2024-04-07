// Components import
import "./components/navigation-bar";
import "./components/restaurant-list";
import "./components/restaurant-item";
import "./components/restaurant-detail";

// Utility &vendor import
import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const app = new App();

window.addEventListener("DOMContentLoaded", async () => {
  app.renderPage();
  swRegister();
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

let lastScrollPosition = 0;
window.addEventListener("scroll", () => {
  const navigationBar = document.querySelector("navigation-bar");
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition) {
    navigationBar.classList.add("dissapear");
  } else {
    navigationBar.classList.remove("dissapear");
  }

  lastScrollPosition = currentScrollPosition;
});
