import React from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import todoContext from "../context/TodoContext";
import TodoService from "../services/TodoService";
import Header from "../components/Header";

const Home = () => {
  const {
    createTodo,
    getAllTodo,
    getTodoById,
    allTodos,
    todo,
    editTodo,
    deleteToDo,
    isLoading,
    error,
    setTodo,
  } = TodoService();

  return (
    <>
      {/* Render the header component */}
      <Header />

      {/* Provide the ToDoContext with necessary values and functions */}
      <todoContext.Provider
        value={{
          createTodo,
          getAllTodo,
          getTodoById,
          allTodos,
          todo,
          editTodo,
          deleteToDo,
          isLoading,
          error,
          setTodo,
        }}
      >
        {/* Render the ToDoForm component */}
        <TodoForm />

        {/* Render the ToDoList component */}
        <TodoList />
      </todoContext.Provider>
    </>
  );
};

export default Home;
