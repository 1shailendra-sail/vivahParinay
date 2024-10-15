const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator'); // For generating OTPs

// // Sign Up
// exports.signup = async (req, res) => {
//   const { name, username, gender, email, mobile, password } = req.body;

//   try {
//     // Check if user already exists
//     let user = await User.findOne({ mobile });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate OTP
//     const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

//     // Create new user
//     user = new User({
//       name,
//       username,
//       gender,
//       email,
//       mobile,
//       password: hashedPassword,
//       otp,
//       otpExpires: Date.now() + 300000 // OTP expires in 5 minutes
//     });

//     await user.save();

//     // Send OTP to user's mobile number (implement SMS sending in production)
//     console.log(`OTP sent to ${mobile}: ${otp}`);

//     res.status(201).json({ message: 'Signup successful, OTP sent to mobile' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Verify OTP
// exports.verifyOtp = async (req, res) => {
//   const { mobile, otp } = req.body;

//   try {
//     // Find user by mobile
//     const user = await User.findOne({ mobile });

//     if (!user) return res.status(400).json({ message: 'User not found' });

//     // Check if OTP is valid and not expired
//     if (user.otp === otp && user.otpExpires > Date.now()) {
//       // OTP verified
//       user.otp = null; // Clear OTP after verification
//       user.otpExpires = null;
//       await user.save();
//       res.status(200).json({ message: 'OTP verified successfully' });
//     } else {
//       res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Login
// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find user by username
//     const user = await User.findOne({ username });

//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate JWT token (replace 'secret' with a real secret in production)
//     const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Forgot Password (Send OTP)
// exports.forgotPassword = async (req, res) => {
//   const { mobile } = req.body;

//   try {
//     const user = await User.findOne({ mobile });

//     if (!user) return res.status(400).json({ message: 'User not found' });

//     // Generate OTP
//     const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
//     user.otp = otp;
//     user.otpExpires = Date.now() + 300000; // OTP expires in 5 minutes

//     await user.save();

//     // Send OTP to user's mobile number (implement SMS sending in production)
//     console.log(`Reset OTP sent to ${mobile}: ${otp}`);

//     res.status(200).json({ message: 'OTP sent to reset password' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Reset Password (Verify OTP and Reset)
// exports.resetPassword = async (req, res) => {
//   const { mobile, otp, newPassword } = req.body;

//   try {
//     const user = await User.findOne({ mobile });

//     if (!user) return res.status(400).json({ message: 'User not found' });

//     // Check OTP validity
//     if (user.otp === otp && user.otpExpires > Date.now()) {
//       // OTP verified, reset password
//       user.password = await bcrypt.hash(newPassword, 10);
//       user.otp = null; // Clear OTP after reset
//       user.otpExpires = null;

//       await user.save();
//       res.status(200).json({ message: 'Password reset successful' });
//     } else {
//       res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// // Fetch user profile
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId); // userId is from JWT token
//     if (!user) return res.status(404).json({ message: 'User not found' });
    
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Update user profile
// exports.updateProfile = async (req, res) => {
//   const { name, fatherName, motherName, height, location, age, address, qualification, work, monthlyEarnings, caste, gender, profilePhoto } = req.body;

//   try {
//     const user = await User.findById(req.userId); // userId is from JWT token
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Update user details
//     user.name = name || user.name;
//     user.fatherName = fatherName || user.fatherName;
//     user.motherName = motherName || user.motherName;
//     user.height = height || user.height;
//     user.location = location || user.location;
//     user.age = age || user.age;
//     user.address = address || user.address;
//     user.qualification = qualification || user.qualification;
//     user.work = work || user.work;
//     user.monthlyEarnings = monthlyEarnings || user.monthlyEarnings;
//     user.caste = caste || user.caste;
//     user.gender = gender || user.gender;
//     user.profilePhoto = profilePhoto || user.profilePhoto; // Assuming it's a URL

//     await user.save();
    
//     res.status(200).json({ message: 'Profile updated successfully', user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// Sign Up and send OTP
exports.signup = async (req, res) => {
  const { name, mobile, email, username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    // Create a new user
    const user = new User({
      name,
      mobile,
      email,
      username,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 300000 // OTP valid for 5 minutes
    });

    await user.save();

    // Send OTP to mobile (for demo purposes, log it)
    console.log(`OTP sent to ${mobile}: ${otp}`);

    res.status(200).json({ message: 'User registered. OTP sent to mobile.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Verify OTP and activate account
exports.verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const user = await User.findOne({ mobile, otp });

    if (!user || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid OTP or OTP expired.' });
    }

    // OTP is correct, activate user
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Account verified successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Fetch User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

exports.updateProfile = async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body
  console.log("User ID:", req.user.id);   // Log the user ID from the middleware

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update profile fields
    const {
      name,
      fatherName,
      motherName,
      height,
      location,
      age,
      address,
      qualification,
      work,
      monthlyEarnings,
      caste,
      gender,
      profilePhoto,
    } = req.body;

    // Only update fields if they exist in the request
    if (name) user.name = name;
    if (fatherName) user.fatherName = fatherName;
    if (motherName) user.motherName = motherName;
    if (height) user.height = height;
    if (location) user.location = location;
    if (age) user.age = age;
    if (address) user.address = address;
    if (qualification) user.qualification = qualification;
    if (work) user.work = work;
    if (monthlyEarnings) user.monthlyEarnings = monthlyEarnings;
    if (caste) user.caste = caste;
    if (gender) user.gender = gender;
    if (profilePhoto) user.profilePhoto = profilePhoto;

    // Save updated user profile
    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Logout User Controller (Session-based)
exports.logoutUser = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }

      // If using cookies, clear the session cookie
      res.clearCookie('connect.sid'); // Adjust cookie name as per your configuration

      res.status(200).json({
        message: "Logout successful",
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error while logging out" });
  }
};
