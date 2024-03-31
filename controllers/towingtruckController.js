const db = require('../models')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// create main Model
const Towingtruck = db.towingtruck

// main work

// 1. create repairshop
const addTowingtruck = async (req, res) => {
    try {
      // const {profile_image, document_verify} = req.files;
      const { shop_name, manager_name, tel, password, age, gender, birthdate, village, district, province, type_service, profile_image, document_verify, role} = req.body;
  
      // Hash the password
      const hashPassword = await bcrypt.hash(password, 8);
      const data = {
        shop_name,
        manager_name,
        tel,
        password : hashPassword,
        age,
        gender,
        birthdate,
        village,
        district,
        province,
        type_service,
        profile_image,
        document_verify,
        role,

      };
      // check user
      let checkTowingtruck = await Towingtruck.findOne( {where : {tel : tel}})
      if (checkTowingtruck == null) {
        const towingtruck = await Towingtruck.create(data);
        return res.status(201).json({ 
          status: true,
          message: 'ລົງທະບຽນຜູ້ໃຊ້ງານສຳເລັດແລ້ວ!', towingtruck });
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
    const towingtruck = await Towingtruck.findOne({ where: { tel: tel } });

    // If no customer found, return error
    if (!towingtruck) {    
      return res.status(401).json({ 
        status: false,
        message: "ຊື່ຜູ້ໃຊ້ບໍ່ຖືກຕ້ອງກະລຸນາລອງໃໝ່!"
      });     
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, towingtruck.password);

    if (isMatch) {
      // Generate token with the customer's id and the secretKey
      const token = jwt.sign({ id: towingtruck.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });

      // Set JWT token in a cookie
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });

      console.log("customer", JSON.stringify(towingtruck, null, 2));
      console.log(token);

      // Send success response with customer data and token
      return res.status(200).json({ 
        status: true,
        message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ!!',
        customer: towingtruck,
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

const getAllTowingtruck = async (req, res) => {

    let towingtruck = await Towingtruck.findAll({})
    res.status(200).send(towingtruck)

}

// 3. get single user

const getOneTowingtruck = async (req, res) => {

    let id = req.params.id
    let towingtruck = await Towingtruck.findOne({ where: { id: id }})
    res.status(200).send(towingtruck)

}

// 4. update user
const updateTowingtruck = async (req, res) => {

    let id = req.params.id

    const towingtruck = await Towingtruck.update(req.body, { where: { id: id }})

    res.status(200).send(towingtruck)
   

}

// 5. delete user by id

const deleteTowingtruck = async (req, res) => {

    let id = req.params.id
    
    await Towingtruck.destroy({ where: { id: id }} )

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
    addTowingtruck,
    getAllTowingtruck,
    getOneTowingtruck,
    updateTowingtruck,
    deleteTowingtruck,
    // upload,
    login
    
}