const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

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
app.use("/api/users", userRouter);
app.use(error);

mongoose
  .connect(process.env.PROD_TEST_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("db connected...");

    app.listen(process.env.PORT || 8080, () =>
      console.log("server running... running on port 8080")
    );

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
