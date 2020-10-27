const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

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

router.post("/", (req, res) => {
  const {
    name,
    note,
    image,
    address,
    status,
    indoor_or_outdoor,
    longitude,
    latitude,
  } = req.body;
  const queryText =
    'INSERT INTO "rinks" (name, note, image, address, status,indoor_or_outdoor,longitude, latitude ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
  pool
    .query(queryText, [
      name,
      note,
      image,
      address,
      status,
      indoor_or_outdoor,
      longitude,
      latitude,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
