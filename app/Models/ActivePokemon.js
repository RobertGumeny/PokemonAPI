export default class ActivePokemon {
  constructor(data) {
    this.name = data.name || "";
    this.img = data.sprites ? data.sprites.front_default || "" : data.img || "";
    this.weight = data.weight || "";
  }

  get Template() {
    return /*html*/ `
    <img src="${this.img}" alt="">
    <h5 class="text-capitalize">${this.name}</h5>
    <p>Weight: ${this.weight}</p>
    <button class="btn btn-block btn-danger" onclick="app.pokemonController.catchPokemon()">Catch ${this.name}</button>
    `;
  }
}
