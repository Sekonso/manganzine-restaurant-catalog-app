import "../src/scripts/components/restaurant-detail";
import DetailPageHandler from "../src/scripts/utils/detail-page-handler";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe("Liking A Restaurant", () => {
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

  it("Should display like if the restaurant is not favorite", () => {
    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "false");

    expect(document.querySelector("#like")).toBeTruthy();
  });

  it("Should not display unlike if the restaurant is not favorite", () => {
    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "false");

    expect(document.querySelector("#unlike")).toBeFalsy();
  });

  it("Should display unlike after the like is clicked", () => {
    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "false");
    DetailPageHandler.addLikeHandler(restaurantData.id);

    document.querySelector("#like").dispatchEvent(new Event("click"));
    expect(document.querySelector("#unlike")).toBeTruthy();
  });

  it("Should not display like after the like is clicked", () => {
    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "false");
    DetailPageHandler.addLikeHandler(restaurantData.id);

    document.querySelector("#like").dispatchEvent(new Event("click"));
    expect(document.querySelector("#like")).toBeFalsy();
  });

  it("Should add restaurant to favorite after the like is clicked", async () => {
    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "false");
    DetailPageHandler.addLikeHandler(restaurantData.id);

    document.querySelector("#like").dispatchEvent(new Event("click"));
    expect(
      await FavoriteRestaurantIdb.getRestaurant(restaurantData.id)
    ).toEqual(restaurantData);
  });

  it("Should not throw error when the like is clicked and the restaurant is already in favorite", async () => {
    await FavoriteRestaurantIdb.putRestaurant(restaurantData);

    document
      .querySelector("restaurant-detail")
      .setAttribute("favorite", "false");
    DetailPageHandler.addLikeHandler(restaurantData.id);

    document.querySelector("#like").dispatchEvent(new Event("click"));
    expect(
      await FavoriteRestaurantIdb.getRestaurant(restaurantData.id)
    ).toEqual(restaurantData);
  });
});
