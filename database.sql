CREATE TABLE "user" (

"id" SERIAL PRIMARY KEY,
"username" VARCHAR(300),
"password" VARCHAR(300),
"is_admin" BOOLEAN

);

CREATE TABLE "rinks" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(250) NOT NULL,
    "note" VARCHAR(250) NOT NULL,
    "image" VARCHAR(1500) NOT NULL,
    "address" VARCHAR (1000) NOT NULL,
    "status" INT,
    "favorited" BOOLEAN,
     "indoor_or_outdoor" VARCHAR(60) NOT NULL,
	 "longitude" Decimal(10,6) NOT NULL,
    "latitude" Decimal(10,6) NOT NULL
);


INSERT INTO "rinks" ("name", "note","image", "address", "status", "favorited","indoor_or_outdoor", "latitude", "longitude")
VALUES
('West Fargo Sports Arena', 'Indoor rink in West Fargo','https://www.west-fargo.k12.nd.us/cms/lib/ND02203445/Centricity/ModuleInstance/7624/dusk%203.jpg', '520 32nd Ave W, West Fargo, ND 58078', 3, FALSE, 'Indoor', 46.834661, -96.908965 );



INSERT INTO "user" ("username","password", "is_admin")
VALUES('mleiman0822', 'password', FALSE);


CREATE TABLE "favorites" (
id SERIAL PRIMARY KEY,
"rink_id" INTEGER REFERENCES "rinks",
"user_id" INTEGER REFERENCES "user"
);

SELECT * FROM "user" 
JOIN "favorites" ON
"user".id = favorites.user_id
JOIN  "rinks" ON
favorites.rink_id = rinks.id;

INSERT INTO "favorites" ("rink_id","user_id")
VALUES(1, 1);

SELECT "name", "note","image","address","status","favorited","indoor_or_outdoor","longitude","latitude" FROM "rinks" 
JOIN "favorites" ON
rinks.id = favorites.rink_id
JOIN  "user" ON
favorites.user_id = user_id
WHERE user_id = 1

DELETE FROM favorites WHERE id = 16;

SELECT "name", "note","image","address","status","favorited","indoor_or_outdoor","longitude","latitude" FROM "rinks" 
  JOIN "favorites" ON
  rinks.id = favorites.rink_id
  WHERE user_id = 4

SELECT "favorites"."id","name", "note","image","address","status","favorited","indoor_or_outdoor","longitude","latitude" FROM "rinks" 
  JOIN "favorites" ON
  rinks.id = favorites.rink_id
  WHERE user_id = 4;