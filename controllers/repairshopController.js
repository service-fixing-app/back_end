const db = require('../models')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// image Upload
const multer = require('multer');
const path = require('path')


// create main Model
const Repairshop = db.repairshops

// main work

// 1. create repairshop
const addRepairshop = async (req, res) => {
    try {
      // const {profile_image, document_verify} = req.files;
      const { shop_name, management_name, tel, password, type_service, village, district, province, profile_image, document_verify} = req.body;
  
      // Hash the password
      const hashPassword = await bcrypt.hash(password, 8);
      const data = {
        shop_name,
        management_name,
        tel,
        password : hashPassword,
        type_service,
        village,
        district,
        province,
        profile_image,
        document_verify
        // profile_image: profile_image[0].filename, 
        // document_verify: document_verify[0].filename

      };
      // check user
      let checkRepairshop = await Repairshop.findOne( {where : {tel : tel}})
      if (checkRepairshop == null) {
        const repairshop = await Repairshop.create(data);
        return res.status(201).json({ 
          status: true,
          message: 'ລົງທະບຽນຜູ້ໃຊ້ງານສຳເລັດແລ້ວ!', repairshop });
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
    const repairshop = await Repairshop.findOne({ where: { tel: tel } });

    // If no customer found, return error
    if (!repairshop) {    
      return res.status(401).json({ 
        status: false,
        message: "ຊື່ຜູ້ໃຊ້ບໍ່ຖືກຕ້ອງກະລຸນາລອງໃໝ່!"
      });     
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, repairshop.password);

    if (isMatch) {
      // Generate token with the customer's id and the secretKey
      const token = jwt.sign({ id: repairshop.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });

      // Set JWT token in a cookie
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });

      console.log("customer", JSON.stringify(repairshop, null, 2));
      console.log(token);

      // Send success response with customer data and token
      return res.status(200).json({ 
        status: true,
        message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ!!',
        customer: repairshop,
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

const getAllRepairshop = async (req, res) => {

    let repairshop = await Repairshop.findAll({})
    res.status(200).send(repairshop)

}

// 3. get single user

const getOneRepairshop = async (req, res) => {

    let id = req.params.id
    let repairshop = await Repairshop.findOne({ where: { id: id }})
    res.status(200).send(repairshop)

}

// 4. update user
const updateRepairshop = async (req, res) => {

    let id = req.params.id

    const repairshop = await Repairshop.update(req.body, { where: { id: id }})

    res.status(200).send(repairshop)
   

}

// 5. delete user by id

const deleteRepairshop = async (req, res) => {

    let id = req.params.id
    
    await Repairshop.destroy({ where: { id: id }} )

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
//     limits: { fileSize: '1000000' },
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|gif/
//         const mimeType = fileTypes.test(file.mimetype)  
//         const extname = fileTypes.test(path.extname(file.originalname))

//         if(mimeType && extname) {
//             return cb(null, true)
//         }
//         cb('Give proper files formate to upload')
//     }
// }).fields([{ name: 'profile_image', maxCount: 1 }, { name: 'document_verify', maxCount: 1 }])





module.exports = {
    addRepairshop,
    getAllRepairshop,
    getOneRepairshop,
    updateRepairshop,
    deleteRepairshop,
    // upload,
    login
    
}