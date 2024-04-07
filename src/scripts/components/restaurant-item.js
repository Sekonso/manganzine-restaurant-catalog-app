class RestaurantItem extends HTMLElement {
  _restaurantData = {};

  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
      <div class="upper-info">
        <span class="city">${this._restaurantData.city}</span>
        <picture class="picture">
          <source media="(min-width: 1080px)" srcset="https://restaurant-api.dicoding.dev/images/large/${this._restaurantData.pictureId}">
          <source media="(min-width: 760px)" srcset="https://restaurant-api.dicoding.dev/images/medium/${this._restaurantData.pictureId}">
          <img
            loading="lazy"
            src="https://restaurant-api.dicoding.dev/images/small/${this._restaurantData.pictureId}"
            alt="gambar restoran ${this._restaurantData.name}"
          />
        </picture>
        <span class="rating">${this._restaurantData.rating.toFixed(1)}</span>
      </div>
      <div class="lower-info">
        <h3>${this._restaurantData.name}</h3>
        <p>${this._restaurantData.description}</p>
      </div>
    `;

    this.addEventListener("click", this.navigateToUrl);
    this.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.navigateToUrl();
      }
    });
  }

  setRestaurantData(data) {
    this._restaurantData = data;

    this.render();
  }

  navigateToUrl() {
    window.location.href = `#/detail/${this._restaurantData.id}`;
  }
}

customElements.define("restaurant-item", RestaurantItem);
