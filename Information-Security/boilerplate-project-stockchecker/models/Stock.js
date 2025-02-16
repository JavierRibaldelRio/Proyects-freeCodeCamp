// Configuresmo mongoDB, conection & creates the Schema
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

let stockSchema = new mongoose.Schema({

    symbol: String,
    likes: Number,
    ip: [String]

});

mongoose.connect(process.env.URI);
module.exports = mongoose.model('Stock', stockSchema);