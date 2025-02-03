const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/index')
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();

app.use(cors({
  origin : process.env.FRONTEND_URL,
    credentials : true
}

));
app.use(express.json());
app.use(cookieParser())



app.use("/api", router);


app.get('/', (req, res) => {
  res.send('Server is ready');
});


app.post('/api/signup', (req, res) => {
    res.send({ message: 'User signed up successfully' });
});

const PORT = process.env.PORT ;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  console.log('Connected to DB');
});

