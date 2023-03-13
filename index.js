const express = require('express');
const app = express();

const { faker } = require("@faker-js/faker");
const hbs = require("hbs");
const PORT = 4000;
const genCat = require("./genCat");
const isFormDataValid = require('./isFormDataValid');

let cats = [];
for (let i = 0; i < 2; i++) {
  cats.push(genCat());
}


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("views", "views");
app.set("view engine", "hbs");

// could've obviously cleaned this up a lot but just didn't wanna do it with this project

app.get("/", (req, res) => {
  res.render("index", { cats })
})

app.get('/admin', (req, res) => {
  res.render("admin", { cats });
});

app.post("/add-cat", (req, res) => {
  const cat = genCat();
  const formData = req.body;
  
  if (!isFormDataValid(formData)) {
    throw new Error("Make sure to fill out every field in the form");
  }

  cat.name = formData.name;
  cat.age = formData.age;

  cats.push(cat);

  res.redirect("/admin");
})

// couldn't send a DELETE request from a HTML form so decided to go with a POST
app.post("/remove-cat/:catId", (req, res) => {
  const { catId } = req.params;
  console.log(catId);
  console.log(cats);
  cats = cats.filter(cat => cat.id !== parseInt(catId));
  console.log(cats);
  res.redirect("/");
})

app.use((err, req, res, next) => {
  res.render("err", { msg: err.message });
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));