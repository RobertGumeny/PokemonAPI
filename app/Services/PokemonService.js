import store from "../store.js";
import WildPokemon from "../Models/WildPokemon.js";

// Link up with APIs

// @ts-ignore
let _pokemonApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
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
    _pokemonApi.get().then(res => {
      console.log("wild pokemon", res.data.results);
      store.commit("wildPokemon", res.data.results);
    });
  }
}

const service = new PokemonService();
export default service;
