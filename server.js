// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const expressValidator = require('express-validator');

// configuration
const app = express();
const port = process.env.PORT || 6262;

// middlewares
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(expressValidator())

// db
mongoose.connect(process.env.MONGO_CONN, {
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => console.log(`DB CONNECTED`));

// routes imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');

// routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', messageRoutes);

// listen
const server = app.listen(port, () => {
    console.log(`Running server on localhost:${port}/api`)
})