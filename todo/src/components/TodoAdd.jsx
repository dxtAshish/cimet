import React, { useState, useEffect } from 'react';
import './todoStyle.css'
const TodoAdd = () => {
  const [todo, setTodo] = useState('');
  const [todoArr, setTodoArr] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() !== "") {
      if (isEditing) {
        // Update the existing todo if in edit mode
        const updatedTodos = todoArr.map((item, index) => 
          index === editIndex ? { ...item, text: todo } : item
        );
        setTodoArr(updatedTodos);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        // Add new todo
        setTodoArr((prev) => [...prev, { text: todo, completed: false }]);
      }
      setTodo(''); // Clear the input after adding/editing
    }
  };

  useEffect(() => {
    const todolist = localStorage.getItem('todos');
    if (todolist) {
      setTodoArr(JSON.parse(todolist)); // Parse the stored string to array
    }
  }, []);

  useEffect(() => {
    if (todoArr.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todoArr)); // Save updated array
    }
  }, [todoArr]);

  const handleDelete = (ind) => {
    const updatedTodos = todoArr.filter((_, index) => index !== ind);
    setTodoArr(updatedTodos); // Update the state with the new array
  };

  const handleEdit = (index) => {
    setTodo(todoArr[index].text);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todoArr.map((item, idx) =>
      idx === index ? { ...item, completed: !item.completed } : item
    );
    setTodoArr(updatedTodos);
  };

  return (
    <div className="todo-container">
    <input type="text" onChange={handleChange} value={todo} />
    <button type="submit" onClick={handleSubmit}>
      {isEditing ? 'Update Todo' : 'Add Todo'}
    </button>
    <ul>
      {todoArr.map((item, index) => (
        <div
          key={index}
          className={`todo-item ${item.completed ? 'completed' : ''}`}
        >
          <h3 className="todo-text">{item.text}</h3>
          <div>
            <button onClick={() => handleDelete(index)}>Delete</button>
            <label htmlFor={`complete-${index}`}>Complete</label>
            <input
              id={`complete-${index}`}
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <button className="edit-btn" onClick={() => handleEdit(index)}>
              Edit
            </button>
          </div>
        </div>
      ))}
    </ul>
  </div>
  
  );
};

export default TodoAdd;
