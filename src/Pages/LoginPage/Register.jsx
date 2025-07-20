import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Divider from "@/Shared/Divider";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { createUser, updateProfileUser } from "../../../firebase/firebasePanel";
import lot from "../../assets/4.json";
import { useFormik } from "formik";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/lib/api";
import { Upload } from "lucide-react";
import { toast } from "sonner";

function Register() {
  const lottieRef = useRef();
  const imageRef = useRef();
  const [imageURL, setImageURL] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!/^[a-z]+(?:\s[a-z]+)*$/i.test(values.displayName))
        errors.displayName = "Invalid name";
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "Invalid email";
      if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(values.password))
        errors.password =
          "Invalid password. must use one lowercase one uppercase and one number and at least 6 character";
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      if (!imageRef.current.value) {
        setImageError("You have to upload the image");
        return;
      }
      if (!imageURL) {
        setImageError("Image Upload Failed");
        return;
      }
      createUser(values.email, values.password)
        .then((res) => {
          if (res) {
            setFirebaseError("");
            updateProfileUser({
              displayName: values.displayName,
              photoURL: imageURL || "",
            });
            toast.success("Registration successful!");
          }
        })
        .then(() => {
          api
            .post("/users", {
              name: values.displayName,
              email: values.email,
            })
            .then((res) => toast.success("User data saved!"))
            .catch((err) => toast.error("Failed to save user data: " + err.message));
        })
        .catch((err) => {
          setFirebaseError(err?.message || "Invalid auth Error");
          toast.error(err?.message || "Registration failed!");
        });
      resetForm();
      if (imageRef.current.value || imageURL) {
        imageRef.current.value = "";
        setImageURL("");
        setImageError("");
      }
    },
  });

  const handleImage = async (e) => {
    setProgress(33);
    setImageURL("");
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file detected");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_unsigned_preset");
    formData.append("cloud_name", "dzwfjw6ri");
    setProgress(80);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dzwfjw6ri/image/upload",
        formData
      );
      const result = res.data.url;
      setImageURL(result);
      setProgress(100);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed: " + error.message);
    }
    setProgress(0);
  };

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.2);
    }
  }, []);

  return (
    <section className="flex flex-col-reverse md:flex-row justify-center items-center h-screen">
      <Card className="p-8 rounded-lg w-full max-w-md" data-aos="slide-right">
        <form onSubmit={formik.handleSubmit}>
          <h4 className="mb-4">Create An Account</h4>

          <Divider></Divider>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Name</Label>
            <Input
              required
              type="text"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="displayName"
              placeholder="Your name"
            />
            {formik.touched.displayName && formik.errors.displayName && (
              <div className="text-red-500 text-sm">
                {formik.errors.displayName}
              </div>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Photo</Label>
            <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt="Pet preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
            {progress === 0 ? (
              ""
            ) : (
              <>
                <span>Uploading...</span>
                <Progress value={progress} className="w-[60%]" />
              </>
            )}
            <Input
              required
              onChange={handleImage}
              ref={imageRef}
              type="file"
              name="photoURL"
              placeholder="Your name"
            />
            {imageError && (
              <div className="text-red-500 text-sm">{imageError}</div>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Email</Label>
            <Input
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              name="email"
              onBlur={formik.handleBlur}
              placeholder="your-mail@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <div className="grid w-full mt-4 max-w-sm items-center gap-3">
            <Label>Password</Label>
            <Input
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="password"
              placeholder="Your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="grid w-full mt-4 max_w-sm items-center gap-3">
            <Button type="submit">Register</Button>
            {firebaseError && (
              <div className="text-red-500 text-sm">{firebaseError}</div>
            )}
          </div>
        </form>
      </Card>
      <div data-aos="slide-left" className="w-full md:w-1/2">
        <Lottie
          lottieRef={lottieRef}
          animationData={lot}
          loop={true}
          speed={0.1}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </section>
  );
}

export default Register;
