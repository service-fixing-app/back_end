const db = require('../models')
const bcrypt = require('bcrypt');

// image Upload
const multer = require('multer');
const path = require('path')


// create main Model
const User = db.user

// main work

// 1. create user
const signup = async (req, res) => {
    try {
      const imagePath = req.file.path;
      const { name, password, age, gender, tel } = req.body;
  
      // Hash the password
      const hashPassword = await bcrypt.hash(password, 8);
      const data = {
        image : imagePath,
        name,
        password : hashPassword,
        age,
        gender,
        tel
      };
      // check user
      let checkUser = await User.findOne( {where : {name : name}})
      if (checkUser == null) {
        const user = await User.create(data);
        return res.status(201).json({ 
          status: true,
          message: 'ລົງທະບຽນຜູ້ໃຊ້ງານສຳເລັດແລ້ວ!', user });
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


// 2. get all user

const getAllUsers = async (req, res) => {

    let user = await User.findAll({})
    res.status(200).send(user)

}

// 3. get single user

const getOneUser = async (req, res) => {

    let id = req.params.id
    let user = await User.findOne({ where: { id: id }})
    res.status(200).send(user)

}

// 4. update user
const updateUser = async (req, res) => {

    let id = req.params.id

    const user = await User.update(req.body, { where: { id: id }})

    res.status(200).send(user)
   

}

// 5. delete user by id

const deleteUser = async (req, res) => {

    let id = req.params.id
    
    await User.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !')

}




// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')





module.exports = {
    signup,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    upload
    
}