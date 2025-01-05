const express = require('express');
const cors = require('cors');  // Import the cors package
const app = express();
const port = 5000;
const mongoDB = require('./db');
mongoDB();

// Use the CORS middleware to allow cross-origin requests
app.use(cors({
  origin: 'http://localhost:3000',  // Allow frontend from localhost:3000
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })



app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
