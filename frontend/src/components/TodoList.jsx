import React, { useContext,useEffect } from "react";
import ToDoItem from "./TodoItem";
import Info from "./Info";
import todoContext from "../context/TodoContext";

const TodoList = () => {
  const {
    allTodos,
    getAllTodo,
    editTodo,
    deleteToDo,
    getTodoById,
    isLoading,
    error,
  } = useContext(todoContext);

  // Fetch all to-do items when component mounts
  useEffect(() => {
    getAllTodo();
  }, []);

  return (
    <section className="my-4 mx-8">
      {isLoading ? (
        <Info message="Loading..." />
      ) : (
        <>
          {/* Display to-do items if available */}
          {allTodos && allTodos.length > 0 ? (
            allTodos.map((todo) => (
              <ToDoItem
                todo={todo}
                key={todo._id}
                deleteToDo={deleteToDo}
                editToDo={editTodo}
                getToDoById={getTodoById}
              />
            ))
          ) : (
            <Info message="You have no tasks to complete!" />
          )}
        </>
      )}

      {/* Display error message if there is an error */}
      {!isLoading && error && (
        <Info message="Unable to process your request now. Please try again later!" />
      )}
    </section>
  );
};

export default TodoList;
