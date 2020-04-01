import store from "../store.js";
import WildPokemon from "../Models/WildPokemon.js";
import ActivePokemon from "../Models/ActivePokemon.js";
import CaughtPokemon from "../Models/CaughtPokemon.js";

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
    this.getCaughtPokemon();
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
  catchPokemon() {
    _sandboxApi.post("", store.State.activePokemon).then(res => {
      console.log("caught pokemon", res.data);
      this.getCaughtPokemon();
    });
  }
  getCaughtPokemon() {
    _sandboxApi.get().then(res => {
      console.log("my pokemon", res.data.data);
      let caughtPokemon = res.data.data.map(
        pokemonRawData => new CaughtPokemon(pokemonRawData)
      );
      store.commit("caughtPokemon", caughtPokemon);
    });
  }
}

const service = new PokemonService();
export default service;
