import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    meta: {
      needAuth: true,
    },
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Information" */ "../views/Login.vue"),
  },
  {
    path: "/menu",
    name: "menu",
    component: () =>
      import(/* webpackChunkName: "JobVacancies" */ "../views/Menu.vue"),
  },
  {
    path: "/account",
    name: "Account",
    meta: {
      needAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "JobVacancies" */ "../views/Account/Account.vue"
      ),
  },
  {
    path: "/account/:action",
    name: "AccountCreate",
    meta: {
      needAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "JobVacancies" */ "../views/Account/AccountForm.vue"
      ),
  },
  {
    path: "/account/:action/:id",
    name: "AccountEdit",
    meta: {
      needAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "JobVacancies" */ "../views/Account/AccountForm.vue"
      ),
  },
  {
    path: "/transaction",
    name: "Transaction",
    meta: {
      needAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "JobVacancies" */ "../views/Transaction/Transaction.vue"
      ),
  },
  {
    path: "/transaction/:id",
    name: "TransactionDetail",
    meta: {
      needAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "JobVacancies" */ "../views/Transaction/TransactionDetail.vue"
      ),
  },
  {
    path: "/transaction-report",
    name: "TransactionReport",
    meta: {
      needAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "JobVacancies" */ "../views/Report/TransactionReport.vue"
      ),
  },
  {
    path: "/employees-report",
    name: "EmployeesReport",
    meta: {
      needAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "JobVacancies" */ "../views/Report/EmployeesReport.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters["login/isAuthenticated"];

  const requiredAuth = to.matched.some((record) => record.meta.needAuth);
  try {
    if (requiredAuth && !isAuthenticated) {
      console.log("gagal");
      next("/login");
    } else if (requiredAuth && isAuthenticated) {
      console.log("berhasil");
      await store.dispatch("login/getProfile");
      next();
    } else {
      next();
    }
  } catch (error) {
    // console.log(error.message);
    if (error.message == 401) {
      next("/login");
    } else {
      next();
    }
  }
});
export default router;
