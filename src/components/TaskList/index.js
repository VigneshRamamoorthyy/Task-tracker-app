import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "./index.css";
import { useState } from "react";
import CustomEditComponent from "../TaskInput/CustomEditComponent";

const TaskList = (props) => {
  // Destructure props to get tasksDetails, deleteTask, and updateTask
  const { tasksDetails, deleteTask, updateTask } = props;
  const { id, title, description, dueDate, status } = tasksDetails; // Destructure tasksDetails

  const [modalShow, setModalShow] = useState(false); // State for modal visibility

  // Event handler for deleting a task
  const onClickDeleteItem = () => {
    deleteTask(id);
  };

  // Callback function to handle updating a task
  const handleUpdateTask = (updatedTask) => {
    updateTask(updatedTask);
  };

  return (
    <li className="tasks-task-list">
      <div className="tasks-task-container">
        <div className="tasks-task-title-description-container">
          <p className="tasks-task-title">{title}</p>
          <p className="tasks-task-description">{description}</p>
          <p className="tasks-task-status">{status}</p>
          <p className="tasks-task-duedate">{dueDate}</p>
        </div>

        <div className="tasks-task-delete-edit-btn">
          {/* Button to delete a task */}
          <button
            className="tasks-task-delete-edit-btn"
            onClick={onClickDeleteItem}
          >
            <MdOutlineDelete size={20} color="#cc0000" />
          </button>

          {/* Button to edit a task */}
          <button
            className="tasks-task-delete-edit-btn"
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
