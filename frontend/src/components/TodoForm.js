// src/components/TodoForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';

const TodoForm = ({ listId, fetchTodos }) => {
  const [title, setTitle] = useState('');
  const [notification, setNotification] = useState('');

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
        setNotification('Todo title cannot be empty.');
        setTimeout(() => {
            setNotification(null);
        }, 3000);
        return;
    } else {
        await axios.post(`${process.env.URL}/api/${listId}/todos`, { title: title, created_at: Date.now() });
        setTitle('');
        fetchTodos();
    }
  };

  return (
    <form onSubmit={addTodo} className="flex mb-4">
        <Notification message={notification} onClose={() => setNotification('')} />
      <input
        type="text"
        className="flex-grow p-2 border rounded-l"
        placeholder="Add a new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-r hover:font-extrabold hover:bg-blue-800">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
