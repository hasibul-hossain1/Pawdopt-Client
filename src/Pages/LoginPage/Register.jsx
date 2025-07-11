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


function Register() {
  const lottieRef = useRef();
  const imageRef=useRef()
  const [imageURL, setImageURL] = useState('');
  const [progress, setProgress] = useState(0);
  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validate:(values)=>{
      const errors={}
      if (!/^[a-z]{1,25}$/i.test(values.displayName))return errors.displayName= 'Invalid name'
      if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i .test(values.email))return errors.email="Invalid email"
      if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(values.password)) return errors.password="Invalid password must use one lower case one upper case and one number and at least 6 character"
    },
    onSubmit: (values, { resetForm }) => {
      createUser(values.email, values.password)
        .then((res) => {
          if (res) {
            updateProfileUser({
              displayName: values.displayName,
              photoURL: imageURL || "",
            })
              .then(() => {})
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
      resetForm();
      if (imageRef.current.value || imageURL) {
        imageRef.current.value=''
        setImageURL('')
      }
    },
  });

  const handleImage = async (e) => {
    setProgress(33)
    const file = e.target.files[0];
    if (!file) {
      alert("No file detected");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_unsigned_preset");
    formData.append("cloud_name", "dzwfjw6ri");
    setProgress(80)
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dzwfjw6ri/image/upload",
        formData
      );
      const result = res.data.url;
      setImageURL(result);
      setProgress(100)
    } catch (error) {
      console.error(error);
    }
    setProgress(0)
  };

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.2); 
    }
  }, []);

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="p-8 rounded-lg" data-aos="slide-right">
        <form onSubmit={formik.handleSubmit}>
          <h4 className="mb-4">Create An Account</h4>

          <Divider></Divider>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Name</Label>
            <Input
              type="text"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              name="displayName"
              placeholder="Your name"
            />
            {formik.touched.displayName && formik.errors.displayName &&    <div className="text-red-500 text-sm">{formik.errors.name}</div>}
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Photo</Label>
            {imageURL&&<Avatar className="size-12 rounded-lg">
          <AvatarImage src={imageURL} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>}
            {progress===0?'':<><span>Uploading...</span><Progress value={progress} className="w-[60%]" /></> }
            <Input
              onChange={handleImage}
              ref={imageRef}
              type="file"
              name="photoURL"
              placeholder="Your name"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Email</Label>
            <Input
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              name="email"
              placeholder="your-mail@example.com"
            />
          </div>
          <div className="grid w-full mt-4 max-w-sm items-center gap-3">
            <Label>Password</Label>
            <Input
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              name="password"
              placeholder="Your password"
            />
          </div>
          <div className="grid w-full mt-4 max_w-sm items-center gap-3">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </Card>
      <div data-aos="slide-left">
        <Lottie
          lottieRef={lottieRef}
          animationData={lot}
          loop={true}
          speed={0.1}
          style={{ width: 400, height: 400 }}
        />
      </div>
    </section>
  );
}

export default Register;
