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
// import ViewDonors from "@/Pages/Dashboard/ViewDonors";
import PetDetails from "@/Pages/PetDetails/PetDetails";
import DonationCampaign from "@/Pages/DonationCampaign/DonationCampaign";
import DonationDetails from "@/Pages/DonationCampaign/DonationDetails";

import AllUsers from "@/Pages/Dashboard/AllUsers";
import AllPets from "@/Pages/Dashboard/AllPets";
import AllDonations from "@/Pages/Dashboard/AllDonations";
import PrivateRoute from "@/Shared/PrivateRoute";
import AdminRoute from "@/Shared/AdminRoute";
import NotFoundPage from "@/Pages/NotFoundPage/NotFoundPage";

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
                element:<PrivateRoute><PetDetails/></PrivateRoute>
            },
            {
                path:'/donation-campaign',
                Component:DonationCampaign
            },
            {
                path:'/donation-details/:id',
                element:<PrivateRoute><DonationDetails/></PrivateRoute>
            },
            {
                path:'*', // Catch-all route for 404
                Component:NotFoundPage
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
        children:[
            {
                index:true,
                element:<PrivateRoute><AddPet/></PrivateRoute>
            },
            {
                path:'my-added-pets',
                element:<PrivateRoute><MyAddedPets/></PrivateRoute>
            },
            {
                path:'adoption-request',
                element:<PrivateRoute><AdoptionRequest/></PrivateRoute>
            },
            {
                path:'create-donation-campaign',
                element:<PrivateRoute><CreateDonationCampaign/></PrivateRoute>
            },
            {
                path:'my-donation-campaigns',
                element:<PrivateRoute><MyDonationCampaigns/></PrivateRoute>
            },
            {
                path:'my-donations',
                element:<PrivateRoute><MyDonations/></PrivateRoute>
            },
            {
                path:'update-pet/:id',
                element:<PrivateRoute><UpdatePet/></PrivateRoute>
            },
            {
                path:'edit-campaign/:id',
                element:<PrivateRoute><EditCampaign/></PrivateRoute>
            },
            {
                path:'all-users',
                element:<AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path:'all-pets',
                element:<AdminRoute><AllPets/></AdminRoute>
            },
            {
                path:'all-donations',
                element:<AdminRoute><AllDonations/></AdminRoute>
            }
        ]
    }
])