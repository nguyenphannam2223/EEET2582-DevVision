const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { errorHandler, kafkaWrapper } = require("@devvision/common");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

app.use(errorHandler);

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    if (!process.env.KAFKA_CLIENT_ID) {
      throw new Error("KAFKA_CLIENT_ID must be defined");
    }
    if (!process.env.KAFKA_BROKERS) {
      throw new Error("KAFKA_BROKERS must be defined");
    }

    try {
        await kafkaWrapper.connect(
          process.env.KAFKA_CLIENT_ID,
          process.env.KAFKA_BROKERS
        );
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to valid MongoDb');
    } catch (err) {
        console.error(err);
    }

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Auth Service listening on port ${port}`);
    });
};

start();
