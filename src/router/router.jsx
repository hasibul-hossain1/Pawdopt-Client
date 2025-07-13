import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "@/Pages/LoginPage/LoginPage";
import Register from "@/Pages/LoginPage/Register";
import PetList from "@/Pages/PetList/PetList";
import DashboardLayout from "@/Layouts/DashboardLayout";
import AddPet from "@/Pages/AddPet/AddPet";
import MyAddedPets from "@/Pages/Dashboard/MyAddedPets";
import AdoptionRequest from "@/Pages/Dashboard/AdoptionRequest";
import CreateDonationCampaign from "@/Pages/Dashboard/CreateDonationCampaign";
import MyDonationCampaigns from "@/Pages/Dashboard/MyDonationCampaigns";
import MyDonations from "@/Pages/Dashboard/MyDonations";
import PetDetails from "@/Pages/PetDetails/PetDetails";

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
            },
            {
                path:'/pets/:id',
                Component:PetDetails
            }
        ]
    },
    {
        path:'/dashboard',
        Component:DashboardLayout,
        children:[
            {
                path:'add-pet',
                Component:AddPet
            },
            {
                path:'my-added-pets',
                Component:MyAddedPets
            },
            {
                path:'adoption-request',
                Component:AdoptionRequest
            },
            {
                path:'create-donation-campaign',
                Component:CreateDonationCampaign
            },
            {
                path:'my-donation-campaigns',
                Component:MyDonationCampaigns
            },
            {
                path:'my-donations',
                Component:MyDonations
            }
        ]
    }
])