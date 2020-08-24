import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Main from "@/views/Main.vue";
import SignIn from "@/views/SignIn.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/main",
		name: "Main",
		component: Main,
	},
	{
		path: "/sign-in",
		name: "SignIn",
		component: SignIn,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
