// seeds/seed.js
require('dotenv').config();

const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const TodoList = require('../models/TodoList');

const MONGO_URI = process.env.MONGO_URI

// Function to get a random date between two dates
const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Function to get a random number between min and max
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Seed data for real-life TodoLists and Todos
const todoListTitles = [
  'Work Project Tasks',
  'Home Improvement Plan',
  'Grocery Shopping List',
  'Weekend Trip Preparation',
  'Monthly Budget Review',
  'Health and Fitness Goals',
];

const todoTemplates = {
  'Work Project Tasks': [
    'Finish report for project X',
    'Email client about new updates',
    'Plan next sprint meeting',
    'Review pull requests',
    'Update documentation',
    'Deploy feature branch to staging',
    'Fix bugs found during testing',
    'Coordinate with design team',
  ],
  'Home Improvement Plan': [
    'Buy paint for the living room',
    'Call plumber to fix the sink',
    'Install new light fixtures',
    'Research landscaping options',
    'Order new curtains',
    'Replace broken window',
    'Plan kitchen renovation',
    'Assemble new bookshelf',
  ],
  'Grocery Shopping List': [
    'Buy milk and eggs',
    'Pick up fresh vegetables',
    'Get a loaf of bread',
    'Buy ingredients for dinner',
    'Grab some snacks for the weekend',
    'Restock on household cleaning supplies',
    'Get fruits for the week',
    'Purchase frozen food items',
  ],
  'Weekend Trip Preparation': [
    'Pack clothes for the trip',
    'Book accommodation',
    'Confirm car rental details',
    'Prepare travel itinerary',
    'Charge camera batteries',
    'Check weather forecast',
    'Buy travel-sized toiletries',
    'Download offline maps',
  ],
  'Monthly Budget Review': [
    'Review utility bills',
    'Check subscription expenses',
    'Track grocery spending',
    'Update budget spreadsheet',
    'Set aside savings for the month',
    'Analyze last month\'s spending trends',
    'Plan for upcoming big expenses',
    'Review credit card statement',
  ],
  'Health and Fitness Goals': [
    'Complete a 5K run',
    'Do yoga 3 times a week',
    'Try a new healthy recipe',
    'Schedule a doctor’s appointment',
    'Track water intake',
    'Take vitamins daily',
    'Get 8 hours of sleep each night',
    'Join a fitness class',
  ],
};

// Main seeding function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected...');

    // Clear existing data
    await TodoList.deleteMany({});
    await Todo.deleteMany({});
    console.log('Existing data cleared');

    // Define the start and end date for random date generation
    const startDate = new Date(2023, 0, 1);  // Start of 2023
    const endDate = new Date();              // Current date

    // Loop through each TodoList title to create the TodoLists and their Todos
    for (const title of todoListTitles) {
      // Create a random creation date for the TodoList
      const todoListCreatedAt = getRandomDate(startDate, endDate);

      // Create between 4 to 8 todos for each TodoList
      const numTodos = getRandomNumber(4, 8);
      const todos = [];
      const templateTodos = todoTemplates[title].slice(0, numTodos);  // Use only the relevant todos for the list

      // Generate Todos with varying completion statuses and creation dates
      templateTodos.forEach((todoTitle, index) => {
        const isCompleted = Math.random() < 0.5; // Randomly complete about half the todos
        const todoCreatedAt = getRandomDate(todoListCreatedAt, endDate);  // Create a random creation date

        todos.push(
          new Todo({
            title: todoTitle,
            completed: isCompleted,
            created_at: todoCreatedAt,
          })
        );
      });

      // Insert the todos into the database
      const savedTodos = await Todo.insertMany(todos);

      // Create a new TodoList and associate the saved todos
      const todoList = new TodoList({
        name: title,
        created_at: todoListCreatedAt,
        todos: savedTodos.map(todo => todo._id),
      });

      // Save the TodoList
      await todoList.save();
      console.log(`Inserted ${title} with ${numTodos} todos`);
    }

    // Close the database connection
    mongoose.connection.close();
    console.log('Database seeded and connection closed');
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
