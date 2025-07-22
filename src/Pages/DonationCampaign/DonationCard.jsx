import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { MdDeviceUnknown } from "react-icons/md";
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

function DonationCard({ campaign }) {
  const { _id, lastDate,paused, petName, maxDonationAmount, petImage, donationRaised } = campaign;
  
  return (
    <Card className="w-full bg-secondary hover:scale-105 duration-400 xs:w-xs" data-aos="zoom-in">
      <div className="px-6">
        <img
          className="w-full rounded-xl object-cover object-center h-48"
          src={petImage}
          alt=""
        />
      </div>
      <Separator />
      <CardHeader>
        <CardTitle>
          <h5 className="text-3xl">{petName}</h5>
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
        <p className="flex justify-start gap-2 items-center">
          <MdDeviceUnknown /> <span className="font-bold">Status:</span>{" "}
          {paused?"paused":new Date(lastDate) < new Date() ||
                  donationRaised >= maxDonationAmount
                    ? "Closed"
                    : "Running"}
        </p>
      </CardDescription>
      <CardAction className="px-6 flex justify-end w-full">
        <Link to={`/donation-details/${_id}`}>
          <Button className="">View Details</Button>
        </Link>
      </CardAction>
    </Card>
  );
}

export default DonationCard;
