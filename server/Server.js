const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to the Database
connectDB().then(() => {
  app.listen(4000, () => console.log(`Server running on http://localhost:4000`));
  console.log('Connected to DB');
});

// Routes
app.use("/api/auth", router);

app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Handle not found routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});