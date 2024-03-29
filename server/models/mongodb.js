var mongoose = require("mongoose");
const config = require("../config/server-config");

var gracefulShutdown;
// mongodb url
const { db: { host, port, name } } = config;
//var dbURI = `mongodb://${host}:${port}/${name}`;
// mongodb+srv://dev_user:<password>@onlinejudge-dev.aq7lg.mongodb.net/onlinejudge_dev?retryWrites=true&w=majority
var dbURI = `mongodb+srv://admin:AcStgwevNpihIgNi@cluster0.ngl2i.mongodb.net/blocklytest?retryWrites=true&w=majority`;
//var dbURI = `mongodb://127.0.0.1:27017/blocklytest`;

if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGOLAB_URI;
}
console.log("dbURI:", dbURI);
console.log("node_env:", process.env.NODE_ENV);
console.log("dbURI_env:", process.env.MONGOLAB_URI);
mongoose.connect(dbURI);

// Get collection names
mongoose.connection.on("open", function() {
  const users = mongoose.connection.db.collection("users");

  users.findOne({ username: "admin" }, function(err, user) {
    var curDate = new Date();
    if (!user) {
      const defaultUser = {
        username: "admin",
        email: "admin@admin.com",
        hash:
          "9f51bcd7a80a8da6fa02dcc9e136cd2ea5a08a24c988e4d822ebeb0b3eb430fd9a62af4fc6e1c456cb12cbc5b8792f737166ca39b3bb0fe4d34e1cd1ae134fd3",
        salt: "f8dae7c30d811b322b8763afc424fec0",
        role: "admin",
        timecreated: curDate
      };

      users.save(defaultUser, function(err) {
        if (err) {
          console.log("Error occurs when creating default user:" + err);
        }
        console.log(
          "[Database Initialization] New admin user 'admin' was created!"
        );
        console.log("[Default Admin] User Name: admin, Password: 111111");
      });

      users.save(defaultUser);
    } else {
      console.log("[Default Admin] User Name: admin, Password: 111111");
    }
  });

  /*
  mongoose.connection.db.listCollections().toArray(function(err, collections) {
    if (err) {
      throw new Error(error);
    } else {
      module.exports.Collection = collections;
      collections.map(function(collection) {
        console.log("found collection %s", collection.name);
      });
    }
  });*/
});

// CONNECTION EVENTS
mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected");
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};
// For nodemon restarts
process.once("SIGUSR2", function() {
  gracefulShutdown("nodemon restart", function() {
    process.kill(process.pid, "SIGUSR2");
  });
});
// For app termination
process.on("SIGINT", function() {
  gracefulShutdown("app termination", function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on("SIGTERM", function() {
  gracefulShutdown("Heroku app termination", function() {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require("./user");
