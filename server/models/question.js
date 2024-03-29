var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  uniquename: { type: String, required: true, unique: true, max: 100 }, // auto generated based on title
  sequence: { type: Number, required: true },
  title: { type: String, required: true, max: 50 },
  description: { type: String, required: true },
  solution: { type: String },
  difficulty: { type: Number, enum: [10, 20, 30], default: 10 }, // 10: easy, 20: medium, 30: hard
  hints: { type: String },
  parameters: {type: String},
  fails: {type: Number, default: 0},
  success:{type: Number, default: 0}
});

// Export the model
module.exports = mongoose.model("Question", QuestionSchema);
