import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
const route = new VueRouter({
    // mode: "history",
    base: '/',
    routes:[
    	{
    		path: '/',
            component: ()=>import('../pages/Home.vue'),
            redirect: "/home",
            children:[
            	{
		            path: '/home',
		            name: 'Home',
		            component: ()=>import('../pages/Home.vue'),
		        }
            ]
    	},
        
    ]
})

export default route;