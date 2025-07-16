import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

function DonationCard({ _id, name, maxDonationAmount, image, donationRaised }) {
  return (
    <Card className="w-full bg-secondary hover:scale-105 duration-400 xs:w-xs">
      <div className="px-6">
        <img
          className="w-full rounded-xl object-cover object-center h-48"
          src={image}
          alt=""
        />
      </div>
      <Separator />
      <CardHeader>
        <CardTitle>
          <h5 className="text-3xl">{name}</h5>
        </CardTitle>
      </CardHeader>
      <CardDescription className="px-6">
        <p className="flex justify-start gap-2 items-center">
          <FaRegCalendarAlt />
          <span className="font-bold">Max Donation Amount:</span> {maxDonationAmount}$
        </p>
        <p className="flex justify-start gap-2 items-center">
          <FaLocationDot /> <span className="font-bold">Donation Raised:</span>{" "}
          {donationRaised}$
        </p>
      </CardDescription>
      <CardAction className="px-6 flex justify-end w-full">
        <Link to={`/pets/${_id}`}>
          <Button className="">View Details</Button>
        </Link>
      </CardAction>
    </Card>
  );
}

export default DonationCard;
