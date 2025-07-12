import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
function PetList() {
  return (
    <section className="mt-4">
      <h2 data-aos="slide-right">Available Pets</h2>
      <Separator className="mb-4"/>
      <div className="flex w-full mb-4 justify-center items-center gap-2">
        <Input className="max-w-sm" type="text" placeholder="🔍 Search"/>
      </div>
      <div>
        <Card className="w-full bg-secondary hover:scale-105 duration-400 xs:w-xs">
          <div className="px-6">
            <img
              className="w-full rounded-xl"
              src="https://www.allianz.ie/blog/your-pet/choosing-a-pedigree-pet/_jcr_content/root/stage/stageimage.img.82.3360.jpeg/1727944382981/cute-happy-pup.jpeg"
              alt=""
            />
          </div>
          <Separator />
          <CardHeader>
            <CardTitle>
              <h5 className="text-3xl">Doggy</h5>
            </CardTitle>
          </CardHeader>
          <CardDescription className="px-6">
            <p className="flex justify-start gap-2 items-center">
              <FaRegCalendarAlt />
              <span className="font-bold">Age:</span> 2 year
            </p>
            <p className="flex justify-start gap-2 items-center">
              <FaLocationDot /> <span className="font-bold">Location:</span>{" "}
              Dhaka
            </p>
          </CardDescription>
          <CardAction className="px-6 flex justify-end w-full">
            <Button className="">View Details</Button>
          </CardAction>
        </Card>
      </div>
    </section>
  );
}

export default PetList;
