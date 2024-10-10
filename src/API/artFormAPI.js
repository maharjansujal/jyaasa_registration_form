const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const fileUpload = require('express-fileupload');

// router.use(fileUpload());

const uploadToFauxApi = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile.data); // Assuming imageFile comes from req.files.art_photo

    const response = await fetch('https://faux-api.com/api/v1/artstudentsphoto_9767792177413974', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer image',
            'api-name': 'artstudentsphoto',
        },
        body: formData
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Upload failed: ${data.message}`);
    }
    return data;
};

const artSchema = new mongoose.Schema({
    // form_no: String,
    // student_name: String,
    // guardian_name: String,
    // birthdate: String,
    // address: String,
    // gender: String,
    // age: String,
    // mobile_1: String,
    // mobile_2: String,
    // email_id: String,
    // joining_date: String,
    // school_name: String,
    // school_address: String,
    // preferred_time: String,
    // admission_date: String,
    // class_plans: String,
    // number_of_days: String,
    // course_type: String,
    // admission_fee: String,
    // subscription_fee: String,
    art_photo_url: String
})

const ArtStudent = mongoose.model('Art', artSchema);

// router.post('/', (req, res) => {
//     const { student_name,
//         guardian_name,
//         birthdate,
//         address,
//         gender,
//         age,
//         mobile_1,
//         mobile_2,
//         email_id,
//         joining_date,
//         school_name,
//         school_address,
//         admission_date,
//         preferred_time,
//         class_plans,
//         number_of_days,
//         course_type,
//         admission_fee,
//         subscription_fee } = req.body;
//     const newArtStudent = new ArtStudent({
//         student_name,
//         guardian_name,
//         birthdate,
//         address,
//         gender,
//         age,
//         mobile_1,
//         mobile_2,
//         email_id,
//         joining_date,
//         school_name,
//         school_address,
//         admission_date,
//         preferred_time,
//         class_plans,
//         number_of_days,
//         course_type,
//         admission_fee,
//         subscription_fee,
//         art_photo_url
//     })
//     newArtStudent.save()
//         .then(() => { res.status(201).json({ message: "Art student enrolled" }) })
//         .catch(err => {
//             res.status(400).json({ error: err.message })
//         })
// })

router.post('/', async (req, res) => {
    console.log(req.files)
    // const {
    //     form_no,
    //     student_name,
    //     guardian_name,
    //     birthdate,
    //     address,
    //     gender,
    //     age,
    //     mobile_1,
    //     mobile_2,
    //     email_id,
    //     joining_date,
    //     school_name,
    //     school_address,
    //     admission_date,
    //     preferred_time,
    //     class_plans,
    //     number_of_days,
    //     course_type,
    //     admission_fee,
    //     subscription_fee,
    // } = req.body;

    try {
        let art_photo_url = '';
        const art_photo = req.files;
        if (art_photo) {
            art_photo_url = await uploadToFauxApi(art_photo);
        }
        const newArtStudent = new ArtStudent({
            // form_no,
            // student_name,
            // guardian_name,
            // birthdate,
            // address,
            // gender,
            // age,
            // mobile_1,
            // mobile_2,
            // email_id,
            // joining_date,
            // school_name,
            // school_address,
            // admission_date,
            // preferred_time,
            // class_plans,
            // number_of_days,
            // course_type,
            // admission_fee,
            // subscription_fee,
            art_photo_url
        });
        await newArtStudent.save();
        res.status(201).json({ message: "Art student enrolled", art_photo_url });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});


router.get('/', (req, res) => {
    ArtStudent.find()
        .then(students => res.status(200).json(students))
        .catch(err => res.status(400).json({ error: err.message }))
})

module.exports = router;