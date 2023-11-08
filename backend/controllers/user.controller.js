const UserModel = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if 'name' and 'email' are provided in the request body
    if (!name || !email)
      return res.status(400).json({
        message: "Please provide the required fields. name/email missing",
      });

    // Check if the user with the same email already exists
    const isUserExists = await UserModel.findOne({ email: email });
    if (isUserExists)
      return res.status(409).json({ message: "User already exists" });

    // Create a new user instance and save it to the database
    const newUserInstance = new UserModel({ name, email });
    const savedUser = await newUserInstance.save();

    // Respond with a 201 status code and the saved user data
    res
      .status(201)
      .json({ message: "Successfully Registered", user: savedUser });
  } catch (error) {
    console.log("Error saving user => ", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

module.exports = { registerUser };
