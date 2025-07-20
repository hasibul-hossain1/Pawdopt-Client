import React, { useState } from "react";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, PawPrint } from "lucide-react";
import { api } from "@/lib/api";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/Auth";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

const CreateDonationCampaign = () => {
  const [imagePreview, setImagePreview] = useState("");
  const currentUser = useAuth();
  const [progress, setProgress] = useState(0);

  const validate = (values) => {
    const errors = {};
    if (!values.maxDonationAmount) {
      errors.maxDonationAmount = "Max donation amount is required";
    }

    if (!values.shortDescription) {
      errors.shortDescription = "Short description is required";
    }
    // For ReactQuill, check if the content is empty (e.g., just <p><br></p> or empty string)
    if (!values.longDescription || values.longDescription === "<p><br></p>") {
      errors.longDescription = "Long description is required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      petName: "",
      maxDonationAmount: 0,
      lastDate: null,
      shortDescription: "",
      longDescription: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      if (!imagePreview) {
        return setFieldError("petImage", "Pet image is required");
      }
      setSubmitting(true);
      try {
        const payload = {
          ...values,
          petImage: imagePreview,
          addedBy: currentUser.data.email,
          maxDonationAmount: parseInt(values.maxDonationAmount),
        };
        console.log(payload);
        const res = await api.post("/create-donation", payload);
        if (res.data.success) {
          toast.success('Donation campaign created successfully!');
          resetForm();
          setImagePreview("");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
        setFieldError("general", error.message || "An error occurred");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return console.log("file type not matched");
      }
      setProgress(33);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_unsigned_preset");
      formData.append("cloud_name", "dzwfjw6ri");
      setProgress(80);
      formik.setFieldError("petImage", undefined);
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dzwfjw6ri/image/upload",
          formData
        );
        const result = res.data.url;
        setImagePreview(result);
        setProgress(100);
      } catch (error) {
        console.log(error);
      }
      setProgress(0);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto" data-aos="fade-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PawPrint className="h-6 w-6" />
          Create New Donation Campaign
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="petImage">Pet Image</Label>
            <div className="mt-2 flex items-center gap-4">
              <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Pet preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div>
                {" "}
                {progress === 0 ? (
                  ""
                ) : (
                  <>
                    <span>Uploading...</span>
                    <Progress value={progress} className="w-full" />
                  </>
                )}
              </div>
              <Input
                id="petImage"
                name="petImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("petImage").click()}
              >
                Upload Image
              </Button>
            </div>
            {formik.errors.petImage && formik.touched.petImage && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.petImage}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="petName">Pet Name</Label>
              <Input
                id="petName"
                name="petName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.petName}
                placeholder="Enter pet's name"
              />
              {formik.errors.petName && formik.touched.petName && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.petName}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="maxDonationAmount">
                Maximum Donation Amount $
              </Label>
              <Input
                id="MaxDonationAmount"
                name="maxDonationAmount"
                type="number"
                className="mt-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.maxDonationAmount}
                placeholder="donation Amount"
              />
              {formik.errors.maxDonationAmount &&
                formik.touched.maxDonationAmount && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.maxDonationAmount}
                  </div>
                )}
            </div>
            <div>
              <Label htmlFor="donationCalender">Last Date of Donation</Label>
              <div className="rounded-lg border shadow-sm">
                <Calendar
                  id="donationCalender"
                  mode="single"
                  name="lastDate"
                  defaultMonth={formik.values.lastDate}
                  selected={formik.values.lastDate}
                  onSelect={(date) => formik.setFieldValue("lastDate", date)}
                />
              </div>
              {formik.errors.lastDate && formik.touched.lastDate && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.lastDate}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shortDescription}
              placeholder="A brief summary about the pet"
            />
            {formik.errors.shortDescription &&
              formik.touched.shortDescription && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.shortDescription}
                </div>
              )}
          </div>

          <div>
            <Label htmlFor="longDescription">Long Description</Label>
            <ReactQuill
              theme="snow"
              value={formik.values.longDescription}
              onChange={(value) =>
                formik.setFieldValue("longDescription", value)
              }
              onBlur={() => formik.setFieldTouched("longDescription", true)}
              className="mt-2"
            />
            {formik.errors.longDescription &&
              formik.touched.longDescription && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.longDescription}
                </div>
              )}
          </div>

          {formik.errors.general && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.general}
            </div>
          )}

          <Button type="submit" className="w-full">
            Create Campaign
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateDonationCampaign;
