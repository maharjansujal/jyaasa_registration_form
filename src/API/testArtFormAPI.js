const express = require('express');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function uploadToFauxApi(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile.data);
    const response = await fetch('https://faux-api.com/api/v1/artstudentsphoto_9767792177413974', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer image',
            'api-name': 'artstudentsphoto',
        },
        body: formData
    });

    const data = await response.json();
    if (response.ok) {
        console.log("Connected to Faux API");
    }
    if (!response.ok) {
        throw new Error(`Upload failed: ${data.message}`);
    }
    return data;
}
uploadToFauxApi()
router.post('/', upload.single('art_photo'), async (req,res)=>{
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        console.log("Received file:", req.file);
        art_photo_url = uploadToFauxApi(req.file);
    // art_photo_url = await uploadToFauxApi(art_photo);
    // console.log(art_photo_url);
})

// const uploadToFauxApi = async (imageFile) => {
//     const formData = new FormData();
//     formData.append('image', imageFile.data); // Assuming imageFile comes from req.files.art_photo

//     const response = await fetch('https://faux-api.com/api/v1/artstudentsphoto_9767792177413974', {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Bearer image',
//             'api-name': 'artstudentsphoto',
//         },
//         body: formData
//     });

//     const data = await response.json();
//     if (response.ok){
//         console.log("Connected to Faux API");
//     }
//     if (!response.ok) {
//         throw new Error(`Upload failed: ${data.message}`);
//     }
//     return data;
// };

const artSchema = new mongoose.Schema({
    art_photo_url: String
})

const ArtStudent = mongoose.model('Art', artSchema);

// router.post('/', async (req, res) => {
//     console.log(req.files)
//     try {
//         let art_photo_url = '';
//         const art_photo = req.files;
//         if (art_photo) {
//             art_photo_url = await uploadToFauxApi(art_photo);
//         }
//         const newArtStudent = new ArtStudent({
//             art_photo_url
//         });
//         await newArtStudent.save();
//         res.status(201).json({ message: "Art student enrolled", art_photo_url });

//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'An error occurred while processing your request' });
//     }
// });


// router.get('/', (req, res) => {
//     ArtStudent.find()
//         .then(students => res.status(200).json(students))
//         .catch(err => res.status(400).json({ error: err.message }))
// })

module.exports = router;