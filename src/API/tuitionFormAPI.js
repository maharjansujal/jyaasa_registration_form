const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
const tuitionSchema = new mongoose.Schema({
    tuition_form_no: String,
    joining_date: String,
    preferred_time: String,
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
    chosen_subjects: String,
    admission_fee: String,
    subscription_fee: String
});

const TuitionStudent = mongoose.model('Tuition', tuitionSchema);

router.post('/', (req,res)=>{
    console.log(req.body);
    const {tuition_form_no,
        joining_date,
        preferred_time,
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
    const newTuitionStudent = new TuitionStudent({
        tuition_form_no,
        preferred_time,
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
        preferred_time,
        college_name,
        college_address,
        class_type,
        chosen_subjects,
        admission_fee,
        subscription_fee
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