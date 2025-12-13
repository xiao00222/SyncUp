import { createBrowserRouter, Navigate } from "react-router";
import App from "../Layouts/App";
import HomepPage from "../../Features/Home/HomepPage";
import { ActivityDashboard } from "../../Features/Activities/Dashboard/ActivityDashboard";
import Activityform from "../../Features/Activities/form/Activityform";
import { ActivityDetailsPage } from "../../Features/Activities/Details/ActivityDetailsPage";
import Counter from "../../Features/Counter/Counter";
import TestErrors from "../../Features/errors/erros";
import NotFound from "../../Features/errors/NotFound";
import ServerError from "../../Features/errors/ServerError";
import LoginForm from "../../Features/Account/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../Features/Account/RegisterForm";
import ProfilePage from "../../Features/profile/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {element:<RequireAuth/>,children:[
 { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetailsPage /> },
      { path: "createActivity", element: <Activityform key="create" /> },
      { path: "manage/:id", element: <Activityform /> },
      {path:"profiles/:id",element:<ProfilePage/>}
      ]},
      { path: "", element: <HomepPage /> },
      { path: "counter", element: <Counter /> },
      { path: "errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
