// src/components/TodoListForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';

const TodoListForm = ({ fetchTodoLists }) => {
  const [listName, setListName] = useState('');
  const [notification, setNotification] = useState('');

  const createTodoList = async () => {
    if (!listName.trim()) {
      setNotification('List name cannot be empty.');
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      return;
    }
    await axios.post('${process.env.REACT_APP_URL}/api/todo-lists', { name: listName, created_at: Date.now() });
    setListName('');
    fetchTodoLists();
  };

  return (
    <div className="mb-4">
      <Notification message={notification} onClose={() => setNotification('')} />
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="Enter new list name"
        className="p-2 border rounded w-full"
      />
      <button onClick={createTodoList} className="p-2 mt-2 bg-blue-500 hover:font-extrabold hover:bg-blue-800 text-white rounded w-full">
        Create New List
      </button>
    </div>
  );
};

export default TodoListForm;
