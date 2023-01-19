require('./models/Holder');
require('./models/Quest');
require('./models/Project');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const authRoutes =  require('./routes/authRoutes');
const holderRoutes = require('./routes/holderRoutes');
const projectRoutes = require('./routes/projectRoutes');
const twitterRoutes = require('./routes/twitterRoutes');
const questRoutes = require('./routes/questRoutes');
const requireAuth = require('./middlewares/requireAuth');
const cors = require('cors');
require('dotenv').config()


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(holderRoutes);
app.use(projectRoutes);
app.use(questRoutes);
app.use(twitterRoutes);

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo instance");
});

mongoose.connection.on('error', (err) => {
    console.log("Error connecting to mongo ", err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(``);
});

app.listen(3002, () => {
    console.log("Listening on port 3002")
});