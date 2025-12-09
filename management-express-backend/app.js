const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const indexRoutes = require('./routes/index.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/test', (req, res) => {
    res.json({message: 'Test route works!'});
});

// Routes
app.use('/api', indexRoutes);

// Default error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong!'});
});

module.exports = app;