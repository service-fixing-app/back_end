const db = require('../models');
const Upload = db.upload;
const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images'); // Set the destination folder for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    }
});

// Create Multer instance
const upload = multer({ storage: storage }).single('image');

// API endpoint to add image
const addImage = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error('Error uploading image:', err);
                return res.status(400).json({ message: 'Image upload failed' });
            }

            // Extract filename from uploaded file
            const imagePath = req.file.path;

            // Save image path to database
            const uploadImage = await Upload.create({ image: imagePath });

            res.status(201).json({
                status: true,
                message: 'Image uploaded successfully!',
                uploadImage
            });
        });
    } catch (error) {
        console.error('Error while adding image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addImage
};
