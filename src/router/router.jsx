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
import UpdatePet from "@/Pages/AddPet/UpdatePet";
import EditCampaign from "@/Pages/Dashboard/EditCampaign";
import ViewDonors from "@/Pages/Dashboard/ViewDonors";
import PetDetails from "@/Pages/PetDetails/PetDetails";
import DonationCampaign from "@/Pages/DonationCampaign/DonationCampaign";
import DonationDetails from "@/Pages/DonationCampaign/DonationDetails";

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
            },
            {
                path:'/donation-campaign',
                Component:DonationCampaign
            },
            {
                path:'/donation-details/:id',
                Component:DonationDetails
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
            },
            {
                path:'update-pet/:id',
                Component:UpdatePet
            },
            {
                path:'edit-campaign/:id',
                Component:EditCampaign
            },
            {
                path:'view-donors/:id',
                Component:ViewDonors
            }
        ]
    }
])