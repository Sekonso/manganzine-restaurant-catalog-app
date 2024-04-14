import restaurantSource from "../data/restaurant-source";
import FavoriteMovieIdb from "../data/favorite-restaurant-idb";

const DetailPageHandler = {
  async getRestaurantData(id) {
    return restaurantSource.restaurantDetail(id);
  },

  async setRestaurantDetailData(restaurantData) {
    const restaurantDetail = document.querySelector("restaurant-detail");

    restaurantDetail.setRestaurantData(restaurantData);

    await this.setFavoriteAttribute(restaurantData.id);
    this.addReviewFormHandler(restaurantData.id);
    this.addLikeHandler(restaurantData.id);
  },

  async setFavoriteAttribute(id) {
    const isFavorite = await FavoriteMovieIdb.getRestaurant(id);

    if (!isFavorite) {
      document.querySelector("restaurant-detail").setAttribute("favorite", "false");
    } else {
      document.querySelector("restaurant-detail").setAttribute("favorite", "true");
    }
  },

  addReviewFormHandler(id) {
    const reviewForm = document.getElementById("review-form");
    const reviewNameInput = document.getElementById("review-name-input");
    const reviewContentInput = document.getElementById("review-content-input");

    reviewForm.addEventListener("submit", async (event) => {
      try {
        event.preventDefault();

        await restaurantSource.submitReview(
          id,
          reviewNameInput.value,
          reviewContentInput.value,
        );

        reviewNameInput.value = "";
        reviewContentInput.value = "";

        const newRestaurantData = await this.getRestaurantData(id);
        this.setRestaurantDetailData(await newRestaurantData);
      } catch (error) {
        document.querySelector("restaurant-detail").renderError();
        console.error(`Failed to submit review ${error}`);
      }
    });
  },

  addLikeHandler(id) {
    const restaurantDetail = document.querySelector("restaurant-detail");
    const favorite = restaurantDetail.getAttribute("favorite");

    if (favorite === "false") {
      const likeButton = document.getElementById("like");

      likeButton.addEventListener("click", () => {
        FavoriteMovieIdb.putRestaurant(restaurantDetail.getRestaurantData());
        restaurantDetail.setAttribute("favorite", "true");
        this.addLikeHandler(id);
      });
    }

    if (favorite === "true") {
      const unlikeButton = document.getElementById("unlike");

      unlikeButton.addEventListener("click", () => {
        FavoriteMovieIdb.deleteRestaurant(id);
        restaurantDetail.setAttribute("favorite", "false");
        this.addLikeHandler(id);
      });
    }
  },
};

export default DetailPageHandler;
