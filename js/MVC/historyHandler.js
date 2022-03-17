import StoreController from "./storeController.js";
import StoreView from "./storeView.js";


let storeApp = new StoreController();


const historyActions = {
	init: () => {
		storeApp.handleInit();

	},

  showStores: (event) => storeApp.handleShowStores(),

  ShowCategories: (event) => storeApp.handleShowCategories(),

  ShowStoreProducts: (event) => storeApp.handleShowStoreProducts(event.state),

  ShowProducts: (event) => storeApp.handleShowProduts(event.state)


}

window.addEventListener('popstate', function(event) {
  console.dir(event)
  if (event.state){
		historyActions[event.state.action](event);
  }
});

history.replaceState({action: 'init'}, null);

