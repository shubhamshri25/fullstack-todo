const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  deleteTodo,
  getTodoById,
  editTodoById,
} = require("../controllers/todo-controller");

const requestValidator = require("../middleware/request-validator-middleware");

const createValidationMiddleware = (type) => (req, res, next) =>
  requestValidator(type, req, res, next);

// create todo
router.post("/", createValidationMiddleware("create"), createTodo);

// get all todos
router.get("/", getAllTodos);

// get todo by id
router.get("/:id", getTodoById);

// get todo by id
router.put("/:id", editTodoById);

// deleting the todo
router.delete("/:id", deleteTodo);

module.exports = router;
