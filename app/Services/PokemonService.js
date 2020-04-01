import store from "../store.js";
import WildPokemon from "../Models/WildPokemon.js";
import ActivePokemon from "../Models/ActivePokemon.js";

// Link up with APIs

// @ts-ignore
let _pokemonApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 10000
});

// @ts-ignore
let _sandboxApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/robert/pokemon"
});

class PokemonService {
  constructor() {
    console.log("Pokemon Service is linked");
    this.getWildPokemon();
  }

  getWildPokemon() {
    _pokemonApi.get("pokemon").then(res => {
      console.log("wild pokemon", res.data.results);
      store.commit("wildPokemon", res.data.results);
    });
  }
  displayDetails(pokemonName) {
    _pokemonApi.get("pokemon/" + pokemonName).then(res => {
      console.log("details", res.data);
      let pokemon = new ActivePokemon(res.data);
      store.commit("activePokemon", pokemon);
    });
  }
}

const service = new PokemonService();
export default service;
