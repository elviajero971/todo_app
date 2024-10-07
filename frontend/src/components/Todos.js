import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { Link } from 'react-router-dom';

const Todos = () => {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [sortedTodos, setSortedTodos] = useState([]);
  const [filterCompleted, setFilterCompleted] = useState(null); // null: no filter, true: completed, false: not completed

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${process.env.URL}/api/todo-lists/${listId}`);
      setList(response.data);
      setSortedTodos(response.data.todos);  // Initialize with fetched todos
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [listId]);

  const sortByCreatedAt = () => {
    const sorted = [...sortedTodos].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    setSortedTodos(sorted);
  };

  const sortByTitle = () => {
    const sorted = [...sortedTodos].sort((a, b) => a.title.localeCompare(b.title));
    setSortedTodos(sorted);
  };

  const filterByCompleted = () => {
    // Toggle between completed, not completed, and reset (null)
    if (filterCompleted === null) {
      setFilterCompleted(true);  // Show completed only
    } else if (filterCompleted === true) {
      setFilterCompleted(false); // Show not completed only
    } else {
      setFilterCompleted(null);  // Reset filter
    }
  };

  const filteredTodos = filterCompleted === null
    ? sortedTodos
    : sortedTodos.filter(todo => todo.completed === filterCompleted);

  if (!list) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="flex gap-3">
        <Link to="/" className="mb-4 inline-block hover:scale-110">&larr;</Link>
        <h1 className="text-2xl font-bold mb-4 text-center">{list.name}</h1>
      </div>

      {/* Sorting and Filtering buttons */}
      <div className="flex justify-between mb-4">
        <button onClick={sortByCreatedAt} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sort by Date
        </button>
        <button onClick={sortByTitle} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sort by Title
        </button>
        <button onClick={filterByCompleted} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          {filterCompleted === null ? 'Show All' : filterCompleted ? 'Show Completed' : 'Show Not Completed'}
        </button>
      </div>

      <TodoForm listId={listId} fetchTodos={fetchTodos} />

      <div className="bg-white shadow-md rounded p-4">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500">No todos available.</p>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} listId={listId} />
          ))
        )}
      </div>
    </div>
  );
};

export default Todos;
