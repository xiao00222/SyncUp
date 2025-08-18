import { createBrowserRouter } from "react-router";
import App from "../Layouts/App";
import HomepPage from "../../Features/Home/HomepPage";
import { ActivityDashboard } from "../../Features/Activities/Dashboard/ActivityDashboard";
import Activityform from "../../Features/Activities/form/Activityform";
import { ActivityDetails } from "../../Features/Activities/Details/ActivityDetails";

export const router= createBrowserRouter(
    [
        {
            path:'/',
            element:<App/>, 
            children:[
                { path:'',element:<HomepPage/>},
                { path:'activities',element:<ActivityDashboard/>},
                { path:'activities/:id',element:<ActivityDetails/>},
                { path:'createActivity',element:<Activityform key='create'/>},
                { path:'manage/:id',element:<Activityform/>}
            ]
        }   
    ]
)
