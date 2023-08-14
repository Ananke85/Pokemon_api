const { Schema } = require("mongoose");

const blogSchema = new Schema({
  title: { type: String },
  image: { type: String },
  intro: { type: String },
  text: { type: String },
  special_features: [{
    title: { type: String },
    text: { type: String },
    image: {type: String}
  }],
  signature: {type: String, default: "-Lorena_CS from the Pokemon Api team"},
  date: { type: Date, default: new Date() },
  conclusion: {type: String}
});

module.exports = blogSchema;