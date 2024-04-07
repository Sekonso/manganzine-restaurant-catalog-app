class NavigationBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="nav-brand">
        <h2>Manganzine</h2>
      </div>
      <button id="navlist-drawer" aria-label="navlist drawer">
        <i class="fa-solid fa-bars"></i>
      </button>
      <ul class="nav-list">
        <li><a href="#/">Home</a></li>
        <li><a href="#/favorite">Favorite</a></li>
        <li>
          <a href="https://github.com/Sekonso" target="_blank">About Us</a>
        </li>
      </ul>
    `;

    const navList = document.querySelector(".nav-list");
    const navlistDrawer = document.querySelector("#navlist-drawer");

    // Men-toggle tampilan navlist ketika drawer di klik
    navlistDrawer.addEventListener("click", () => {
      navList.classList.toggle("active");
    });
  }
}

customElements.define("navigation-bar", NavigationBar);
