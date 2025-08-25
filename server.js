const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');

const uri = process.env.MONGO_URI;


mongoose.connect(uri)
.then(() => {
    console.log('Successfully connected to MongoDB!')

    app.use(express.json());

    app.use('/api/books', bookRoutes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    })
})
.catch(error => console.error('Connection error', error))


