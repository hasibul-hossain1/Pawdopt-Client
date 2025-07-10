import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "@/Pages/LoginPage/LoginPage";
import Register from "@/Pages/LoginPage/Register";

export const router=createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:HomePage
            },
            {
                path:'/login',
                Component:LoginPage
            },
            {
                path:'/register',
                Component:Register
            }
        ]
    }
])