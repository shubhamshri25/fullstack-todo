import React, { useState } from "react";
import axios, { all } from "axios";
import toast from "react-hot-toast";

const TodoService = () => {
  const [allTodos, setAllTodos] = useState([]); // Ensure initial state is an array
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // getting all the todo
  const getAllTodo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}`);

      setError(false);
      const data = response.data;
      //   console.log(data.message);

      setAllTodos(data.message || []);
      toast.success("Todos fetched Successfully");
    } catch (error) {
      setError(true);
      setAllTodos([]); // Set to an empty array in case of error
      toast.error(
        (error.response && error.response.data.message) || error.message
      );
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  // get todo By id
  const getTodoById = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      setError(false);

      const data = response.data;
      setTodo(data.message);
      toast.success("Todo  fetched Successfully");
    } catch (error) {
      setError(true);
      setTodo([]);
      toast.error(
        (error.response && error.response.data.message) || error.message
      );
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  // creating new todo
  const createTodo = async (task, category) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}`, { task, category });

      setError(false);
      toast.success(response.data.message);

      getAllTodo();
    } catch (error) {
      setError(true);
      toast.error(
        (error.response && error.response.data.message) || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // edit a todo
  const editTodo = async (id, task, category, isCompleted) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`${baseUrl}/${id}`, {
        task,
        category,
        isCompleted,
      });

      setError(false);
      setTodo(null);

      toast.success(response.data.message);
      getAllTodo();
    } catch (error) {
      setError(true);
      toast.error(
        (error.response && error.response.data.message) || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // deleting a todo
  const deleteToDo = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      setError(false);
      toast.success(response.data.message);
      getAllTodo(); // Fetch all to-dos to update the list
    } catch (error) {
      setError(true);
      toast.error(
        (error.response && error.response.data.message) || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};

export default TodoService;
