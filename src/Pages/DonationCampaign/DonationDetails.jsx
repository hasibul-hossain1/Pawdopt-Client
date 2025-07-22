import React, { useState } from "react";
import { useAuth } from "@/hooks/Auth";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaLocationDot } from "react-icons/fa6";
import { FaHandPointRight, FaRegCalendarAlt } from "react-icons/fa";
import Divider from "@/Shared/Divider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckoutForm from "./CheckoutForm";
import DonationCard from "./DonationCard";

const stripePromise = loadStripe(
  "pk_test_51Rh11RRogI4oERhxVE2KcnH8WvnRv19TMWufnEKaNMT4TFwxtU7fktxgItxkef1JYedGqsI6lowWMJObH83O2SPa00vHxDAjMJ"
);

const fetchPetById = async (id) => {
  const res = await api.get(`/donation-details/${id}`);
  return res.data;
};
const fetchDonations = async (id) => {
  
  const res = await api.get(`/recommended-donations/${id}`);
  return res.data;
};

function DonationDetails() {
  const { id } = useParams();
  const [amount, setAmount] = useState('');
  const user = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: pet,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["pet", id],
    queryFn: () => fetchPetById(id),
  });
  const {
    data: campaigns,
  } = useQuery({
    queryKey: ["recommended-donations",id],
    queryFn:()=> fetchDonations(id),
  });
 


  if (isLoading) {
    return <p className="text-center">Loading pet details...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }
if (user.loading) {
  return 'loading'
}
  return (
    <section className="mt-4">
      <Card className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div data-aos="fade-right">
            <img
              className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
              src={pet.petImage}
              alt={pet.petName}
            />
          </div>
          <div className="p-6" data-aos="fade-left">
            <CardHeader>
              <CardTitle>
                <h5 className="text-3xl">{pet.petName}</h5>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex justify-start gap-2 items-center">
                <FaRegCalendarAlt />
                <span className="font-bold">Added by:</span> {pet.addedBy}
              </p>
              <p className="flex justify-start gap-2 items-center">
                <FaHandPointRight />{" "}
                <span className="font-bold">Max Donation Amount:</span>{" "}
                {pet.maxDonationAmount} $
              </p>
              <p className="flex justify-start gap-2 items-center">
                <FaHandPointRight />{" "}
                <span className="font-bold">Donation Raised:</span>{" "}
                {pet.donationRaised} $
              </p>
              <Separator className="my-4" />
              <p className="text-gray-600">{pet.shortDescription}</p>
              <Separator className="my-4" />
              <div>
                <p>
                  <span className="font-bold">Donation Status:</span>{" "}
                  {pet?.paused?"paused":new Date(pet.lastDate) < new Date() ||
                  pet.donationRaised >= pet.maxDonationAmount
                    ? "Closed"
                    : "Running"}
                </p>
                <p>
                  <span className="font-bold">Posted:</span>{" "}
                  {new Date(pet.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Divider>Description</Divider>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: pet.longDescription }}
              />
              <div className="mt-6">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      disabled={
                        new Date(pet.lastDate) < new Date() ||
                        pet.donationRaised >= pet.maxDonationAmount
                          || pet.paused ? true
                          : false
                      }
                    >
                      {pet?.paused?"Donation paused by user":"Donate"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Adopt {pet.petName}</DialogTitle>
                      <DialogDescription>
                        Fill in your details to request adoption for{" "}
                        {pet.petName}.
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={pet.petImage}
                            alt={pet.petName}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div>
                            <h4 className="font-bold">{pet.petName}</h4>
                            <p className="text-sm text-gray-500">
                              ID: {pet._id}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="userName" className="text-right">
                            Your Name
                          </Label>
                          <Input
                            id="userName"
                            defaultValue={user?.data?.displayName || ""}
                            disabled
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="userEmail" className="text-right">
                            Your Email
                          </Label>
                          <Input
                            id="userEmail"
                            defaultValue={user?.data?.email || ""}
                            disabled
                            className="col-span-3"
                          />
                        </div>
                        <div>
                          <Label htmlFor="userEmail">
                            Enter Amount you want to donate. <br />
                            You can donate {pet.maxDonationAmount-pet.donationRaised}$
                          </Label>
                          <br />
                          <Input
                            id="donateAmount"
                            type="number"
                            className="col-span-3"
                            value={amount}
                            max={pet.maxDonationAmount-pet.donationRaised}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              const max=pet.maxDonationAmount-pet.donationRaised
                              if (value<0||isNaN(value)) {
                               setAmount(1) 
                              }
                              if (value>max) {
                                setAmount(max)
                              }
                              if (value <= max) {
                                setAmount(value);
                              }
                            }}
                          />
                        </div>
                        <div>
                          <Elements stripe={stripePromise}>
                            <CheckoutForm refetch={refetch} campaignId={id} setIsDialogOpen={setIsDialogOpen} amount={amount} userData={{name:user.data.displayName,email:user.data.email}}/>
                          </Elements>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Donations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns &&
            campaigns
              .filter((campaign) => campaign._id !== id)
              .slice(0, 3)
              .map((campaign) => (
                <DonationCard key={campaign._id} campaign={campaign} />
              ))}
              
        </div>
      </div>
    </section>
  );
}

export default DonationDetails;
