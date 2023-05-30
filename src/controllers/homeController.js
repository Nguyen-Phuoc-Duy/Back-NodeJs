import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // console.log("---------------------", data, "---------------------");
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};
let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("crud.sssssejs");
  // return res.redirect("/crud");
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  // console.log("================");
  // console.log(data);
  // console.log("================");
  // return res.send("get crud display");
  return res.render("displayCRUD.ejs", { dataTable: data });
};
let getEditCRUD = async (req, res) => {
  console.log(req.query.id);
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    console.log("????????????", userData);
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("user not found");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  await CRUDService.updateUserData(data);
  // return res.send("update done");
  return res.redirect("/get-crud");
};
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("delete done");
  } else {
    return res.send("delete failed");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
