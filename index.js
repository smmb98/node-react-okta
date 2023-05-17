require("dotenv").config();
const express = require("express");
const { auth } = require("express-openid-connect");
const path = require("path");

const app = express();

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
  })
);

// Serve static files from the React build
app.use(express.static(path.join(__dirname, "dist")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Routes
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/profile", async (req, res) => {
//   console.log(req.oidc.fetchUserInfo());
//   console.log(req.oidc.isAuthenticated());
//   console.log(req.oidc.user());

//   req.oidc.isAuthenticated;
  if (req.oidc.isAuthenticated()) {
    res.send(`Welcome, ${req.oidc.user.name}! This is your profile page.`);
  } else {
    res.status(401).send("Unauthorized");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
