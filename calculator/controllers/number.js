// numberController.js
const express = require('express');
const router = express.Router();
const numberService = require('../services/numservice');
const WindowManager = require('../utils/util');

const windowManager = new WindowManager(10);

router.get('/numbers/:numberid', async (req, res) => {
  try {
    const { numberid } = req.params;
 
    if (!['p', 'f', 'e', 'r'].includes(numberid)) {
      return res.status(400).json({
        error: 'Invalid number ID. Must be one of: p (prime), f (fibonacci), e (even), r (random)'
      });
    }

    const numbers = await numberService.fetchNumbers(numberid);

    const { windowPrevState, windowCurrState } = windowManager.addNumbers(numbers);

    const avg = windowManager.calculateAverage();

    return res.json({
      windowPrevState,
      windowCurrState,
      numbers,
      avg
    });
  } catch (error) {
    console.error('Error processing number request:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;