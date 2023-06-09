import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import EmployeeForm from "../views/EmployeeForm.vue";
import OwnerForm from "../views/OwnerForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/employeeForm",
      name: "employeeForm",
      component: EmployeeForm,
    },
    {
      path: "/ownerForm",
      name: "ownerForm",
      component: OwnerForm,
    },
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }*/
  ],
});

export default router;
