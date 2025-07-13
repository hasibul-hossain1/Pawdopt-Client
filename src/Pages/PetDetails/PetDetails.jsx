import React, { useState } from "react";
import { useAuth } from "@/hooks/Auth";
import { toast } from "sonner";
import { useFormik } from "formik";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import Divider from "@/Shared/Divider";
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

const fetchPetById = async (id) => {
  const res = await api.get(`/pets/${id}`);
  return res.data;
};

function PetDetails() {
  const { id } = useParams();
  const user = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: pet,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pet", id],
    queryFn: () => fetchPetById(id),
  });

   const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      address: "",
    },
    onSubmit: async (values) => {
      const adoptionData = {
        petId: pet._id,
        petName: pet.petName,
        petImage: pet.petImage,
        userName: user?.data?.displayName,
        userEmail: user?.data?.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
      };

      try {
        const res=await api.post("/adoption-requests", adoptionData);
        console.log(res.data);
        toast.success("Adoption request submitted successfully!");
        setIsDialogOpen(false); // Close the dialog on success
      } catch (error) {
        console.error("Error submitting adoption request:", error);
        toast.error("Failed to submit adoption request. Please try again.");
      }
    },
  });

  if (isLoading) {
    return <p className="text-center">Loading pet details...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

 

  return (
    <section className="mt-4">
      <Card className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img
              className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
              src={pet.petImage}
              alt={pet.petName}
            />
          </div>
          <div className="p-6">
            <CardHeader>
              <CardTitle>
                <h5 className="text-3xl">{pet.petName}</h5>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex justify-start gap-2 items-center">
                <FaRegCalendarAlt />
                <span className="font-bold">Age:</span> {pet.petAge} year
              </p>
              <p className="flex justify-start gap-2 items-center">
                <FaLocationDot /> <span className="font-bold">Location:</span>{" "}
                {pet.petLocation}
              </p>
              <Separator className="my-4" />
              <p className="text-gray-600">{pet.shortDescription}</p>
              <Separator className="my-4" />
              <div>
                <p>
                  <span className="font-bold">Category:</span> {pet.petCategory}
                </p>
                <p>
                  <span className="font-bold">Status:</span>{" "}
                  {pet.adopted ? "Adopted" : "Available"}
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
                    <Button>Adopt Now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Adopt {pet.petName}</DialogTitle>
                      <DialogDescription>
                        Fill in your details to request adoption for{" "}
                        {pet.petName}.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={formik.handleSubmit}>
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
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phoneNumber" className="text-right">
                            Phone Number
                          </Label>
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            className="col-span-3"
                            placeholder="Enter your phone number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="address" className="text-right">
                            Address
                          </Label>
                          <Input
                            id="address"
                            name="address"
                            className="col-span-3"
                            placeholder="Enter your address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit">Submit Adoption Request</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default PetDetails;
