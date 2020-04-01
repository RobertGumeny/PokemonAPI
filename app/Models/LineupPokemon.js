export default class LineupPokemon {
  constructor(data) {
    this.id = data.id;
    this.img = data.img;
    this.name = data.name;
  }

  get Template() {
    return /*html*/ `
      <div class="col-6">
        <img src="${this.img}">
        <p class="text-white">${this.name}</p>
        <button class="btn btn-danger btn-sm btn-block text-white">Remove</button>
      </div>
    `;
  }
}
