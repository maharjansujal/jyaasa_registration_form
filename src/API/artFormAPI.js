const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
    student_name: String,
    guardian_name: String,
    birthdate: String,
    address: String,
    gender: String,
    age: String,
    mobile_1: String,
    mobile_2: String,
    email_id: String
})

const ArtStudent = mongoose.model('Art', artSchema);

router.post('/', (req, res) => {
    const { student_name, guardian_name, birthdate, address, gender, age, mobile_1, mobile_2, email_id } = req.body;
    const newArtStudent = new ArtStudent({
        student_name,
        guardian_name,
        birthdate,
        address,
        gender,
        age,
        mobile_1,
        mobile_2,
        email_id
    })
    newArtStudent.save()
        .then(() => { res.status(201).json({ message: "Art student enrolled" }) })
        .catch(err => {
            res.status(400).json({ error: err.message })
        })
})

router.get('/', (req, res) => {
    ArtStudent.find()
        .then(students => res.status(200).json(students))
        .catch(err => res.status(400).json({ error: err.message }))
})

module.exports = router;