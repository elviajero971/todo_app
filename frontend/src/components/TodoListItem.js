// src/components/TodoListItem.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Notification from './Notification';
import { formatDate } from '../utils/dateUtils';

const TodoListItem = ({ list, fetchTodoLists }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(list.name);
  const [notification, setNotification] = useState('');

  const updateListName = async (id, newName) => {
    if (!newName.trim()) {
      setNotification('List name cannot be empty.');
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      return;
    } else {
      await axios.patch(`${process.env.REACT_APP_URL}/api/todo-lists/${id}`, { name: newName });
      fetchTodoLists();
    }
  };

  const deleteList = async (id) => {
    await axios.delete(`${process.env.REACT_APP_URL}/api/todo-lists/${id}`);
    fetchTodoLists();
  };

  return (
    <>
      <li className="flex justify-between items-center p-2 bg-gray-100 rounded gap-3">
        <Notification message={notification} onClose={() => setNotification('')} />
        {isEditing ? (
          <input
            type="text"
            defaultValue={newName}
            onBlur={(e) => updateListName(list._id, e.target.value)}
            className="p-1 border rounded mx-2"
          />
        ) : (
          <>
            <Link to={`/list/${list._id}`} className="flex-grow text-blue-500">
              {list.name}
            </Link>
            <div>{formatDate(list.created_at)}</div>
            <div>{list.todos.length}</div>
          </>

        )}
        <div className="flex items-center space-x-2">
        {isEditing ? (
          <button onClick={() => setIsEditing(false)} className="text-sm text-blue-500 hover:scale-110">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-sm text-green-500 hover:scale-110">
            Edit
          </button>
        )
      }
          <button onClick={() => deleteList(list._id)} className="text-sm text-red-500 hover:scale-110">
            Delete
          </button>
        </div>
      </li>
    </>
  );
};

export default TodoListItem;
