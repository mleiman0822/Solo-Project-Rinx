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
  const queryText = `SELECT "favorites"."id","name", "note","image","address","status","favorited","indoor_or_outdoor","longitude","latitude" FROM "rinks" 
  JOIN "favorites" ON
  rinks.id = favorites.rink_id
  WHERE user_id = $1;`;
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

  const queryText = `INSERT INTO "favorites" ("rink_id", "user_id") VALUES ($1, $2)`;
  const queryValue = [favoritedRink.id, req.user.id];
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

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  console.log(req.user, req.params);
  console.log(
    `Deleting Rink with ID ${req.params.id} by user ID ${req.user.id} `
  );
  let queryText = `DELETE FROM favorites WHERE id = $1;
  `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error deleting message", err);
      res.sendStatus(418);
    });
});

module.exports = router;
