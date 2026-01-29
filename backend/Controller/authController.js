import User from "../Models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOtp, hashOtp } from "../Services/OTPServices.js";
import { sendOtpEmail } from "../Services/EmailService.js";
import { moveTempProfile } from "../Middleware/multerMiddleware.js";

export const register = async (req, res) => {
  try {
    const { firstname, lastname, password, username, email } = req.body;
    console.log(firstname, lastname, password, username, email);

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      photo: req.file ? req.file.filename : null,
    });

    moveTempProfile(username, user._id);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { loginId, password } = req.body;
    console.log(loginId, password);

    if (!loginId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      $or: [{ email: loginId }, { username: loginId }],
    });

    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "Invalid creddddentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.username}`,
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  console.log(email);

  const user = await User.findOne({ email: email });

  console.log(user);

  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOtp();
  user.resetOTP = hashOtp(otp);
  user.resetOTPexpiry = Date.now() + 10 * 60 * 1000;

  await user.save();

  await sendOtpEmail(email, otp);
  res.json({ message: "OTP sent to email" });
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log(email, otp);

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);

    const isOtpValid =
      user.resetOTP === hashOtp(otp) && Date.now() < user.resetOTPexpiry;

    console.log(isOtpValid);

    if (!isOtpValid) {
      return res
        .status(401)
        .json({ message: "Incorrect OTP/Request timed out" });
    }

    return res.status(201).json({ message: "OTP verified Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Somethign went wrong please try again" });
    }

    console.log(user);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    return res.status(201).json({ message: "Password Updated Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
