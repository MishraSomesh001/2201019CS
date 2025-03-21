// app.js for Average Calculator
const express = require('express');
const numberController = require('./controllers/number');
const authService = require('./services/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize authentication
const initAuth = async () => {
  try {
    // Your specific details from the screenshot
    const registrationResult = await authService.register(
      "2201019CS", // rollNo
      "Somesh Mishra", // ownerName
      "somesh.2201019cs@iiitbh.ac.in", // ownerEmail
      "IIITBH_019CS", // companyName
      "GGhiQe" // accessCode
    );
    
    console.log('Registration successful');
    console.log('Client ID:', registrationResult.clientID);
    console.log('Client Secret:', 'xxxxxxxx');
    const token = await authService.getAuthToken();
    console.log('Authentication token obtained');
  } catch (error) {
    console.error('Authentication setup failed:', error.message);
  }
};

app.use(express.json());

// Routes
app.use('/', numberController);

// Start the server
app.listen(PORT, async () => {
  console.log(`Average Calculator Microservice running on port ${PORT}`);
  await initAuth();
});

module.exports = app;