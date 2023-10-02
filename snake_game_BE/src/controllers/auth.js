import { generateHash, verifyHash, generateToken } from "../utils/crypt.js";
import User from "../models/user.js";

// login controller
export const login = async (req, res) => {
  try {
    console.log("in login controller");
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).send({ errorMessage: "Invalid credentials" });
    }

    const isMatch = await verifyHash(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ errorMessage: "Invalid credentials" });
    }

    const token = await generateToken({ id: user._id });
    res.status(200).send({ userId: user._id, token });

  } catch (err) {
    console.log("Error occured in login: ", err.message);
    res.status(500).send({ errorMessage: "Error Occured" });
  }
};

// register controller
export const register = async (req, res) => {
  try {
    console.log("in register controller");
    const { userName, email, password } = req.body;

    const savedName = await User.findOne({ userName }).exec();
    if (savedName) {
      return res.status(403).send({ errorMessage: "UserName already exists" });
    }

    const savedEmail = await User.findOne({ email }).exec();
    if (savedEmail) {
      return res.status(403).send({ errorMessage: "Email already exists" });
    }

    const passwordHash = await generateHash(password);

    const newUser = new User({
      userName,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).send({ userId: savedUser._id });

  } catch (err) {
    console.log("Error occured in register: ", err.message);
    res.status(500).send({ errorMessage: "Error Occured" });
  }
};
