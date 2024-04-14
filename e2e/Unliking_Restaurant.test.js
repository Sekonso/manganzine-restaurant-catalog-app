Feature("Unliking restaurant");

Scenario("Unliking one restaurant", async ({ I }) => {
  I.amOnPage("/#/favorite");

  I.see("Ups, masih belum ada restoran disini...", ".empty");

  I.amOnPage("/");

  I.waitForElement("restaurant-item", 5);
  I.click(locate("restaurant-item").first());

  I.waitForElement("#like", 5);
  I.seeElement("#like");
  I.click("#like");

  I.amOnPage("/#/favorite");

  I.dontSeeElement(".empty");

  I.waitForElement("restaurant-item .name", 5);
  I.click(locate("restaurant-item").first());

  I.waitForElement("#unlike", 5);
  I.seeElement("#unlike");
  I.click("#unlike");

  I.amOnPage("/#/favorite");

  I.dontSeeElement("restaurant-item");
});
