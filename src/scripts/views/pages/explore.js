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
    try {
      const restaurantListData = await restaurantSource.restaurantList();
      document.querySelector("restaurant-list").setRestaurantList(restaurantListData);
    } catch (error) {
      document.querySelector("restaurant-list").renderError();
      console.error(`Failed to fetch ${error}`);
    }
  },
};

export default Explore;
