const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.university = require("./university.model.js")(mongoose);
db.company = require("./company.model.js")(mongoose);
db.user = require("./user.model.js")(mongoose);
db.keyword = require("./keyword.model.js")(mongoose);
db.bio = require("./bio.model.js")(mongoose);
db.experience = require("./experience.model.js")(mongoose);
db.skill = require("./skill.model.js")(mongoose);

module.exports = db;