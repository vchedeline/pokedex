require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8008;
const morgan = require("morgan");
const methodOverride = require("method-override");
const pokemons = require("./models/pokemon");
const tempPokemon = require("./models/temp-pokemon");

let starterOne, starterTwo, starterThree, index1, index2, index3;

for (let element of pokemons) {
  if (element.id === "025") {
    starterOne = element;
    index1 = pokemons.indexOf(starterOne);
  }
  if (element.id === "133") {
    starterTwo = element;
    index2 = pokemons.indexOf(starterTwo);
  }
  if (element.id === "151") {
    starterThree = element;
    index3 = pokemons.indexOf(starterThree);
  }
}

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("main.ejs", {
    starterOne: starterOne,
    index1: index1,
    starterTwo: starterTwo,
    index2: index2,
    starterThree: starterThree,
    index3: index3,
  });
});

// Index Route - GET
app.get("/pokemon", (req, res) => {
  res.render("index.ejs", { pokemon: pokemons });
});

// New Route - GET
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});

// Show Route - GET
app.get("/pokemon/:id", (req, res) => {
  res.render("show.ejs", {
    myPokemon: pokemons[req.params.id],
    index: req.params.id,
  });
});

// Edit Route - GET
app.get("/pokemon/:id/edit", (req, res) => {
  res.render("edit.ejs", {
    myPokemon: pokemons[req.params.id],
    index: req.params.id,
  });
});

// Create Route - POST
app.post("/pokemon", (req, res) => {
  let newPokemon = tempPokemon;
  newPokemon.name = req.body.name;
  newPokemon.img = req.body.img;
  newPokemon.stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
    speed: req.body.defense,
  };
  newPokemon.misc = {
    classification: req.body.classification,
  };
  pokemons.unshift(newPokemon);
  res.redirect("/pokemon/0");
});

// Update Route - PUT
app.put("/pokemon/:id", (req, res) => {
  console.log(req.body);
  let editedPokemon = { ...pokemons[req.params.id] };
  editedPokemon.stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
    speed: req.body.speed,
  };
  editedPokemon.misc = {
    classification: req.body.classification,
  };
  editedPokemon.name = req.body.name;
  pokemons[req.params.id] = editedPokemon;
  res.redirect(`/pokemon/${req.params.id}`);
});

// Delete Route - DELETE
app.delete("/pokemon/:id", (req, res) => {
  const index = req.params.id;
  pokemons.splice(index, 1);
  res.redirect("/pokemon");
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} now in session...`);
});
