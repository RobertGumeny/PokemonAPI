import PokemonService from "../Services/PokemonService.js";
import WildPokemon from "../Models/WildPokemon.js";
import ActivePokemon from "../Models/ActivePokemon.js";
import store from "../store.js";

//Private
// NOTE Draw 5 random Wild Pokemon to page
function _drawWildPokemon() {
  let wildPokemon = store.State.wildPokemon;
  let randomPokemon = [];
  let template = "";
  for (let i = 0; i < 5; i++) {
    randomPokemon.push(
      wildPokemon[Math.floor(Math.random() * wildPokemon.length)]
    );
  }
  randomPokemon.forEach(
    pokemon =>
      (template += `<button class="btn btn-primary m-2" onclick="app.pokemonController.displayDetails('${pokemon.name}')">${pokemon.name}</button>`)
  );
  document.getElementById("wild-pokemon").innerHTML = template;
  console.log("5 random pokemon", randomPokemon);
}
// NOTE Draw active pokemon to center of page
function _drawActivePokemon() {
  document.getElementById("active-pokemon").innerHTML =
    // @ts-ignore
    store.State.activePokemon.Template;
}
// NOTE Draw caught pokemon to page
function _drawCaughtPokemon() {
  let caughtPokemon = store.State.caughtPokemon;
  let template = "";
  caughtPokemon.forEach(pokemon => (template += pokemon.Template));
  document.getElementById("caught-pokemon").innerHTML = template;
}
//Public
export default class PokemonController {
  constructor() {
    console.log("Pokemon Controller is linked");
    store.subscribe("wildPokemon", _drawWildPokemon);
    store.subscribe("activePokemon", _drawActivePokemon);
    store.subscribe("caughtPokemon", _drawCaughtPokemon);
  }
  getNewPokemon() {
    _drawWildPokemon();
  }
  displayDetails(pokemonName) {
    PokemonService.displayDetails(pokemonName);
  }
  catchPokemon() {
    PokemonService.catchPokemon();
  }
}
