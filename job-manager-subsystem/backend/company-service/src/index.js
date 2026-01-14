const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const { errorHandler } = require('@devvision/common');
const profileRoutes = require("./routes/profile.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/', profileRoutes);

app.use(errorHandler);

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to valid MongoDb');
    } catch (err) {
        console.error(err);
    }

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Company Service listening on port ${port}`);
    });
};

start();
