class Store{

  #CIF;
  #name;
  #adress;
  #phone;
  #coords;
  // key es el producto y value el stock
  #products= new Map();

  constructor(CIF, name, adress, phone, coords){

    if (CIF=="") throw new InvalidValue("CIF", CIF);
    if (name=="") throw new InvalidValue("name", name);
    if (adress=="") throw new InvalidValue("adress", adress);
    if (phone=="") throw new InvalidValue("phone", phone);
    if (!coords instanceof Coords) throw new InvalidValue("coords", coords);

    this.#CIF= CIF;
    this.#name= name;
    this.#adress= adress;
    this.#phone= phone;
    this.#coords= coords;

  }

  // gets and sets for CIF
  get CIF() {
    return this.#CIF;
  }

  set CIF(longuitude) {
    if (CIF="") throw new InvalidValue("CIF", CIF);
    this.#CIF = CIF;
  }
  // gets and sets for name
  get name() {
    return this.#name;
  }

  set name(name) {
    if (name="") throw new InvalidValue("name", name);
    this.#name = name;
  }
  // gets and sets for adress
  get adress() {
    return this.#adress;
  }

  set adress(adress) {
    if (adress="") throw new InvalidValue("adress", adress);
    this.#adress = adress;
  }
  // gets and sets for phone
  get phone() {
    
    return this.#phone;
  }

  set phone(phone) {
    if (phone="") throw new InvalidValue("phone", phone);
    this.#phone = phone;
  }
  // gets and sets for coords
  get coords() {
    return this.#coords;
  }

  set coords(coords) {
    if (!coords instanceof Coords) throw new InvalidValue("coords", coords);
    this.#coords = coords;
  }
  get products(){
    return this.#products;
  }

}


// export default Store;