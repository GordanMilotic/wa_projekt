import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import EmployeeForm from "../views/EmployeeForm.vue";
import OwnerForm from "../views/OwnerForm.vue";
import EmployeeLogin from "../components/EmployeeLogin.vue";
import OwnerLogin from "../components/OwnerLogin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: EmployeeLogin,
    },
    {
      path: "/employeeLogin",
      name: "employeeLogin",
      component: EmployeeLogin,
    },
    {
      path: "/ownerLogin",
      name: "ownerLogin",
      component: OwnerLogin,
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
  ],
});

export default router;
