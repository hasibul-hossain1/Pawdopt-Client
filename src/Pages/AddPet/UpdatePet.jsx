import React, { useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
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
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const petCategories = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "bird", label: "Bird" },
  { value: "other", label: "Other" },
];


const UpdatePet = () => {
  const {state:pet}=useLocation()
  const navigate = useNavigate();
  
  const [imagePreview, setImagePreview] = useState(pet.petImage);
  const currentUser=useAuth()
  const [progress, setProgress] = useState(0);

  const validate = (values) => {
    const errors = {};
    if (!values.petName) {
      errors.petName = "Pet name is required";
    }
    if (!values.petAge) {
      errors.petAge = "Pet age is required";
    } else if (isNaN(values.petAge) || values.petAge <= 0) {
      errors.petAge = "Age must be a positive number";
    }
    if (!values.petCategory) {
      errors.petCategory = "Pet category is required";
    }
    if (!values.petLocation) {
      errors.petLocation = "Pet location is required";
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
      petName: pet.petName,
      petAge: pet.petAge,
      petCategory: pet.petCategory,
      petLocation: pet.petLocation,
      shortDescription: pet.shortDescription,
      longDescription: pet.longDescription,
    },
    validate,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      if (!imagePreview) {
        setFieldError("petImage", "Pet image Upload failed");
        setSubmitting(false);
        return;
      }


      const petData = {
        ...values,
        petImage: imagePreview,
        addedBy:currentUser.data.email,
      };
      try {
        const res = await api.put(`/update-pet/${pet._id}`, petData);
        if (res.data) {
          toast.success('Pet updated successfully');
          navigate(-1);
        }
      } catch (error) {
        toast.error("Error updating pet:", error.message);
        setFieldError("general", "An error occurred while updating the pet.");
      } finally {
        setSubmitting(false);
      }
    },
  });


  const handleImageChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error('File type not matched');
      }
      setProgress(33);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_unsigned_preset");
      formData.append("cloud_name", "dzwfjw6ri");
        setProgress(80)
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
        toast.error(error.message || 'An error occurred');
      }
      setProgress(0);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto" data-aos="fade-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PawPrint className="h-6 w-6" />
          Update Pet
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
                accept='image/*'
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Label htmlFor="petAge">Pet Age (month)</Label>
              <Input
                id="petAge"
                name="petAge"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.petAge}
                placeholder="Enter pet's age"
              />
              {formik.errors.petAge && formik.touched.petAge && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.petAge}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="petCategory">Pet Category</Label>
            <Select
              id="petCategory"
              name="petCategory"
              options={petCategories}
              onChange={(selectedOption) =>
                formik.setFieldValue(
                  "petCategory",
                  selectedOption ? selectedOption.value : ""
                )
              }
              onBlur={() => formik.setFieldTouched("petCategory", true)}
              value={petCategories.find(
                (option) => option.value === formik.values.petCategory
              )}
              className="mt-2"
              classNamePrefix="react-select"
            />
            {formik.errors.petCategory && formik.touched.petCategory && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.petCategory}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="petLocation">Pet Location</Label>
            <Input
              id="petLocation"
              name="petLocation"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.petLocation}
              placeholder="Enter pickup location"
            />
            {formik.errors.petLocation && formik.touched.petLocation && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.petLocation}
              </div>
            )}
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

          <Button
            type="submit"
            className="w-full"
          >
             Update pet
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePet;
