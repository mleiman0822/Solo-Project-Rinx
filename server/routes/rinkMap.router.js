const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", (req, res) => {
  const queryText = 'SELECT * from "rinks" order by name;';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
