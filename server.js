require("dotenv").config();
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
require("./database/database");
const morgan = require("morgan");
const routes = require("./routes/routes");
const adminRoute = require("./routes/adminRoutes");

const app = express();
const path = require("path");
const server = require("http").createServer(app);


var corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,

  methods: ["GET", "POST","PUT","DELETE","PATCH"],
  allowedHeaders: ["content-type","token"],
  credentials: true, 
  }
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cors());
app.use(express.static(path.join(__dirname, "./uploads")));

app.use("/api/v1", routes);
app.use("/api/v1", adminRoute);


//Port listen in 3000
const port = process.env.PORT || 3000;
server.listen(port, console.log(`server is listening on http://localhost:${port}`));