import { FaCheckCircle, FaCircle, FaPen, FaTrashAlt } from "react-icons/fa";
import categories from "./Category";

function ToDoItem({ todo, deleteToDo, editToDo, getToDoById }) {
  // Function to handle deletion of a to-do item
  const onDelete = () => {
    deleteToDo(todo._id);
  };

  // Function to handle toggling the completion status of a to-do item
  const onCheck = () => {
    editToDo(todo._id, todo.task, todo.category, !todo.isCompleted);
  };

  // Function to handle editing a to-do item
  const onEdit = () => {
    getToDoById(todo._id);
  };

  return (
    <div className="flex px-4 py-3 items-center rounded mb-3 bg-blue-100 hover:bg-blue-200">
      {/* To-do task content */}
      <p className="flex-1">
        <span className="capitalize">{todo.task}</span>
        {/* Display category badge */}
        {categories.map((category) => {
          if (category.name === todo.category) {
            const { border, text, bg } = category.style;
            return (
              <span
                className={`px-2 py-0 rounded-full border-2 ${border} ${text} ${bg} ml-2 text-sm`}
                key={category.name}
              >
                {category.name}
              </span>
            );
          }
          return null;
        })}
      </p>

      {/* Action buttons */}
      <p className="flex items-center gap-4 p-2 rounded transition-all duration-100">
        {/* Toggle completion status button */}
        <span className="hover:bg-blue-300" onClick={onCheck}>
          {todo.isCompleted ? (
            <FaCheckCircle size={20} color="green" />
          ) : (
            <FaCircle
              className="border-2 border-green-600 rounded-full text-transparent"
              size={19}
            />
          )}
        </span>
        {/* Edit button */}
        <span className="hover:bg-blue-300" onClick={onEdit}>
          <FaPen size={15} color="purple" />
        </span>
        {/* Delete button */}
        <span className="hover:bg-blue-300" onClick={onDelete}>
          <FaTrashAlt size={15} color="red" />
        </span>
      </p>
    </div>
  );
}

export default ToDoItem;
