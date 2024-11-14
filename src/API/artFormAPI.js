const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const router = express.Router();
const mongoose = require('mongoose');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const artSchema = new mongoose.Schema({
    art_form_no: String,
    student_name: String,
    guardian_name: String,
    class_duration: String,
    birthdate: String,
    address: String,
    gender: String,
    age: String,
    mobile_1: String,
    mobile_2: String,
    email_id: String,
    joining_date: String,
    school_name: String,
    school_address: String,
    preferred_time: String,
    admission_date: String,
    class_plans: String,
    number_of_days: String,
    course_type: String,
    admission_fee: String,
    subscription_fee: String,
    art_photo_url: String
})

const ArtStudent = mongoose.model('Art', artSchema);

router.post('/', upload.single('art_photo'), async (req, res) => {
    const { art_form_no,
        student_name,
        guardian_name,
        class_duration,
        birthdate,
        address,
        gender,
        age,
        mobile_1,
        mobile_2,
        email_id,
        joining_date,
        school_name,
        school_address,
        admission_date,
        preferred_time,
        class_plans,
        number_of_days,
        course_type,
        admission_fee,
        subscription_fee } = req.body;
        const formData = new FormData();
        formData.append('image', req.file.buffer, 'image.jpg');
    
        const response = await axios.post('https://api.imgur.com/3/image', formData, {
          headers: {
            'Authorization': 'Client-ID aca6d2502f5bfd8', 
            ...formData.getHeaders(), 
          },
        });
    
        const art_photo_url = response.data.data.link;
    const newArtStudent = new ArtStudent({
        art_form_no,
        student_name,
        guardian_name,
        class_duration,
        birthdate,
        address,
        gender,
        age,
        mobile_1,
        mobile_2,
        email_id,
        joining_date,
        school_name,
        school_address,
        admission_date,
        preferred_time,
        class_plans,
        number_of_days,
        course_type,
        admission_fee,
        subscription_fee,
        art_photo_url
    })
    await newArtStudent.save()
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