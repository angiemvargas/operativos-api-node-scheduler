const { MongoClient, ObjectID } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("operativos");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getObject: function(){
    return ObjectID;
  },

  getDb: function () {
    return dbConnection;
  },
};