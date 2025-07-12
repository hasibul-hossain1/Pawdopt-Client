import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "@/Pages/LoginPage/LoginPage";
import Register from "@/Pages/LoginPage/Register";
import PetList from "@/Pages/PetList/PetList";
import DashboardLayout from "@/Layouts/DashboardLayout";

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
            },
            {
                path:'/pet-list',
                Component:PetList
            }
        ]
    },
    {
        path:'/dashboard',
        Component:DashboardLayout
    }
])