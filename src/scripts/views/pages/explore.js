import restaurantSource from "../../data/restaurant-source";

const Explore = {
  async render() {
    return `
      <section class="explore">
        <h2>Jelajahi Restoran</h2>
        <restaurant-list></restaurant-list>
      </section>
    `;
  },

  async afterRender() {
    const restaurantList = document.querySelector("restaurant-list");
    const restaurantData = await restaurantSource.restaurantList();
    await restaurantList.setRestaurantList(restaurantData);
  },
};

export default Explore;
