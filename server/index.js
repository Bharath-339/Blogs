const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

const app = express();
const mongoose = require("mongoose");

const User = require("./models/User");
const Post = require("./models/Post");

const secret = "sdlfjkgjlskjfgsghsjkfgskjdkjfghskjhkjgdhjs";

app.use(cors({ credentials: true, origin: "http://10.5.6.225:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.get("/", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { userName, password, name } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  try {
    const userDoc = await User.create({
      userName,
      password: passwordHash,
      name,
    });

    return res.json(userDoc);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });

  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!passwordCheck) {
    return res.status(400).json({ error: "invalid Credentials" });
  }
  const token = jwt.sign({ userName, id: user._id }, secret);

  res.cookie("token", token).json({
    id: user._id,
    userName,
  });
});

app.get("/profile", (req, res) => {
  // console.log(req)
  const { token } = req.cookies;
  const check = jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    return res.json(info);
  });
});

app.post("/post/create", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  const check = jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const post = await Post.create({
      title,
      content,
      summary,
      cover: newPath,
      author: info.id,
    });

    return res.json(post);
  });
});

app.get("/all/posts", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["userName"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author", ["userName"]);
  return res.json(post);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

// ------------------------------------------------------------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/mern-blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4000);
    console.log("app running at 4000");
  })
  .catch((e) => {
    console.log(e);
  });
