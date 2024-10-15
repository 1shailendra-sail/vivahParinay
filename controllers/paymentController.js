const axios = require('axios');
const mailService = require('../services/mailService');

const processPayment = async (req, res) => {
  const { package } = req.body;

  try {
    // Integrate PhonePe Payment API here
    const paymentResponse = await axios.post('PHONEPE_API_ENDPOINT', {
      // pass payment details
    });

    if (paymentResponse.data.success) {
      // Send thank you email
      await mailService.sendThankYouEmail('user@example.com', package);
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Payment error:', error);
    return res.status(500).json({ success: false, message: 'Payment failed' });
  }
};

module.exports = { processPayment };
