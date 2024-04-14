import UrlParser from "../../routes/url-parser";
import DetailPageHandler from "../../utils/detail-page-handler";

const Detail = {
  async render() {
    return `
      <section class="detail">
        <h2>Detail Restoran</h2>
        <restaurant-detail></restaurant-detail>
      </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    try {
      const restaurantData = await DetailPageHandler.getRestaurantData(url.id);
      await DetailPageHandler.setRestaurantDetailData(restaurantData);
    } catch (error) {
      document.querySelector("restaurant-detail").renderError();
      console.error(`Failed to fetch ${error}`);
    }
  },
};

export default Detail;
