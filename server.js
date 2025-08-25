const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const connect = require('./db/connection');

app.use(express.json());

app.use('/api/books', bookRoutes);

connect();

const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    })




