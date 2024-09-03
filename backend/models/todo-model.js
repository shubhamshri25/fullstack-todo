const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Work", "Personal", "Home", "Urgent"],
      default: "Personal",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
