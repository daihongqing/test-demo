import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home.vue';
import Handle from '../pages/Handle.vue';
Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'hash',
	routes: [{
		path: '/',
		component: Home
	}, {
		path: '/handle',
		component: Handle
	}, {
		path: '*',
		redirect: '/'
	}]
});
export default router;