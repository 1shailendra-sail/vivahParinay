// services/otpService.js
const otpStorage = {};

exports.sendOtp = (mobile) => {
  const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
  otpStorage[mobile] = otp;
  console.log(`OTP for ${mobile}: ${otp}`); // For testing, this would be an SMS in production
  return otp;
};

exports.verifyOtp = (mobile, otp) => {
  if (otpStorage[mobile] === parseInt(otp, 10)) {
    delete otpStorage[mobile]; // Remove OTP after verification
    return true;
  }
  return false;
};

