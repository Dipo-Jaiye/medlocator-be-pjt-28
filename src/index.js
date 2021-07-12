const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const authroutes = require('./routes/userRoutes');
const dbSetup = require('./db');
const { PORT } = require('./config/constants');
const port = process.env.port || PORT;

// Connect to the database
dbSetup();

// Initialize the express app
const app = express();

// Use the cors package
app.use(cors());

app.set('views', './src/views');
app.set('view engine', 'ejs');

// Parse Cookie
app.use(cookieParser());

// Initialize middleware
app.use(express.json());

// Handle all routes
app.use('/', router);
app.use('/api/v1/auth', authroutes);

// Start listening
app.listen(port, () => console.log(`App running on port ${port}`));
