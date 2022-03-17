class Product {
  #serial;
  #name;
  #description;
  #price;
  #tax;
  #image;

  constructor(serial, name, description, price, tax, image) {

    if(serial=="") throw new InvalidValue("serial", "empty")
    if(name=="") throw new InvalidValue("name", "empty")
    if(description=="") throw new InvalidValue("description", "empty")
    if(isNaN(price)) throw new InvalidValue("price", price)
    if(isNaN(tax)) throw new InvalidValue("tax", tax)

    this.#serial = serial;
    this.#name = name;
    this.#description = description;
    this.#price = price;
    this.#tax = tax;
    this.#image = "./assets/img/products/"+image;
  }

  // gets and sets for serial

  get serial() {
    return this.#serial;
  }

  set serial(serial) {
    if(serial=="") throw new InvalidValue("serial", "empty")
    this.#serial = serial;
  }

  // gets and sets for name

  get name() {
    return this.#name;
  }

  set name(name) {
    if(name=="") throw new InvalidValue("name", "empty")
    this.#name = name;
  }

  // gets and sets for description

  get description() {
    return this.#description;
  }

  set description(description) {
    if(description=="") throw new InvalidValue("description", "empty")
    this.#description = description;
  }

  // gets and sets for price

  get price() {
    return this.#price;
  }

  set price(price) {
    if(isNaN(price)) throw new InvalidValue("price", price)
    this.#price = price;
  }

  // gets and sets for tax

  get tax() {
    return this.#tax;
  }

  set tax(tax) {
    if(isNaN(tax)) throw new InvalidValue("tax", tax)
    this.#tax = tax;
  }

  // gets and sets for image

  get image() {
    return this.#image;
  }

  set image(image) {
    this.#image = image;
  }

}

class Tv extends Product {
  #size;
  #refreshRate;
  #resolution;

  constructor(serial, name, description, price, tax, image, size, refreshRate, resolution) {

    super(serial, name, description, price, tax, image);

    this.#size = size;
    this.#refreshRate = refreshRate;
    this.#resolution = resolution;
  }
  // gets and sets for size

  get size() {
    return this.#size;
  }

  set size(size) {
    if(isNaN(size)) throw new InvalidValue("size", size)
    this.#size = size;
  }

  // gets and sets for refreshRate

  get refreshRate() {
    return this.#refreshRate;
  }

  set refreshRate(refreshRate) {
    if(isNaN(refreshRate)) throw new InvalidValue("refreshRate", refreshRate)
    this.#refreshRate = refreshRate;
  }

  // gets and sets for resolution

  get resolution() {
    return this.#resolution;
  }

  set resolution(resolution) {
    if(resolution="") throw new InvalidValue("resolution", "empty")
    this.#resolution = resolution;
  }
}

class Car extends Product{

  #brand;
  #displacement;
  #license;

  constructor(serial, name, description, price, tax, image, brand, displacement, license) {

    super(serial, name, description, price, tax, image);

    this.#brand = brand;
    this.#displacement = displacement;
    this.#license = license;
  }

  // gets and sets for brand

  get brand() {
    return this.#brand;
  }

  set brand(brand) {
    if(brand="") throw new InvalidValue("brand", brand)

    this.#brand = brand;
  }

  // gets and sets for displacement

  get displacement() {
    return this.#displacement;
  }

  set displacement(displacement) {
    if(isNaN(displacement)) throw new InvalidValue("displacement", displacement)

    this.#displacement = displacement;
  }

  // gets and sets for license

  get license() {
    if(license="") throw new InvalidValue("license", "empty")
    return this.#license;
  }

  set license(license) {
    this.#license = license;
  }


}



class Movie extends Product{

  #title;
  #director;
  #length;

  constructor(serial, name, description, price, tax, image, title, director, length) {

    super(serial, name, description, price, tax, image);

    if(title="") throw new InvalidValue("title", title)
    if(director="") throw new InvalidValue("director", director)
    if(isNaN(length)) throw new InvalidValue("director", director)

    this.#title = title;
    this.#director = director;
    this.#length = length;
  }

  // gets and sets for title

  get title() {
    return this.#title;
  }

  set title(title) {
    if(title="") throw new InvalidValue("title", title)
    this.#title = title;
  }

  // gets and sets for director

  get director() {
    return this.#director;
  }

  set director(director) {
    if(director="") throw new InvalidValue("director", director)
    this.#director = director;
  }

  // gets and sets for length

  get length() {
    return this.#length;
  }

  set length(length) {
    if(isNaN(length)) throw new InvalidValue("director", director)
    this.#length = length;
  }


}

//  export default {Product,Tv,Car,Movie};