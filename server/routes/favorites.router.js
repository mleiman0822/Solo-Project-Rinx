const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET /favorites/id
router.get("/", (req, res) => {
  console.log("GET /favorites/id");
  const userId = req.user.id;
  const queryText = `SELECT "name", "note","image","address","status","favorited","indoor_or_outdoor","longitude","latitude" FROM "rinks" 
  JOIN "favorites" ON
  rinks.id = favorites.rink_id
  JOIN  "user" ON
  favorites.user_id = user_id
  WHERE user_id = $1`;
  const queryValue = [userId];
  pool
    .query(queryText, queryValue)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("POST /favorites");
  if (req.isAuthenticated() === false) {
    res.sendStatus(403);
    return;
  }

  const favoritedRink = req.body;
  const user = req.user;

  const queryText = `INSERT INTO "favorites" ("name", "note", "image", "address", "status", "indoor_or_outdoor", "longitude","latitude") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  const queryValue = [
    user.id,
    favoritedRink.name,
    favoritedRink.note,
    favoritedRink.image,
    favoritedRink.address,
    favoritedRink.status,
    favoritedRink.indoor_or_outdoor,
    favoritedRink.longitutde,
    favoritedRink.latitude,
  ];
  pool
    .query(queryText, queryValue)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error on query to the list table ${error}`);
      res.sendStatus(500);
    });
});
// end POST /favorites

router.delete("/favorites/:id", (req, res) => {
  console.log("DELETE /favorites");
  const user = req.user;
  const rink = req.body;
  const queryText = `DELETE FROM favorites WHERE id = $1`;
  const queryValue = [user.id, rink.rink_id];
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
