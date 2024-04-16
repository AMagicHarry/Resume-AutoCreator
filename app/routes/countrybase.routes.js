module.exports = app => {
  const university = require("../controllers/university.controller.js");
  const company = require("../controllers/company.controller.js");
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  //Create a new University
  router.post("/university", university.create);

  // Retrieve all Universitys
  router.get("/university", university.findAll);

  // Create a new Company
  router.post("/company", company.create);

  // Retrieve all Companys
  router.get("/company", company.findAll);

  // Create a new User
  router.post("/user", user.create);

  // Retrieve all Users
  router.get("/user", user.findAll);

  // Retrieve User from country
  router.post("/user/info", user.findByCountry)

  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", tutorials.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  // // Create a new Tutorial
  // router.delete("/", tutorials.deleteAll);

  app.use("/api/country", router);
};
