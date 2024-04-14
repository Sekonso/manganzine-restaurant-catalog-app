import "../src/scripts/components/restaurant-detail";
import DetailPageHandler from "../src/scripts/utils/detail-page-handler";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe("Unliking A Restaurant", () => {
  // For fixing structuredClone error while using fake-indexeddb
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

  const restaurantData = {
    id: "rqdv5juczeskfw1e867",
    name: "Melting Pot",
    description: "Lorem ipsum",
    city: "Medan",
    address: "Jln. Pandeglang no 19",
    pictureId: "14",
    categories: [{ name: "Italia" }],
    menus: {
      foods: [{ name: "Paket rosemary" }],
      drinks: [{ name: "Es krim" }],
    },
    rating: 4.2,
    customerReviews: [
      {
        name: "Ahmad",
        review: "Tidak rekomendasi untuk pelajar!",
        date: "13 November 2019",
      },
    ],
  };

  beforeEach(async () => {
    document.body.innerHTML = "<restaurant-detail></restaurant-detail>";
    document
      .querySelector("restaurant-detail")
      .setRestaurantData(restaurantData);
  });

  it("Should display unlike if the restaurant is favorite", () => {
    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "true");

    expect(document.querySelector("#unlike")).toBeTruthy();
  });

  it("Should not display like if the restaurant is favorite", () => {
    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "true");

    expect(document.querySelector("#like")).toBeFalsy();
  });

  it("Should display like after the unlike is clicked", () => {
    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "true");
    DetailPageHandler.addLikeHandler(restaurantData.id);

    document.querySelector("#unlike").dispatchEvent(new Event("click"));
    expect(document.querySelector("#like")).toBeTruthy();
  });

  it("Should not display unlike after the unlike is clicked", () => {
    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "true");
    DetailPageHandler.addLikeHandler(restaurantData.id);

    document.querySelector("#unlike").dispatchEvent(new Event("click"));
    expect(document.querySelector("#unlike")).toBeFalsy();
  });

  it("Should remove restaurant from favorite after the unlike is clicked", async () => {
    await FavoriteRestaurantIdb.putRestaurant(restaurantData);

    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "true");
    DetailPageHandler.addLikeHandler(restaurantData.id);

    document.querySelector("#unlike").dispatchEvent(new Event("click"));
    expect(
      await FavoriteRestaurantIdb.getRestaurant(restaurantData.id)
    ).toBeUndefined();
  });

  it("Should not throw error when the unlike is clicked and the restaurant is already not in favorite", async () => {
    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "true");
    DetailPageHandler.addLikeHandler(restaurantData.id);

    await FavoriteRestaurantIdb.deleteRestaurant(restaurantData.id);

    document.querySelector("#unlike").dispatchEvent(new Event("click"));
    expect(
      await FavoriteRestaurantIdb.getRestaurant(restaurantData.id)
    ).toBeUndefined();
  });
});
