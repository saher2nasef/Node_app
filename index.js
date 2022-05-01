let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let crypto = require("crypto");
let fs = require("fs");
const app = express();
const port = 3000;
const PathFile = "Data/Tasks.json";
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var TaskModule = require("./Modules/tasks");
var BlogModule = require("./Modules/Blog");

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.get("/Tasks/:UserId", (req, res) => {
  res.json(TaskModule.GetDataFromFileJSON(req.params.UserId));
});
app.post("/Tasks", (req, res) => {
  res.json(TaskModule.CreateTask(req.body.UserId, req.body.Task));
});
app.put("/Tasks/", (req, res) => {
  res.json(
    TaskModule.ChangeTask(
      req.body.UserId,
      req.body.TaskId,
      req.body.Done,
      req.body.DateEdit
    )
  );
});
app.delete("/Tasks/:UserId/:TaskId", (req, res) => {
  res.json(TaskModule.deleteTask(req.params.UserId, req.params.TaskId));
});
app.delete("/Tasks/:UserId", (req, res) => {
  res.json(TaskModule.deleteAllTasks(req.params.UserId));
});

// Login
app.post("/Login/", (req, res) => {
  fs.readFile("Data/Users.json", function (err, users) {
    let Users = JSON.parse(users);

    const HaveUser = Users.filter(
      (User) =>
        User.email == req.body.Email && User.password == req.body.password
    );
    if (HaveUser.length != 0) {
      res.json(HaveUser);
    } else {
      res.json({ message: "Email Or Passowrd Is Bad" });
    }
  });
  // Login
});
// Register
app.post("/Register/", (req, res) => {
  var token = jwt.sign(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    "Good"
  );
  let UserId = crypto.randomBytes(30).toString("hex");
  let User = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    UserId: UserId,
    // Token: token,
  };
  fs.readFile("Data/Users.json", function (err, users) {
    let Users = JSON.parse(users);
    const EmailVaild = Users.filter((User) => User.email == req.body.email);
    if (Users.length == 0) {
      Users.push(User);
      fs.writeFileSync("Data/Users.json", JSON.stringify(Users));
      res.json(User);
    } else {
      if (EmailVaild.length == 0) {
        Users.push(User);
        fs.writeFileSync("Data/Users.json", JSON.stringify(Users));
        res.json(User);
      } else {
        res.json({ message: "This Email alredy Exited" });
      }
    }
  });
});
// Change UserName And Password
app.post("/ChangeUserName/", (req, res) => {
  fs.readFile("Data/Users.json", function (err, users) {
    let Users = JSON.parse(users);
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].UserId == req.body.UserId) {
        Users[i].username = req.body.UserName;
        fs.writeFileSync("Data/Users.json", JSON.stringify(Users));
        res.json({ username: req.body.UserName });
      }
    }
  });
});
app.post("/ChangePassword/", (req, res) => {
  fs.readFile("Data/Users.json", function (err, users) {
    let Users = JSON.parse(users);
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].UserId == req.body.UserId) {
        Users[i].password = req.body.Passowrd;
        fs.writeFileSync("Data/Users.json", JSON.stringify(Users));
        res.json({ Password: req.body.Passowrd });
      }
    }
  });
});
// Blog
app.get("/Blog/:UserId", (req, res) => {
  res.json(BlogModule.GetBlogsAll(req.params.UserId));
});
app.get("/Blog/", (req, res) => {
  res.json(BlogModule.GetAllBlogs());
});
app.get("/ReadBlog/:BlogId", (req, res) => {
  res.json(BlogModule.GetBlogById(req.params.BlogId));
});
app.post("/Blog/", (req, res) => {
  res.json(
    BlogModule.CreateBlog(
      req.body.Title,
      req.body.Body,
      req.body.UrlImage,
      req.body.UserId,
      req.body.Direction
    )
  );
});
app.delete("/Blog/:UserId/:BlogId", (req, res) => {
  res.json(
    BlogModule.deleteBlog(
      req.params.BlogId,
      req.params.UserId,
    )
  );
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
