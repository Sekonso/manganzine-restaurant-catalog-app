class RestaurantList extends HTMLElement {
  _restaurantsList = [];

  constructor() {
    super();
  }

  connectedCallback() {
    this.renderLoading();
  }

  render() {
    this.innerHTML = "";

    if (this._restaurantsList.length <= 0) {
      this.renderEmpty();
      return;
    }

    const restaurantItems = this.generateRestaurantItemElements();

    this.append(...restaurantItems);
  }

  renderLoading() {
    this.innerHTML = ""

    for(let i = 1; i <= 6; i++) {
      const restaurantItemSkeleton = document.createElement("div");
      restaurantItemSkeleton.classList.add("restaurant-item-skeleton");
      restaurantItemSkeleton.innerHTML = `
        <div class="image"></div>
        <div class="header"></div>
        <div class="paragraph"></div>
        <div class="paragraph"></div>
        <div class="paragraph"></div>
      `

      this.append(restaurantItemSkeleton)
    }
  }

  renderError() {
    this.innerHTML = `
      <h1 class="error">Ups, gagal mengambil data...</h1>
    `;
  }

  renderEmpty() {
    this.innerHTML = `
      <h1 class="empty">Ups, masih belum ada restoran disini...</h1>
    `;
  }

  setRestaurantList(data) {
    this._restaurantsList = data;

    this.render();
  }

  generateRestaurantItemElements() {
    return this._restaurantsList.map((data) => {
      const restaurantItem = document.createElement("restaurant-item");
      restaurantItem.setRestaurantData(data);
      restaurantItem.setAttribute("tabindex", "0");

      return restaurantItem;
    });
  }
}

customElements.define("restaurant-list", RestaurantList);
