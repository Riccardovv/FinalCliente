import StoreHouse from "./StoreHouse.js";
import StoreView from "./storeView.js";
import StoreController from "./storeController.js"
import Validator from "./validate.js";



  const ManagerApp = new StoreController(new StoreHouse('StoreHouse'), new StoreView(), new Validator());


  
