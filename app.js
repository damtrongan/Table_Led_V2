const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const tableRoutes = require("./routes/table");
const adminRoutes = require("./routes/admin");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

//Render UI
app.use("/",tableRoutes);
//app.use("/admin", adminRoutes);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
