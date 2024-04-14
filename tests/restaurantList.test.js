import "../src/scripts/components/restaurant-list";
import "../src/scripts/components/restaurant-item";

describe("Displaying favorite restaurants", () => {
  const restaurantListData = [
    {
      id: "111",
      name: "Restaurant 1",
      description: "Lorem ipsum",
      city: "City 1",
      address: "Street 1",
      pictureId: "1",
      menus: {
        foods: [{ name: "Food 1" }],
        drinks: [{ name: "Drink 1" }],
      },
      rating: 5.0,
      customerReviews: [
        {
          name: "User1",
          review: "Lorem ipsum",
          date: "01 January 2024",
        },
      ],
    },
    {
      id: "222",
      name: "Restaurant 2",
      description: "Lorem ipsum",
      city: "City 2",
      address: "Street 2",
      pictureId: "2",
      menus: {
        foods: [{ name: "Food 2" }],
        drinks: [{ name: "Drink 2" }],
      },
      rating: 5.0,
      customerReviews: [
        {
          name: "User2",
          review: "Lorem ipsum",
          date: "02 February 2024",
        },
      ],
    },
  ];

  beforeEach(() => {
    document.body.innerHTML = "<restaurant-list></restaurant-list>";
  });

  describe("When restaurant does not exist", () => {
    it("Should render information of empty data", () => {
      document.querySelector("restaurant-list").setRestaurantList([]);

      expect(document.querySelector(".empty")).toBeTruthy();
    });
  });

  describe("When restaurants exist", () => {
    it("Should display all listed restaurants as item", () => {
      document
        .querySelector("restaurant-list")
        .setRestaurantList(restaurantListData);

      const restaurantItemList = document.querySelectorAll("restaurant-item");

      const restaurantItemDataList = [];
      restaurantItemList.forEach((restaurant) => {
        restaurantItemDataList.push(restaurant.getRestaurantData());
      });

      expect(restaurantItemDataList).toEqual(restaurantListData);
    });
  });
});
