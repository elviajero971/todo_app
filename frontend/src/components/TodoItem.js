// src/components/TodoItem.js
import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';
import { formatDate } from '../utils/dateUtils';

const TodoItem = ({ todo, fetchTodos, listId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [notification, setNotification] = useState('');

  const toggleComplete = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/api/${listId}/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const saveTitle = async () => {
    if (!newTitle.trim()) {
        setNotification('Todo title cannot be empty.');
        setTimeout(() => {
            setNotification(null);
        }, 3000);
        return;
        }
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/api/${listId}/todos/${todo._id}`, {
        title: newTitle,
      });
      setIsEditing(false);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/api/${listId}/todos/${todo._id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <Notification message={notification} onClose={() => setNotification('')} />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-grow p-2 border rounded-l"
        />
      ) : (
        <div
          onClick={toggleComplete}
          className={`cursor-pointer flex-grow hover:scale-110 ${
            todo.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {todo.title}
        </div>
      )}
      <div className="flex items-center space-x-2">
        {formatDate(todo.created_at)}
      </div>
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <button onClick={saveTitle} className="p-1 text-blue-500 hover:scale-110">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="p-1 text-green-500 hover:scale-110">
            Edit
          </button>
        )}
        <button onClick={deleteTodo} className="p-1 text-red-500 hover:scale-110">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
