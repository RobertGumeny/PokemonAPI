export default class CaughtPokemon {
  constructor(data) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.img = data.img || "";
    this.weight = data.weight || "";
    this.user = data.user;
  }

  get Template() {
    return /*html*/ `
    <div class="col">
      <img class="mb-0" src="${this.img}" alt="${this.name}">
      <div class="d-flex mt-0">
      <button class="btn btn-success m-1" onclick="app.pokemonController.addToLineup()"><i class="fas fa-user-plus text-white"></i></button>
      <button class="btn btn-danger  m-1" onclick="app.pokemonController.releasePokemon()"><i class="fas fa-user-minus text-white"></i></button>
      </div>
    </div>
    `;
  }
}
