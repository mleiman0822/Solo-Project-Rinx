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



module.exports = router;
