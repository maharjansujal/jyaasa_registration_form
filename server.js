const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://sujalmaharjan:sujal123@cluster0.wisam.mongodb.net/Art_Registration_Form?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/src/HTML', express.static(path.join(__dirname, 'src', 'HTML')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/HTML/index.html'));
  });
const artFormAPI = require('./src/API/artFormAPI');
const testArtFormAPI = require('./src/API/testArtFormAPI');

// const tuitionFormAPI = require('./src/API/tuitionFormAPI');

app.use('/api/art', artFormAPI);
app.use('/api/test-art', testArtFormAPI);
// app.use('/api/tuition', tuitionFormAPI);

app.listen(3000, async()=>{
    console.log('Server is running on port 3000...'); 
    const { default: open } = await import('open');
    await open('http://localhost:3000');
})