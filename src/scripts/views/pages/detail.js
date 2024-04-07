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

    await DetailPageHandler.setRestaurantDetailData(url.id);
  },
};

export default Detail;
