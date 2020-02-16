/**
 * @Date:   2020-01-20T09:39:40+00:00
 * @Last modified time: 2020-02-06T13:25:25+00:00
 */



const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

app.use('/uploads', express.static('uploads'));


mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('MongoDB database connection established successfully')
});

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})

const updateRouter = require('./routes/updates')
const authRouter = require('./routes/auth');
const contactRouter = require('./routes/contact');
const showsRouter = require('./routes/shows');
const episodesRouter = require('./routes/episodes');
const moviesRouter = require('./routes/movies');

app.use('/updates', updateRouter);
app.use('/contact', contactRouter);
app.use('/episodes', episodesRouter);
app.use('/shows', showsRouter);
app.use('/movies', moviesRouter);
app.use('/account', authRouter);
