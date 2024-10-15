const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  country: String,
  state: String,
  city: String,
  street: String
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Default is user, can be changed to 'admin'
  otp: { type: String },
  otpExpires: { type: Date },
  
  fatherName: {type: String},
    motherName: {type: String},
    height: {type: String},
    location: {type: String},
    age: {type: Number},
    address: addressSchema,
    qualification: {type: String},
    work: {type: String},
    monthlyEarnings: {type: String},
    caste: {type: String},
    gender: {type: String},
    profilePhoto: {type: String}

});

module.exports = mongoose.model('User', userSchema);
