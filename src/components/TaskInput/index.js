import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "../TaskList";
import "./index.css";

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const initialTaskList = [];

const TaskInput = () => {
  // State hooks
  const [tasksList, setTasksList] = useState(initialTaskList); // State for the list of tasks
  const [title, setTitle] = useState(""); // State for the task title input
  const [description, setDescription] = useState(""); // State for the task description textarea
  const [isAddDisabled, setIsAddDisabled] = useState(true); // State to disable the add button
  const [dueDate, setDueDate] = useState(getCurrentDate());
  const [status, setStatus] = useState("Pending"); // State for status dropdown
  const [sortOrder, setSortOrder] = useState("All"); // State for sorting criteria

  // Effect hook to load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasksList");
    if (savedTasks) {
      setTasksList(JSON.parse(savedTasks));
    }
  }, []);

  // Effect hook to save tasks to localStorage whenever tasksList changes
  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }, [tasksList]);

  // Event handler to add a new task
  const onAddTask = (event) => {
    event.preventDefault();
    const newTask = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      status,
      isStarred: false,
    };
    console.log(newTask);
    setTasksList((prevTasks) => [...prevTasks, newTask]); // Update tasksList with new task
    setTitle(""); // Clear title input
    setDescription(""); // Clear description textarea
    setDueDate(getCurrentDate());
    setStatus("Pending");
    setIsAddDisabled(true); // Disable add button after adding task
  };

  // Event handler to update the title input and enable/disable add button
  const onChangeTitle = (event) => {
    const { value } = event.target;
    setTitle(value); // Update title state
    setIsAddDisabled(value === "" || description === ""); // Enable/disable add button based on input values
  };

  // Event handler to update the description textarea and enable/disable add button
  const onChangeDescription = (event) => {
    const { value } = event.target;
    setDescription(value); // Update description state
    setIsAddDisabled(title === "" || value === ""); // Enable/disable add button based on input values
  };

  const onChangeDueDate = (event) => {
    const { value } = event.target;
    setDueDate(value);
  };

  const onChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  // Event handler to delete a task
  const deleteTask = (id) => {
    setTasksList((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Event handler to update a task
  const updateTask = (updatedTask) => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Sort tasks based on status
  const getSortedTasks = () => {
    if (sortOrder === "All") return tasksList;
    return tasksList.filter((task) => task.status === sortOrder);
  };

  // Event handler for sorting
  const onSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Render sorted tasks
  const sortedTasksList = getSortedTasks();

  return (
    <div className="app-container">
      <div className="responsive-container">
        <div className="tasks-img-container">
          <form className="form-container" onSubmit={onAddTask}>
            <h1 className="title">Add Task</h1>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              id="title"
              type="text"
              className="title-input-element"
              placeholder="Title"
              onChange={onChangeTitle}
              value={title}
            />
            <label htmlFor="description" className="label">
              DESCRIPTION
            </label>
            <textarea
              id="description"
              cols="5"
              rows="5"
              className="description-input-element"
              value={description}
              onChange={onChangeDescription}
            />

            <label htmlFor="status" className="label">
              STATUS
            </label>
            <select
              id="status"
              className="status-select-element"
              value={status}
              onChange={onChangeStatus}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <label htmlFor="dueDate" className="label">
              DUE DATE
            </label>
            <input
              id="dueDate"
              type="date"
              className="date-input-element"
              value={dueDate}
              onChange={onChangeDueDate}
            />

            <button className="add-btn" type="submit" disabled={isAddDisabled}>
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="tasks"
            className="tasks-img"
          />
        </div>

        <div className="tasks-container">
          <hr />
          <div className="tasks-sort-container">
            <h1 className="tasks-heading">Tasks</h1>
            <div className="sort-container">
              <label htmlFor="sort" className="sort-label">
                Filter By
              </label>
              <select
                id="sort"
                className="sort-select-element"
                value={sortOrder}
                onChange={onSortChange}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <ul className="tasks-lists-container">
            {sortedTasksList.map((task) => (
              <TaskList
                key={task.id}
                taskDetails={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
