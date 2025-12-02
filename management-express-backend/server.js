// entrypoint
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const indexRoutes = require('./routes/index.js');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});