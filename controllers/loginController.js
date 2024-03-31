const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Customer = db.customers;
const RepairShop = db.repairshops;
const TowingShop = db.towingtruck;

const getAllUsers = async (req, res) => {
  try {
    // Join all user tables
    const allUsers = await Customer.findAll({ raw: true }).then((customers) => {
      return RepairShop.findAll({ raw: true }).then((repairShops) => {
        return TowingShop.findAll({ raw: true }).then((towingShops) => {
          return {
            customers,
            repairShops,
            towingShops,
          };
        });
      });
    });

    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { tel, password } = req.body;

    // Find user based on userType
    let user = await Customer.findOne({ where: { tel : tel } });
    if (!user) {
      user = await RepairShop.findOne({ where: { tel : tel } });
      if (!user) {
        user = await TowingShop.findOne({ where: { tel : tel } });
        if (!user) {
          return res.status(401).json({ success: false, message: 'User not found' });
        }
      }
    }

    // If no user found, return error
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "ຊື່ຜູ້ໃຊ້ບໍ່ຖືກຕ້ອງກະລຸນາລອງໃໝ່!",
      });
    }

    // Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Generate token with the user's id and the secretKey
      const token = jwt.sign(
        { id: user.id},
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        }
      );

      // Set JWT token in a cookie
      res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      // Send success response with user data and token
      return res.status(200).json({
        status: true,
        message: "ເຂົ້າສູ່ລະບົບສຳເລັດ!!",
        user: user,
        token: token,
      });
    } else {
      // Password does not match
      return res.status(401).json({
        status: false,
        message: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ!",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

const getUserById = async (req, res) => {
    try {
      let id = req.params.id;
  
      // Find user based on userType
      let user = await Customer.findOne({ where: { id: id }});
      if (!user) {
        user = await RepairShop.findOne({ where: { id: id }});
        if (!user) {
          user = await TowingShop.findOne({ where: { id: id }});
          if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
        }
      }
  
      // If no user found, return error
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Send success response with user data
      return res.status(200).json({
        success: true,
        user: user,
      });
    } catch (error) {
      console.error("Error getting user by ID:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  };
  
  

module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
};
