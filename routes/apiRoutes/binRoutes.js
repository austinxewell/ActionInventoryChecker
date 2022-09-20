const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


// Get all candidates
router.get('/bins', (req, res) => {
    const sql = `SELECT * FROM bins`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  // Get a single candidate
router.get('/bin/:id', (req, res) => {
    const sql = `SELECT * FROM bins WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });
  
  // Delete a candidate
router.delete('/bins/:id', (req, res) => {
    const sql = `DELETE FROM bins WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'bin not found'
        });
      } else {
        res.json({
          message: 'successfully deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

  // Create a candidate
router.post('/bin', ({ body }, res) => {
    const errors = inputCheck(body, 'bin', 'verified');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO bins (bin, verified)
    VALUES (?,?)`;
    const params = [body.bin, body.verified];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
  });

  module.exports = router;