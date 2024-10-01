const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/*
- Return all details from user.json file to client as JSON format
*/

router.get("/profile", (req, res) => {
  fs.readFile(path.join(__dirname, "user.json"), "utf8", (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ status: false, message: "Error reading user data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get("/login", (req, res) => {
  const { username, password } = req.query;

  fs.readFile(path.join(__dirname, "user.json"), "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .send({ status: false, message: "Error reading user data" });
    }

    const user = JSON.parse(data);

    if (user.username !== username) {
      return res.json({ status: false, message: "User Name is invalid" });
    }

    if (user.password !== password) {
      return res.json({ status: false, message: "Password is invalid" });
    }

    res.json({ status: true, message: "User Is valid" });
  });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get("/logout", (req, res) => {
  const { username } = req.query;
  if (username) {
    res.send(`<b>${username} successfully logout.</b>`);
  } else {
    res.send("<b>Username is required to logout.</b>");
  }
});

app.use("/", router);

app.listen(process.env.port || 8081);

console.log("Web Server is listening at port " + (process.env.port || 8081));
