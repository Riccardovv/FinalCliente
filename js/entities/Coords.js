class Coords {
  #latitude;
  #longuitude;


  constructor(latitude, longuitude) {
    if(isNaN(latitude)) throw new InvalidValue("Latitude", latitude)
    if(isNaN(longuitude)) throw new InvalidValue("longuitude", longuitude)

    this.#latitude = latitude;
    this.#longuitude = longuitude;
  }
  // gets and sets for longitude
  get longuitude() {
    return this.#longuitude;
  }

  set longuitude(longuitude) {
    if(isNaN(longuitude)) throw new InvalidValue("longuitude", longuitude)
    this.#longuitude = longuitude;
  }

  // gets and sets for latitude
  get latitude() {
    return this.#latitude;
  }

  set latitude(latitude) {
    if(isNaN(latitude)) throw new InvalidValue("Latitude", latitude)
    this.#latitude = latitude;
  }

}

// export default Coords;