class RestaurantDetail extends HTMLElement {
  static observedAttributes = ["favorite"];

  _restaurantData = {};

  constructor() {
    super();

    this._favorite = this.getAttribute("favorite");
  }

  connectedCallback() {
    this.renderLoading();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="upper">
        <picture>
          <source media="(min-width: 1366px)" srcset="https://restaurant-api.dicoding.dev/images/large/${this._restaurantData.pictureId}">
          <source media="(min-width: 760px)" srcset="https://restaurant-api.dicoding.dev/images/medium/${this._restaurantData.pictureId}">
          <img
            loading="lazy"
            src="https://restaurant-api.dicoding.dev/images/small/${this._restaurantData.pictureId}"
            alt="gambar restoran"
          />
        </picture>
      </div>
      <h2>${this._restaurantData.name}</h2>
      <div class="location">
        <i class="fa-solid fa-location-dot"></i>
        <span>${this._restaurantData.city}, ${this._restaurantData.address}</span>
      </div>
      <div class="rating">
        <i class="fa-solid fa-star"></i>
        <span>${this._restaurantData.rating}</span>
      </div>
      <p class="description">
        ${this._restaurantData.description}
      </p>
      <div class="menu">
        <div class"makanan">
          <h3>Makanan</h3>
          <ul class="makanan-list"></ul>
        </div>
        <div class"minuman">
          <h3>Minuman</h3>
          <ul class="minuman-list"></ul>
        </div>
      </div>
      <div class="reviews">
        <h3>Reviews<h3>
        <div class="reviews-list">
        </div>
      </div>
      <form id="review-form">
        <p>Berikan ulasanmu</p>
        <input type="text" id="review-name-input" placeholder="Masukkan nama" required>
        <input type="text" id="review-content-input" placeholder="Masukkan ulasan" required>
        <button type="submit">Kirim</button>
      </form>
    `;

    const upper = this.querySelector(".upper");
    const likeButton = document.createElement("button");
    likeButton.setAttribute("aria-label", "like button");

    if (this._favorite === "true") {
      likeButton.id = "dislike";
      likeButton.innerHTML = "<i class='fa-solid fa-heart'></i>";
    } else {
      likeButton.id = "like";
      likeButton.innerHTML = "<i class='fa-regular fa-heart'></i>";
    }

    upper.appendChild(likeButton);

    const foodList = this._restaurantData.menus.foods.map((food) => {
      const foodItem = document.createElement("li");
      foodItem.innerText = food.name;

      return foodItem;
    });

    const drinkList = this._restaurantData.menus.drinks.map((drink) => {
      const drinkItem = document.createElement("li");
      drinkItem.innerText = drink.name;

      return drinkItem;
    });

    const makananUl = this.querySelector(".makanan-list");
    const minumanUl = this.querySelector(".minuman-list");

    makananUl.append(...foodList);
    minumanUl.append(...drinkList);

    const reviewList = this._restaurantData.customerReviews.map((review) => {
      const reviewComment = document.createElement("div");
      reviewComment.classList.add("review");
      reviewComment.innerHTML = `
        <h4><strong>${review.name}</strong> - ${review.date}</h4>
        <p>${review.review}</p>
      `;

      return reviewComment;
    });

    const reviewsList = this.querySelector(".reviews-list");
    reviewsList.append(...reviewList);
  }

  renderLoading() {
    this.innerHTML = `
      <div class="restaurant-detail-skeleton">
        <div class="image"></div>
        <div class="header"></div>
        <div class="paragraph"></div>
        <div class="paragraph"></div>
        <div class="paragraph"></div>
        <div class="paragraph"></div>
        <div class="paragraph"></div>
      </div>
    `;
  }

  renderError() {
    this.innerHTML = `
      <h1 class="error">Ups, gagal mengambil data...</h1>
    `;
  }

  getRestaurantData() {
    return this._restaurantData;
  }

  setRestaurantData(data) {
    this._restaurantData = data;
    this.render();
  }
}

customElements.define("restaurant-detail", RestaurantDetail);
