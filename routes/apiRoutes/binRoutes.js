const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all bins
router.get('/bins', (req, res) => {
    const sql = `SELECT * FROM bins`
})