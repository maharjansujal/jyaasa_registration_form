require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/src/HTML', express.static(path.join(__dirname, 'src', 'HTML')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/HTML/index.html'));
});

const artFormAPI = require('./src/API/artFormAPI');
const testArtFormAPI = require('./src/API/testArtFormAPI');

app.use('/api/art', artFormAPI);
app.use('/api/test-art', testArtFormAPI);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
