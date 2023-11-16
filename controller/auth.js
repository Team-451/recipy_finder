import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { fName, lName, email, password, picture } = req.body;

    const newUser = new User({
      fName,
      lName,
      email,
      password,
      picture,
    });
      
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
