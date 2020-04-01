export default class WildPokemon {
  constructor(data) {
    this.name = data.name || "";
    this.img = data.sprites ? data.sprites.front_default || "" : data.img || "";
    this.weight = data.weight || "";
  }

  get Template() {
    return /*html*/ `
    
    `;
  }
}
