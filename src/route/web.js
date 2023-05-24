import espress from "express";
import homeController from "../controllers/homeController";
let router = espress.Router();
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/duy", (req, res) => {
    return res.send("helllllooooooooooooooooooo duy");
  });
  router.get("/about", homeController.getAboutPage);

  return app.use("/", router);
};
module.exports = initWebRoutes;
