/* const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET /favorites/id
router.get("/:id", (req, res) => {
  console.log("GET /favorites/id");
  const userId = req.user.id;
  const queryText = `SELECT * FROM favorites WHERE (rink_id=$1 AND user_id=$1) ORDER BY name ASC`;
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
    res.sendStatus(403); //woah woah woah!!! You are not allowed
    return;
  }
  // sample of req.body: {
  //   name: 'Subway'
  //   formatted_address: 1234 5th ave,
  //   rating: 5
  // }
  const newRink = req.body;
  const user = req.user;
  //set up a query to the list table to insert the user id, list_type, place name, address, and rating
  //list_type is 1 because it represents the favorites list
  const queryText = `INSERT INTO "favorites" ("user_id", "list_type", "name", "address", "rating") VALUES ($1, $2, $3, $4, $5)`;
  //store the query values
  const queryValue = [
 
 
  ];
  pool
    .query(queryText, queryValue)
    .then((result) => {
      res.sendStatus(201); //all done, inserted
    })
    .catch((error) => {
      console.log(`Error on query to the list table ${error}`);
      res.sendStatus(500);
    });
});
 */
