module.exports = app => {
  const keyword = require("../controllers/keyword.controller.js");
  const bio = require("../controllers/bio.controller.js");
  const experience = require("../controllers/experience.controller.js");
  const skill = require("../controllers/skill.controller.js");

  var router = require("express").Router();

  //Create a new University
  router.post("/keyword", keyword.create);

  // Retrieve all Universitys
  router.get("/keyword", keyword.findAll);

  // Create a new Bio
  router.post("/bio", bio.create);

  // Retrieve all Bios
  router.get("/bio", bio.findAll);

  // Create a new Experience
  router.post("/experience", experience.create);

  // Retrieve all Experience
  router.get("/experience", experience.findAll);

  // Create a new Skill
  router.post("/skill", skill.create);

  // Retrieve all Skills
  router.get("/skill", skill.findAll);

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

  app.use("/api/title", router);
};
