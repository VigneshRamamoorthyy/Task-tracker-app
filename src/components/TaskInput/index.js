import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "../TaskList";
import "./index.css";

const initialTodoList = [];

const TaskInput = () => {
  // State hooks
  const [todosList, setTodosList] = useState(initialTodoList); // State for the list of todos
  const [title, setTitle] = useState(""); // State for the todo title input
  const [description, setDescription] = useState(""); // State for the todo description textarea
  const [isAddDisabled, setIsAddDisabled] = useState(true); // State to disable the add button
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending"); // State for status dropdown
  const [sortOrder, setSortOrder] = useState("All"); // State for sorting criteria

  // Effect hook to load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todosList");
    if (savedTodos) {
      setTodosList(JSON.parse(savedTodos));
    }
  }, []);

  // Effect hook to save todos to localStorage whenever todosList changes
  useEffect(() => {
    localStorage.setItem("todosList", JSON.stringify(todosList));
  }, [todosList]);

  // Event handler to add a new todo
  const onAddTodos = (event) => {
    event.preventDefault();
    const newTodo = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      status,
      isStarred: false,
    };
    console.log(newTodo);
    setTodosList((prevTodos) => [...prevTodos, newTodo]); // Update todosList with new todo
    setTitle(""); // Clear title input
    setDescription(""); // Clear description textarea
    setDueDate("");
    setStatus("Pending");
    setIsAddDisabled(true); // Disable add button after adding todo
  };

  // Event handler to update the title input and enable/disable add button
  const onChangeName = (event) => {
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

  // Event handler to delete a todo
  const deleteTodo = (id) => {
    setTodosList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Event handler to update a todo
  const updateTask = (updatedTask) => {
    setTodosList((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTask.id ? updatedTask : todo))
    );
  };

  // Sort todos based on status
  const getSortedTodos = () => {
    if (sortOrder === "All") return todosList;
    return todosList.filter((todo) => todo.status === sortOrder);
  };

  // Event handler for sorting
  const onSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Render sorted todos
  const sortedTodosList = getSortedTodos();

  return (
    <div className="app-container">
      <div className="responsive-container">
        <div className="todos-img-container">
          <form className="form-container" onSubmit={onAddTodos}>
            <h1 className="title">Add Task</h1>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              id="title"
              type="text"
              className="title-input-element"
              placeholder="Title"
              onChange={onChangeName}
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
            alt="todos"
            className="todos-img"
          />
        </div>

        <div className="todos-container">
          <hr />
          <div className="todos-sort-container">
            <h1 className="todos-heading">Tasks</h1>
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
          <ul className="todos-lists-container">
            {sortedTodosList.map((todo) => (
              <TaskList
                key={todo.id}
                todosDetails={todo}
                deleteTodo={deleteTodo}
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
