const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

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

router.post("/api/rinks", (req, res) => {
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

router.put("/:id"),
  (req, res) => {
    console.log("Updating rink information", id);
    const rink = req.params.id;
    let queryText = `UPDATE "rinks" SET "name, note, image, address, status,indoor_or_outdoor,longitude, latitude" WHERE "id" = $1, $2, $3, $4, $5, $6, $7, $8;`;
    pool
      .query(queryText, [id])
      .then((result) => {
        console.log("rink was updated", result);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(error);
      });
  };

router.delete("/:id", (req, res) => {
  console.log("DELETE /rink");
  const user = req.user;
  const rink = req.body;
  const queryText = `DELETE FROM rinks WHERE id = $1`;
  const queryValue = [rink.id];
  pool
    .query(queryText, queryValue)
    .then((result) => {
      console.log("Success in deleting rink.");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error deleting rink", error);
      res.sendStatus(500);
    });
});

module.exports = router;
