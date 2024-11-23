import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "./index.css";
import { useState } from "react";
import CustomEditComponent from "../TaskInput/CustomEditComponent";

const TaskList = (props) => {
  // Destructure props to get todosDetails, toggleIsCompleted, deleteTodo, and updateTask
  const { todosDetails, deleteTodo, updateTask } = props;
  const { id, title, description, dueDate, status } = todosDetails; // Destructure todosDetails

  const [modalShow, setModalShow] = useState(false); // State for modal visibility

  // Event handler for deleting a task
  const onClickDeleteItem = () => {
    deleteTodo(id);
  };

  // Callback function to handle updating a task
  const handleUpdateTask = (updatedTask) => {
    updateTask(updatedTask);
  };

  return (
    <li className="todos-task-list">
      <div className="todos-task-container">
        <div className="todos-task-title-description-container">
          <p className="todos-task-title">{title}</p>
          <p className="todos-task-description">{description}</p>
          <p className="todos-task-status">{status}</p>
          <p className="todos-task-duedate">{dueDate}</p>
        </div>

        <div className="todos-task-delete-edit-btn">
          {/* Button to delete a task */}
          <button
            className="todos-task-delete-edit-btn"
            onClick={onClickDeleteItem}
          >
            <MdOutlineDelete size={20} color="#cc0000" />
          </button>

          {/* Button to edit a task */}
          <button
            className="todos-task-delete-edit-btn"
            onClick={() => setModalShow(true)}
          >
            <FaRegEdit size={20} color="#66b3ff" />
          </button>

          {/* Edit modal component */}
          <CustomEditComponent
            getId={id} // Pass task id to Edit modal
            show={modalShow} // Show modal state
            onHide={() => setModalShow(false)} // Hide modal callback
            updateTask={handleUpdateTask} // Callback to update task
          />
        </div>
      </div>
    </li>
  );
};

export default TaskList;
