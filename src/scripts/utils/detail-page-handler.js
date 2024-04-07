import restaurantSource from "../data/restaurant-source"
import FavoriteMovieIdb from "../data/favorite-restaurant-idb";

const DetailPageHandler = {
  async setRestaurantDetailData(id) {
    try {
      const restaurantDetail = document.querySelector("restaurant-detail");
      
      const restaurantData = await restaurantSource.restaurantDetail(id);

      await restaurantDetail.setRestaurantData(restaurantData);

      await this.setFavoriteAttribute(id)
      await this.addReviewFormHandler(id);
      await this.addLikeHandler(id);
    } catch (error) {
      restaurantDetail.renderError();
      console.error(`Failed to fetch: ${error}`);
    }
  },

  async setFavoriteAttribute(id) {
    const isFavorite = await FavoriteMovieIdb.getRestaurant(id);

      if (!isFavorite) {
        document.querySelector("restaurant-detail").setAttribute("favorite", "false");
      } else {
        document.querySelector("restaurant-detail").setAttribute("favorite", "true");
      }
  },

  async addReviewFormHandler(id) {
    const reviewForm = document.getElementById("review-form");
    const reviewNameInput = document.getElementById("review-name-input");
    const reviewContentInput = document.getElementById("review-content-input");

    reviewForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      await restaurantSource.submitReview(
        id,
        reviewNameInput.value,
        reviewContentInput.value,
      );

      setTimeout(() => {
        this.setRestaurantDetailData(id);
      })
    });
  },

  async addLikeHandler(id) {
    const restaurantDetail = document.querySelector("restaurant-detail");
    const favorite = restaurantDetail.getAttribute("favorite");

    if (favorite === "true") {
      const dislikeButton = document.getElementById("dislike");

      dislikeButton.addEventListener("click", async () => {
        await FavoriteMovieIdb.deleteRestaurant(id);
        restaurantDetail.setAttribute("favorite", "false");
        this.setRestaurantDetailData(id);
      });
    }

    if (favorite === "false") {
      const likeButton = document.getElementById("like");

      likeButton.addEventListener("click", async () => {
        await FavoriteMovieIdb.putRestaurant(restaurantDetail.getRestaurantData());
        restaurantDetail.setAttribute("favorite", "true");
        this.setRestaurantDetailData(id);
      });
    }
  },
}

export default DetailPageHandler;