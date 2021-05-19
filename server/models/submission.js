var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  questionname: { type: String, required: true, max: 100 },
  solution: { type: String, required: true },
  solutionBlockly: { type: String, required: true },
  status: {
    type: String,
    enum: ["initial", "pass", "fail"],
    default: "initial"
  },
  timesubmitted: { type: Date },
  runtime: { type: Number, default: 0 }
});

// Export the model
module.exports = mongoose.model("Submission", SubmissionSchema);
