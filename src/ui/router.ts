import Vue from "vue";
import Router from "vue-router";
import MarkdownEditor from "./components/MarkdownEditor.vue";
import TestComponent from "./components/TestComponent.vue";

/**
 * Use the router plugin
 */
Vue.use(Router);

/**
 * Create and export the router
 */
export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: TestComponent
		},
		{
			path: '/editor',
			name: 'editor',
			component: MarkdownEditor
		}
	]
})
