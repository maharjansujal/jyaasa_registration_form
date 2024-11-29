const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const router = express.Router();
const mongoose = require('mongoose');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const tuitionSchema = new mongoose.Schema({
    tuition_form_no: String,
    joining_date: String,
    preferred_time: String,
    class_duration: String,
    admission_date: String,
    student_name: String,
    guardian_name: String,
    birthdate: String,
    address: String,
    gender: String,
    age: String,
    mobile_1: String,
    mobile_2: String,
    email_id: String,
    college_name: String,
    college_address: String,
    class_type: String,
    chosen_subjects: [String],
    admission_fee: String,
    subscription_fee: String,
    tuition_photo_url: String
});

const TuitionStudent = mongoose.model('Tuition', tuitionSchema);

router.post('/',upload.single('tuition_photo'), async(req,res)=>{
    const {
        tuition_form_no,
        joining_date,
        preferred_time,
        class_duration,
        admission_date,
        student_name,
        guardian_name,
        birthdate,
        address,
        gender,
        age,
        mobile_1,
        mobile_2,
        email_id,
        college_name,
        college_address,
        class_type,
        chosen_subjects,
        admission_fee,
        subscription_fee
    } = req.body;
    const formData = new FormData();
        formData.append('image', req.file.buffer, 'image.jpg');
    
        const response = await axios.post('https://api.imgur.com/3/image', formData, {
          headers: {
            'Authorization': 'Client-ID aca6d2502f5bfd8', 
            ...formData.getHeaders(), 
          },
        });
    
        const tuition_photo_url = response.data.data.link;
    const newTuitionStudent = new TuitionStudent({
        tuition_form_no,
        preferred_time,
        class_duration,
        admission_date,
        student_name,
        guardian_name,
        birthdate,
        address,
        gender,
        age,
        mobile_1,
        mobile_2,
        email_id,
        joining_date,
        college_name,
        college_address,
        class_type,
        chosen_subjects,
        admission_fee,
        subscription_fee,
        tuition_photo_url
    })
    console.log(newTuitionStudent);
    newTuitionStudent.save()
    .then(()=>{res.status(201).json({message: "Tuition student enrolled"})})
    .catch(err=>{
        res.status(400).json({error: err.message})
    })
})

router.get('/', (req, res)=>{
    TuitionStudent.find()
   .then(students=>res.status(200).json(students))
   .catch(err=>res.status(400).json({error: err.message}))
})

module.exports = router;