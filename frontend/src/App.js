// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoLists from './components/TodoLists';
import Todos from './components/Todos';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoLists />} />
        <Route path="/list/:listId" element={<Todos />} />
      </Routes>
    </Router>
  );
};

export default App;
