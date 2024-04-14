const assert = require("assert");

Feature("Liking restaurant");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("Showing empty liked restaurants", ({ I }) => {
  I.see("Ups, masih belum ada restoran disini...", ".empty");
});

Scenario("Liking one restaurant", async ({ I }) => {
  I.see("Ups, masih belum ada restoran disini...", ".empty");

  I.amOnPage("#/");

  I.waitForElement("restaurant-item .name", 5);
  const firstRestaurantName = await I.grabTextFrom(
    locate("restaurant-item .name").first()
  );
  I.click(locate("restaurant-item").first());

  I.waitForElement("#like", 5);
  I.seeElement("#like");
  I.click("#like");

  I.amOnPage("/#/favorite");

  I.dontSeeElement(".empty");
  I.waitForElement("restaurant-item .name", 5);
  const firstFavoriteRestaurantName = await I.grabTextFrom(
    locate("restaurant-item .name").first()
  );
  I.seeElement("restaurant-item");

  assert.strictEqual(firstRestaurantName, firstFavoriteRestaurantName);
});
