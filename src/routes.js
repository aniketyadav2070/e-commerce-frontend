import React, { lazy } from "react";
import HomeLayout from "src/layouts/HomeLayout";
import LoginLayout from "./layouts/LoginLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/LandingPage/LandingPage")),
  },

  {
    exact: true,
    path: "/view-all-products/:category",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/ViewAllProducts/ViewAllProducts")),
  },

  {
    exact: true,
    path: "/view-product/:id",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/ViewProduct/ViewProduct")),
  },

  {
    exact: true,
    path: "/create-product",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Product/CreateProduct")),
  },

  {
    exact: true,
    path: "/my-products",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Product/MyProducts")),
  },

  {
    exact: true,
    path: "/login",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/LogIn/Login")),
  },
  
  {
    exact: true,
    path: "/register",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/signup/SignUp")),
  },
 
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },

];
