import UrlParser from "../routes/url-parser";
import routes from "../routes/routes";

class App {
  // eslint-disable-next-line class-methods-use-this
  async renderPage() {
    const skipToContent = document.getElementById("skip-to-content");
    const mainContent = document.getElementById("main-content");

    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    mainContent.innerHTML = await page.render();
    await page.afterRender();

    skipToContent.addEventListener("click", (event) => {
      event.preventDefault();
      mainContent.scrollIntoView({ behavior: "smooth" });
      skipToContent.blur();
    });
  }
}

export default App;
