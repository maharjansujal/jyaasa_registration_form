const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://sujalmaharjan:sujal123@cluster0.wisam.mongodb.net/Art_Registration_Form?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/src/HTML', express.static(path.join(__dirname, '..', 'src', 'HTML')));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'HTML', 'index.html'));
});

// Import routes for the APIs
const artFormAPI = require(path.join(__dirname, '..', 'src', 'services', 'artFormAPI'));
const tuitionFormAPI = require(path.join(__dirname, '..', 'src', 'services', 'tuitionFormAPI'));

app.use('/api/art', artFormAPI);
app.use('/api/tuition', tuitionFormAPI);

// Start the server
app.listen(3000, async () => {
    console.log('Server is running on port 3000...');
    const { default: open } = await import('open');
    await open('http://localhost:3000');
});
