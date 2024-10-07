// src/components/TodoLists.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoListForm from './TodoListForm';
import TodoListItem from './TodoListItem';

const TodoLists = () => {
  const [todoLists, setTodoLists] = useState([]);

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const fetchTodoLists = async () => {
    const response = await axios.get('http://localhost:5033/api/todo-lists');
    setTodoLists(response.data);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo Lists</h1>
      <TodoListForm fetchTodoLists={fetchTodoLists} />
      <ul className="space-y-4">
        {todoLists.map((list) => (
          <TodoListItem key={list._id} list={list} fetchTodoLists={fetchTodoLists} />
        ))}
      </ul>
    </div>
  );
};

export default TodoLists;
