const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/* router.post("/", rejectUnauthenticated, (req, res) => {
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
}); */

module.exports = router;
