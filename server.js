const express = require("express");
const cors = require("cors");
const csv = require("csvtojson");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const filepath = 'data.csv';
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");

  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Resume Auto Creator." });
});

require("./app/routes/resume.routes")(app);
require("./app/routes/countrybase.routes")(app);
require("./app/routes/titlebase.routes")(app);

// async function main() {
//   const jsonArray = await csv().fromFile(filepath);
//   const User = db.user;
//   await User.insertMany(jsonArray);
// }
// main()

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});
