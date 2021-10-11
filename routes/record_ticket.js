const { Router } = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = Router();

// This will help us connect to the database
const dbo = require("../db/conf");

// This section will help you get a list of all the records.
recordRoutes.route("/ticket").get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("ticket")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});


// This section will help you get a list of all the records.
recordRoutes.route("/ticket/:id").get(async function (req, res) {
    const dbConnect = dbo.getDb();
    const object = dbo.getObject();
    const listingQuery = { _id: new object(req.params.id)};

    dbConnect
      .collection("ticket")
      .findOne(listingQuery, function (err, result) {
        if (err) {
          res.status(400).send("Error inserting ticket!");
        } else {
            res.json(result);
        }
      });

  });

// This section will help you create a new record.
recordRoutes.route("/ticket").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    filmName: req.body.filmName,
    roomNumber: req.body.roomNumber,
    location: req.body.location,
    position: req.body.position,
    date: req.body.date,
    value : req.body.value
  };

  dbConnect
    .collection("ticket")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting ticket!");
      } else {
        console.log(`Added a new ticket with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

// This section will help you update a record by id.
/*recordRoutes.route("/ticket").put(function (req, res) {
  const dbConnect = dbo.getDb();
  const listingQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1
    }
  };

  dbConnect
    .collection("ticket")
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res.status(400).send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log("1 document updated");
      }
    });
});*/

// This section will help you delete a record.
recordRoutes.route("/ticket/:id").delete((req, res) => {
  const dbConnect = dbo.getDb();
  const object = dbo.getObject();
  const listingQuery = { _id: new object(req.params.id) };

  dbConnect
    .collection("ticket")
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting listing with id ${listingQuery.listing_id}!`);
      } else {
        res.status(200).send();
      }
    });
});

module.exports = recordRoutes;