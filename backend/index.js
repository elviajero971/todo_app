const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const PORT = process.env.PORT || 5033;
const URI = process.env.MONGO_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    app.get('/', (req, res) => {
        res.send('API is running...');
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Routes
const todosRouter = require('./routes/todos');
const todoListsRouter = require('./routes/todoLists');
app.use('/api/todo-lists', todoListsRouter);
app.use('/api', todosRouter);