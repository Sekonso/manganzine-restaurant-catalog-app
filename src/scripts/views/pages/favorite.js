import FavoriteMovieIdb from "../../data/favorite-restaurant-idb";

const Favorite = {
  async render() {
    return `
      <section class="explore favorite">
        <h2>Restoran Favorit</h2>
        <restaurant-list></restaurant-list>
      </section>
    `;
  },

  async afterRender() {
    const restaurantList = document.querySelector("restaurant-list");
    const restaurantData = await FavoriteMovieIdb.getAllRestaurant();
    restaurantList.setRestaurantList(restaurantData);
  },
};

export default Favorite;
