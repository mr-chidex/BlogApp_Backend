const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/images", express.static(path.join(__dirname, "images")));

const postRouter = require("./routes/posts");
const error = require("./controllers/error");
const userRouter = require("./routes/user");

app.get("/", (req, res) => {
  return res.json({
    message: "API by mr-chidex",
    github: "https://github.com/mr-chidex",
  });
});
app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);
app.use(error);
dfev;

mongoose
  .connect(process.env.PROD_TEST_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("db connected...");
    const server = app.listen(process.env.PORT || 8080, () =>
      console.log("server running...")
    );

    const io = require("./socket").init(server);

    io.on("connection", (socket) => console.log("client connected"));

    const user = await User.find();
    if (user.length === 0) {
      const admin = await new User({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS,
      });

      await admin.save();
      console.log("admin added");
    }
  })
  .catch((err) => {
    console.log(err);
  });
