import store from "../store.js";
import WildPokemon from "../Models/WildPokemon.js";
import ActivePokemon from "../Models/ActivePokemon.js";
import CaughtPokemon from "../Models/CaughtPokemon.js";
import LineupPokemon from "../Models/LineupPokemon.js";

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
    _pokemonApi
      .get("pokemon?limit=151")
      .then(res => {
        console.log("wild pokemon", res.data.results);
        store.commit("wildPokemon", res.data.results);
      })
      .catch(err => console.error(err));
  }
  displayDetails(pokemonName) {
    _pokemonApi
      .get("pokemon/" + pokemonName)
      .then(res => {
        console.log("details", res.data);
        let pokemon = new ActivePokemon(res.data);
        store.commit("activePokemon", pokemon);
      })
      .catch(err => console.error(err));
  }
  catchPokemon() {
    _sandboxApi
      .post("", store.State.activePokemon)
      .then(res => {
        console.log("caught pokemon", res.data);
        this.getCaughtPokemon();
      })
      .catch(err => console.error(err));
  }
  getCaughtPokemon() {
    _sandboxApi
      .get()
      .then(res => {
        console.log("my pokemon", res.data.data);
        let caughtPokemon = res.data.data.map(
          pokemonRawData => new CaughtPokemon(pokemonRawData)
        );
        store.commit("caughtPokemon", caughtPokemon);
      })
      .catch(err => console.error(err));
  }
  releasePokemon(pokemonId) {
    _sandboxApi
      .delete(pokemonId)
      .then(res => {
        console.log(res.data);
        this.getCaughtPokemon();
      })
      .catch(err => console.error(err));
  }
}

const service = new PokemonService();
export default service;
