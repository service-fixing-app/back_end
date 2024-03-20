const db = require('../models')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// image Upload
const multer = require('multer');
const path = require('path')
const fs = require('fs').promises;


// create main Model
const Customer = db.customers

// main work

// 1. create user
const addCustomer = async (req, res) => {
    try {
      // if (!req.file) {
      //   return res.status(400).json({ message: 'No file uploaded' });
      // }
      // const imagePath = req.file.path;
      const { first_name, last_name, tel, password, age, gender, birthdate, village, district, province, profile_image} = req.body;
  
      // Hash the password
      const hashPassword = await bcrypt.hash(password, 8);
      const data = {
        first_name,
        last_name,
        tel,
        password : hashPassword,
        age,
        gender,
        birthdate,
        village,
        district,
        province,
        profile_image
        // profile_image : imagePath
      };
      // check user
      let checkCustomer = await Customer.findOne( {where : {tel : tel}})
      if (checkCustomer == null) {
        const customer = await Customer.create(data);
        return res.status(201).json({ 
          status: true,
          message: 'ລົງທະບຽນຜູ້ໃຊ້ງານສຳເລັດແລ້ວ!', customer });
      }
      else{
        res.status(409).json({
          status: false,
          message: "ຊື່ຜູ້ໃຊ້ນີ້ມີຄົນໃຊ້ແລ້ວ ກາລຸນາທົງທະບຽນໃໝ່"
        })
      }
     
    } catch (error) {
      console.error('Error while creating a new user:', error);
      return res.status(400).json({ message: 'ລົງທະບຽນຜູ້ໃຊ້ງານຜິດພາດ' });
    }
  };


// login customer
const login = async (req, res) => {
  try {
    const { tel, password } = req.body;

    // Find a customer by their telephone number
    const customer = await Customer.findOne({ where: { tel: tel } });

    // If no customer found, return error
    if (!customer) {
      return res.status(401).json({
        status: false,
        message: "ຊື່ຜູ້ໃຊ້ບໍ່ຖືກຕ້ອງກະລຸນາລອງໃໝ່!"
      });
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, customer.password);

    if (isMatch) {
      // Generate token with the customer's id and the secretKey
      const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });

      // Set JWT token in a cookie
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });

      console.log("customer", JSON.stringify(customer, null, 2));
      console.log(token);

      // Send success response with customer data and token
      return res.status(200).json({ 
        status: true,
        message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ!!',
        customer: customer,
        token: token 
      });
    } else {
      // Password does not match
      return res.status(401).json({
        status: false,
        message: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ!"
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      status: false,
      message: "Internal server error."
    });
  }
};

// 2. get all user

const getAllCustomers = async (req, res) => {

    let customer = await Customer.findAll({})
    res.status(200).send(customer)

}

// 3. get single user

const getOneCustomer = async (req, res) => {

    let id = req.params.id
    let customer = await Customer.findOne({ where: { id: id }})
    res.status(200).send(customer)

}

// 4. update user
const updateCustomer = async (req, res) => {

    let id = req.params.id

    const customer = await Customer.update(req.body, { where: { id: id }})

    res.status(200).send(customer)
   

}

const getOneImage = async (req, res) => {
  try {
      let imageName = req.params.imageName; // Assuming your image file name is passed in the URL parameter
      let imagePath = path.join(__dirname, 'images', imageName);
      
      // Check if the file exists
      const fileExists = await fs.access(imagePath).then(() => true).catch(() => false);
      
      if (!fileExists) {
          return res.status(404).send("Image not found");
      }

      // Send the image file
      res.sendFile(imagePath);
  } catch (error) {
      console.error("Error retrieving image:", error);
      res.status(500).send("Internal Server Error");
  }
}

// 5. delete user by id

const deleteCustomer = async (req, res) => {

    let id = req.params.id
    
    await Customer.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !')

}


// 8. Upload Image Controller

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage,
//     // limits: { fileSize: '1000000' },
//     // fileFilter: (req, file, cb) => {
//     //     const fileTypes = /jpeg|jpg|png|gif/
//     //     const mimeType = fileTypes.test(file.mimetype)  
//     //     const extname = fileTypes.test(path.extname(file.originalname))

//     //     if(mimeType && extname) {
//     //         return cb(null, true)
//     //     }
//     //     cb('Give proper files formate to upload')
//     // }
// }).single('profile_image')





module.exports = {
    addCustomer,
    getAllCustomers,
    getOneCustomer,
    updateCustomer,
    deleteCustomer,
    // upload,
    login,
    getOneImage
    
}