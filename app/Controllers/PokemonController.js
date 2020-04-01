import PokemonService from "../Services/PokemonService.js";
import store from "../store.js";

//Private
function _drawWildPokemon() {
  let wildPokemon = store.State.wildPokemon;
  console.log(wildPokemon);
}

//Public
export default class PokemonController {
  constructor() {
    console.log("Pokemon Controller is linked");
    store.subscribe("wildPokemon", _drawWildPokemon);
  }
}
