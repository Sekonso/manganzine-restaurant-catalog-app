import API_ENDPOINT from "../globals/api-endpoint";

class restaurantSource {
  static async restaurantList() {
    const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async restaurantDetail(id) {
    const response = await fetch(`${API_ENDPOINT.RESTAURANT_DETAIL}/${id}`);
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async submitReview(id, name, review) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        review,
      }),
    };

    const response = await fetch(API_ENDPOINT.ADD_REVIEW, options);
    const responseJson = await response.json();
    return responseJson;
  }
}

export default restaurantSource;
