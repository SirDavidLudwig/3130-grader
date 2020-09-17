import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

/**
 * Include Bootstrap JS
 */
require("bootstrap");

/**
 * Automatically register all Vue components
 */
const files = require.context('./components', true, /\.vue$/i);
files.keys().map(key => {
	Vue.component(
		(<string>key.split('/').pop()).split('.')[0],
		files(key).default);
});

/**
 * Create the Vue application
 */
let app = new Vue({
	router,
	el: "#app"
});

/**
 * Make the app accessible to devtools
 */
declare var window: any;
window.app = app;
