Feature("Reviewing restaurant");

Scenario("Input and submit review", ({ I }) => {
  I.amOnPage("#/");

  I.waitForElement("restaurant-item", 5);
  I.seeElement("restaurant-item");
  I.click(locate("restaurant-item").first());

  const reviewNameValue = `User${+new Date()}`;
  const reviewContentValue = "Good restaurant";
  I.fillField("#review-name-input", reviewNameValue);
  I.fillField("#review-content-input", reviewContentValue);
  I.click(locate("#submit"));

  I.waitForText(reviewNameValue, 5, ".review-name");
  I.waitForText(reviewContentValue, 5, ".review-content");
});
