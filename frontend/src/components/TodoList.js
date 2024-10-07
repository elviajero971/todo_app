import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('${process.env.REACT_APP_URL}/api/todo-lists');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <TodoForm fetchTodos={fetchTodos} />
      <div className="bg-white shadow-md rounded p-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos available.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
