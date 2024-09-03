const Todo = require("../models/todo-model");

const createTodo = async (req, res, next) => {
  try {
    const { task, category } = req.body;

    const todoExist = await Todo.findOne({ task });

    if (todoExist) {
      return res.status(400).json({ message: "Task already exists" });
    }

    const createdTodo = {
      task,
      category,
    };

    await Todo.create(createdTodo);

    res.status(201).json({ message: "Task created successfully", createdTodo });
  } catch (error) {
    next(error);
  }
};

const getAllTodos = async (req, res, next) => {
  try {
    const allTodos = await Todo.find({});

    if (!allTodos) {
      return res.status(400).json({ message: "No todo is present" });
    }
    res.status(200).json({ message: allTodos });
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findOne({ _id: id });

    if (!todo) {
      res.status(400).json({ message: "Todo with requested id not found " });
    }
    res.status(200).json({ message: todo });
  } catch (error) {
    next(error);
  }
};

const editTodoById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { task, category, isCompleted } = req.body;

    const todoExist = await Todo.findOne({ _id: id });

    if (!todoExist) {
      res.status(400).json({ message: "Todo doesnt exist" });
    }

    const updatedTodo = { task, category, isCompleted };

    await Todo.updateOne({ _id: id }, { $set: updatedTodo });

    res.status(200).json({ message: "Todo Updated successfully", updatedTodo });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todoExist = await Todo.findOne({ _id: id });

    if (!todoExist) {
      res.status(400).json({ message: "Todo doesnt exist" });
    }

    await Todo.deleteOne({ _id: id });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  deleteTodo,
  getTodoById,
  editTodoById,
};
