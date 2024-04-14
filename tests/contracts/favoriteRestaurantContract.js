const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it("Should return the restaurant that has been added", async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurant.getRestaurant(3)).toBeUndefined();
  });

  it("Should refuse to add restaurant with incorrect properties", async () => {
    favoriteRestaurant.putRestaurant({ key: "value" });

    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([]);
  });

  it("Shoud return return all of the favorite restaurant", async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it("Should remove favorite restaurant", async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });
    favoriteRestaurant.putRestaurant({ id: 3 });

    await favoriteRestaurant.deleteRestaurant(1);

    expect(await favoriteRestaurant.getRestaurant(1)).toBeUndefined();
    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([
      { id: 2 },
      { id: 3 },
    ]);
  });

  it("Should handle delete request even if the restaurant has not been added", async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });
    favoriteRestaurant.putRestaurant({ id: 3 });

    await favoriteRestaurant.deleteRestaurant(4);

    expect(await favoriteRestaurant.getRestaurant(4)).toBeUndefined();
    expect(await favoriteRestaurant.getAllRestaurant()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });
};

export { itActsAsFavoriteRestaurantModel };
