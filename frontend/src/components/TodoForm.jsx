import React, { useState, useEffect, useContext, useRef } from "react";
import category from "./Category";
import todoContext from "../context/TodoContext";

const TodoForm = () => {
  const { todo, createTodo, editTodo, setTodo } = useContext(todoContext);
  const [toDoData, setToDoData] = useState({
    task: "",
    category: category[0].name,
  });

  const taskInput = useRef();

  useEffect(() => {
    if (todo) {
      setToDoData((prev) => ({
        ...prev,
        task: todo.task,
        category: todo.category,
      }));
    }
    taskInput.current.focus();
  }, []);

  const clearForm = () => {
    setToDoData({ task: "", category: category[0].name });
  };

  const handleInputChange = (name, value) => {
    setToDoData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onAdd = (e) => {
    e.preventDefault();
    createTodo(toDoData.task, toDoData.category);
    clearForm();
  };

  const onEdit = (e) => {
    e.preventDefault();
    editTodo(todo._id, toDoData.task, toDoData.category, todo.isCompleted);
    clearForm();
  };

  const onCancel = (e) => {
    e.preventDefault();
    setTodo(null);
    clearForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="my-4 mx-8 flex" onSubmit={handleSubmit}>
      <select
        className="p-3 border-2 border-blue-900 text-blue-950 border-r-0 focus:ring-2 focus:ring-blue-500 outline-none rounded-l"
        name="category"
        value={toDoData.category}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      >
        {category.map((category) => {
          return (
            <option value={category.name} key={category.name}>
              {category.name}
            </option>
          );
        })}
      </select>
      <input
        className="flex-1 border-2 border-blue-900 text-blue-950 p-3 outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        ref={taskInput}
        placeholder="Enter task"
        name="task"
        value={toDoData.task}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      {todo && (
        <>
          <button
            className="bg-gray-500 px-6 py-3 hover:bg-gray-600 text-white focus:ring-2 focus:ring-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-900 px-6 py-3 hover:bg-blue-950 text-white focus:ring-2 focus:ring-blue-500 rounded-r"
            onClick={onEdit}
          >
            Update
          </button>
        </>
      )}
      {!todo && (
        <button
          className="bg-blue-900 px-6 py-3 hover:bg-blue-950 text-white focus:ring-2 focus:ring-blue-500 rounded-r"
          onClick={onAdd}
        >
          Add
        </button>
      )}
    </form>
  );
};

export default TodoForm;
