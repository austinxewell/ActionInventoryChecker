const express = require('express');
const router = express.Router();

router.use(require('./binRoutes'));

module.exports = router;