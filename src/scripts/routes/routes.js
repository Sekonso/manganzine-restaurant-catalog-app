import Explore from "../views/pages/explore";
import Detail from "../views/pages/detail";
import Favorite from "../views/pages/favorite";

const routes = {
  "/": Explore, // default page
  "/detail/:id": Detail,
  "/favorite": Favorite,
};

export default routes;
