const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  cors = require("cors"),
  router = require("./routes/index"),
  path = require("path");
  serveStatic = require("serve-static");

app.use(express.json());
app.use(express.urlencoded());


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  console.log("intercepting")
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
const mongodbURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/studyplan";

mongoose.connect(mongodbURI, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database" + err);
  }
);
mongoose.set("useFindAndModify", false);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(allowCrossDomain)
app.use(express.json());
// app.use(express.static("public")); //In order to use static file

app.use(cors());

// app.use(serveStatic(__dirname + "/dist"));

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs"); //To use EJS


// Serve static assets
app.use(express.static(path.join(__dirname, 'dist')));

// Redirect all requests to `index.html`
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})


app.use("/server", router);


app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports = app;

