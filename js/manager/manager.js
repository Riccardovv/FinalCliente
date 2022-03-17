import { BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';
import {Product, Laptop, Camera, Smartphone, Tablet, Category} from '../entities/products.js';
import {SortedMap} from './sortedmap.js';

class ManagerException extends BaseException {
	constructor (message = 'Error: Manager Exception.', fileName, lineNumber){
			super(message, fileName, lineNumber);
			this.name = 'ManagerException';
	}
}

class ObjecManagerException extends ManagerException {
  constructor (param, className, fileName, lineNumber){
    super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
    this.param = param;
    this.param = className;
    this.name = 'ObjecManagerException';
  }
}

class CategoryExistsException extends ManagerException {
  constructor (category, fileName, lineNumber){
    super(`Error: The ${category.title} already exists in the manager.`, fileName, lineNumber);
    this.category = category;
    this.name = 'CategoryExistsException';
  }
}

class ProductExistsException extends ManagerException {
  constructor (product, fileName, lineNumber){
    super(`Error: The ${product.serial} already exists in the manager.`, fileName, lineNumber);
    this.product = product;
    this.name = 'ProductExistsException';
  }
}

class ProductExistInCategoryException extends ManagerException {
  constructor (product, category, fileName, lineNumber){
    super(`Error: The ${product.serial} already exist in ${category.title}.`, fileName, lineNumber);
    this.category = category;
    this.product = product;
    this.name = 'ProductExistInCategoryException';
  }
}

class CategoryNotExistException extends ManagerException {
  constructor (category, fileName, lineNumber){
    super(`Error: The ${category.title} doesn't exist in the manager.`, fileName, lineNumber);
    this.category = category;
    this.name = 'CategoryNotExistException';
  }
}

class ProductNotExistInManagerException extends ManagerException {
  constructor (product, fileName, lineNumber){
    super(`Error: The ${product.serial} doesn't exist in the manager.`, fileName, lineNumber);
    this.product = product;
    this.name = 'ProductNotExistInManagerException';
  }
}

class ProductNotExistInCategoryException extends ManagerException {
  constructor (product, category, fileName, lineNumber){
    super(`Error: The ${product.serial} doesn't exist in ${category.title}.`, fileName, lineNumber);
    this.category = category;
    this.product = product;
    this.name = 'ProductNotExistInCategoryException';
  }
}

let Manager = (function () {
  let instantiated;

  function init(){ //Inicialización del Singleton
		class Manager {
			#categories = new SortedMap((categoryA, categoryB) => categoryA[0].localeCompare(categoryB[0]));
			#products = new SortedMap((productA, productB) => {
				if (productA[1].brand.toLocaleLowerCase() < productB[1].brand.toLocaleLowerCase()){
						return -1;
				} else if (productA[1].brand.toLocaleLowerCase() > productB[1].brand.toLocaleLowerCase()){
						return 1;
				} else {
						return (productA[1].model.toLocaleLowerCase() < productB[1].model.toLocaleLowerCase())? -1:1;
				}
			});

			#order = {
				serial: (productA, productB) => {return productA.serial < productB.serial? -1 : 1},
				brand: (productA, productB) => {return productA.brand < productB.brand? -1 : 1},
				model: (productA, productB) => {return productA.model < productB.model? -1 : 1},
				price: (productA, productB) => {return productA.price < productB.price? -1 : 1},
			}

			constructor (){
				if (!new.target) throw new InvalidAccessConstructorException();
			}

			addCategory(){
				for (let category of arguments){
					if (!(category instanceof Category)) {
						throw new ObjecManagerException ('category', 'Category');
					}
					if (!this.#categories.has(category.title)){
						this.#categories.set(category.title, {
							category: category,
							products: new SortedMap((productA, productB) => (productA[1].price < productB[1].price)? -1:1)
						});
					} else {
						throw new CategoryExistsException(category);
					}
				}
				return this;
			}

			addProduct(){
				for (let product of arguments){
					if (!(product instanceof Product)) {
						throw new ObjecManagerException ('product', 'Product');
					}
					if (!this.#products.has(product.serial)){
						this.#products.set(product.serial, product);
					} else {
						throw new ProductExistsException(product);
					}
				}
				return this;
			}

			#getProductPosition(product){
				return this.#products.findIndex(x => x.serial === product.serial);
			}

			#getCategoryPosition(product){
				return this.#products.findIndex(x => x.serial === product.serial);
			}


			addProductInCategory (category){
				if (!(category instanceof Category)) {
					throw new ObjecManagerException ('category', 'Category');
				}
				if (!this.#categories.has(category.title)){
					this.addCategory(category);
				}

				let storedCategory = this.#categories.get(category.title);
				for (let i = 1; i < arguments.length; i++){
					let product = arguments[i];
					if (!(product instanceof Product)) {
						throw new ObjecManagerException ('product', 'product');
					}
					if (!this.#products.has(product.serial)){
						this.addProduct(product);
					}
					let storedProduct = this.#products.get(product.serial);
					if (!storedCategory.products.has(product.serial)){
						storedCategory.products.set(product.serial, storedProduct);
					} else {
						throw new ProductExistInCategoryException(product, category);
					}
				}
				return this;
			}

			#getProductPositionInCategory(product, category){
				return category.products.findIndex(x => x.serial === product.serial);
			}

			//Devuelve un iterator de las categorías
			get categories(){
				// referencia para habilitar el closure en el objeto
				let values = this.#categories.values();
				return {
					* [Symbol.iterator](){
						for (let storedCategory of values){
							yield storedCategory.category;
						}
					}
				}
			}

			//Devuelve un iterator de los productos
			get products(){
				// referencia para habilitar el closure en el objeto
				let values = this.#products.values();
				return {
					* [Symbol.iterator](){
						for (let product of values){
							yield product;
						}
					}
				}
			}

			* getCategoryProducts(category, ordered){
				if (!(category instanceof Category)) {
					throw new ObjecManagerException ('category', 'Category');
				}
				if (this.#categories.has(category.title)){
					let storedCategory = this.#categories.get(category.title);
					let values = (ordered)? storedCategory.products.values(ordered) : storedCategory.products.values();
					for (let product of values){
						yield product;
					}
				} else{
					throw new CategoryNotExistException(category);
				}
			}

			toString (separator = '\n'){
				let str = '';
				for (let category of this.categories){
					str += category.title + separator;
					for (let product of this.getCategoryProducts(category)){
						//console.log(product.value.toString());
						str += product.toString() + separator;
					}
				}
				return str;
			}

			removeCategory(){
				for (let category of arguments){
					if (!(category instanceof Category)) {
						throw new ObjecManagerException ('category', 'Category');
					}
					if (this.#categories.has(category.title)){
						this.#categories.delete(category.title);
					} else{
						throw new CategoryNotExistException(category);
					}
				}
				return this;
			}

			removeProduct(){
				for (let product of arguments){
					if (!(product instanceof Product)) {
						throw new ObjecManagerException ('product', 'product');
					}
					if (this.#products.has(product.serial)){
						//let storedProduct = this.#products.get(product.serial);
						for (let category of this.#categories.values()){
							if (category.products.has(product.serial)){
								category.products.delete(product.serial);
							}
						}
						this.#products.delete(product.serial);
					} else{
						throw new ProductNotExistInManagerException(product);
					}
				}
				return this;
			}

			removeProductInCategory(category){
				if (!(category instanceof Category)) {
					throw new ObjecManagerException ('category', 'Category');
				}
				if (this.#categories.has(category.title)){
					let storedCategory = this.#categories.get(category.title);
					for (let i = 1; i < arguments.length; i++){
						let product = arguments[i];
						if (!(product instanceof Product)) {
							throw new ObjecManagerException ('product', 'product');
						}
						if (storedCategory.products.has(product.serial)){
							storedCategory.products.delete(product.serial);
						} else {
							throw new ProductNotExistInCategoryException(product, storedProduct.category);
						}
					}
				} else{
					throw new CategoryNotExistException(category);
				}

				return this;
			}

			clean (){
				this.#categories.length = 0;
				this.#products.length = 0;
			}

			* getTypeProducts(type, field){
				let array = [...this.#products.values()].filter(product => {
					return product instanceof type;
				});
				if (this.#order[field]){
					array.sort(this.#order[field]);
				}

				for (let product of array){
					yield product;
				}
			}

			getCategory(title){
				let storedCategory = this.#categories.get(title);
				if (!storedCategory)
					throw new CategoryNotExistException(new Category(title));
				return storedCategory.category;
			}

			getProduct(serial){
				let storedProduct = this.#products.get(serial);
				if (!storedProduct)
					throw new ProductNotExistInManagerException(new Laptop(serial, 'anon', 'anon', 0.0001));
				return storedProduct;
			}

		}
		Object.defineProperty(Manager.prototype, 'categories', {enumerable: true});
		Object.defineProperty(Manager.prototype, 'products', {enumerable: true});

		let manager = new Manager();
		Object.freeze(manager);
		return manager;
	}
  return {
    getInstance: function () {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  };
})();


export {ManagerException, ObjecManagerException, CategoryExistsException, ProductExistInCategoryException, CategoryNotExistException, ProductNotExistInManagerException, ProductNotExistInCategoryException};
export default Manager;
export {BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException } from '../exceptions.js';
export {Product, Laptop, Camera, Smartphone, Tablet, Category} from '../entities/products.js';

