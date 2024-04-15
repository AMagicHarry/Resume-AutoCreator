const db = require("../models");
const Skill = db.skill;

// Create and Save a new Skill
exports.create = (req, res) => {
  // Validate request
  if (!req.body.skill) {
    res.status(400).send({ message: "keyword can not be empty!" });
    return;
  }

  // Create a Skill
  const skills = new Skill({
    title: req.body.title,
    skill: req.body.skill,
  });

  // Save Skill in the database
  skills
    .save(skills)
    .then(data => {
      console.log(data)
      // res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Skill."
      });
    });
};

// Retrieve all Skills from the database.
exports.findAll = (req, res) => {
  Skill.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving skills."
      });
    });
};

// Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findById(id)
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found Tutorial with id " + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Tutorial with id=" + id });
//     });
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }

//   const id = req.params.id;

//   Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       } else res.send({ message: "Tutorial was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id
//       });
//     });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//         });
//       } else {
//         res.send({
//           message: "Tutorial was deleted successfully!"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with id=" + id
//       });
//     });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Tutorials were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
