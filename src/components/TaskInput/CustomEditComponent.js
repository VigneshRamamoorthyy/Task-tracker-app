import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomEditComponent(props) {
  const { getId, onHide, updateTask } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Fetch and populate form fields with task details when component mounts
  useEffect(() => {
    const tasksList = JSON.parse(localStorage.getItem("tasksList"));
    const taskItem = tasksList.find((item) => item.id === getId);

    if (taskItem) {
      setTitle(taskItem.title);
      setDescription(taskItem.description);
      setStatus(taskItem.status);
      setDueDate(taskItem.dueDate);
    }
  }, [getId]);

  // Handle saving edited task details
  const handleSave = () => {
    let tasksList = JSON.parse(localStorage.getItem("tasksList"));
    const index = tasksList.findIndex((item) => item.id === getId);

    // Update task details in local storage
    tasksList[index] = {
      ...tasksList[index],
      title,
      description,
      status,
      dueDate,
    };

    localStorage.setItem("tasksList", JSON.stringify(tasksList));

    // Update task details in parent component
    updateTask(tasksList[index]);

    // Close the modal
    onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="editTitle">Title</label>
            <input
              type="text"
              className="form-control"
              style={{ marginBottom: "10px" }}
              id="editTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editDescription">Description</label>
            <textarea
              className="form-control"
              id="editDescription"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="editStatus">Status</label>
            <select
              id="editStatus"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="editDueDate">Due Date</label>
            <input
              type="date"
              className="form-control"
              style={{ marginBottom: "10px" }}
              id="editDueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {/* Button to save changes */}
        <Button onClick={handleSave}>Save</Button>
        {/* Button to cancel and close the modal */}
        <Button onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomEditComponent;
