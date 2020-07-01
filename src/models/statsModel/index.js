const dbConfig = require("../../db/config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.stats = require("./dbModel")(mongoose);

module.exports = db;