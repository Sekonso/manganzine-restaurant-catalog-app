import { itActsAsFavoriteRestaurantModel } from "./contracts/favoriteRestaurantContract";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe("Favorite Restaurant Idb Contract Test Implementation", () => {
  // For fixing structuredClone error while using fake-indexeddb
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurant()).forEach(
      async (restaurant) => {
        await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
      }
    );
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
