function InvalidValue(parametro="", valor=0) {
  let instance= Error.call(this,"the parameter "+parametro+" can´t be "+valor);
  instance.name="InvalidValue";
  instance.valor=valor;
  instance.parametro=parametro;
  return instance;
}
InvalidValue.prototype=Object.create(Error.prototype);
InvalidValue.prototype.constructor=InvalidValue;


function ShopAlreadyExist(shop) {
  let instance= Error.call(this,"The shop "+shop+" is already added");
  instance.name="ShopAlreadyExist";
  instance.shop=shop;
  return instance;
}
ShopAlreadyExist.prototype=Object.create(Error.prototype);
ShopAlreadyExist.prototype.constructor=ShopAlreadyExist;


function CategoryAlreadyExist(category) {
  let instance= Error.call(this,"The category "+category+" is already added");
  instance.name="CategoryAlreadyExist";
  instance.category=category;
  return instance;
}
CategoryAlreadyExist.prototype=Object.create(Error.prototype);
CategoryAlreadyExist.prototype.constructor=CategoryAlreadyExist;


function ProductAlreadyAdded(product) {
  let instance= Error.call(this,"The product "+product+" is already added");
  instance.name="ProductAlreadyAdded";
  instance.product=product;
  return instance;
}
ProductAlreadyAdded.prototype=Object.create(Error.prototype);
ProductAlreadyAdded.prototype.constructor=ProductAlreadyAdded;

function CategoryDoesntExist(category) {
  let instance= Error.call(this,"The category "+category+" doesn´t exist");
  instance.name="CategoryDoesntExist";
  return instance;
}
CategoryDoesntExist.prototype=Object.create(Error.prototype);
CategoryDoesntExist.prototype.constructor=CategoryDoesntExist;


function ProductDoesntExist(product) {
  let instance= Error.call(this,"The product "+product+" doesn´t exist");
  instance.name="ProductDoesntExist";
  return instance;
}
ProductDoesntExist.prototype=Object.create(Error.prototype);
ProductDoesntExist.prototype.constructor=ProductDoesntExist;


function StoreDoesntExist(store) {
  let instance= Error.call(this,"The store "+store+" doesn´t exist");
  instance.name="StoreDoesntExist";
  return instance;
}
StoreDoesntExist.prototype=Object.create(Error.prototype);
StoreDoesntExist.prototype.constructor=StoreDoesntExist;



function StoreAlreadyAdded(store) {
  let instance= Error.call(this,"The store "+store+" is already added");

  return instance;
}
StoreAlreadyAdded.prototype=Object.create(Error.prototype);
StoreAlreadyAdded.prototype.constructor=StoreAlreadyAdded;


// export default {StoreAlreadyAdded,StoreDoesntExist,ProductDoesntExist,CategoryDoesntExist,ProductAlreadyAdded,CategoryAlreadyExist,ShopAlreadyExist,InvalidValue};
