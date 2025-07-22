import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Divider from "@/Shared/Divider";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import happyDog from "../../assets/lotties/Happy Dog.json";
import {
  createUserWithGithub,
  createUserWithGoogle,
  signInUser,
} from "../../../firebase/firebasePanel";
import { api } from "@/lib/api";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/Auth";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAuth();
  const [firebaseError, setFirebaseError] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "Invalid email";
      if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(values.password))
        errors.password =
          "Invalid password. must use one lowercase one uppercase and one number and at least 6 character";
      return errors;
    },
    onSubmit: (values) => {
      setFirebaseError("");
      signInUser(values.email, values.password)
        .then(() => {
          toast.success("Logged in successfully!");
          navigate(location.state || "/");
        })
        .catch((err) => {
          toast.error(err?.message || "Unexpected Error");
          setFirebaseError(err?.message || "Unexpected Error");
        });
    },
  });

  if (currentUser.data) {
    return <Navigate to={location.state || "/"} />;
  }
  const handleGoogleLogin = async () => {
    try {
      const data = await createUserWithGoogle();
      const user = data.user;
      toast.success("Google login successful!");
      await api.post("/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleGithubLogin = async () => {
    try {
      const data = await createUserWithGithub();
      const user = data.user;
      toast.success("Github login successful!");
      await api.post("/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (currentUser.data) {
    navigate(location.state || "/");
  }

  return (
    <section className="flex flex-col-reverse md:flex-row justify-center items-center h-screen">
      <Card className="p-8 rounded-lg w-full max-w-md" data-aos="slide-right">
        <form onSubmit={formik.handleSubmit}>
          <h4 className="mb-4">Login With</h4>

          <div className="flex justify-around sm:flex-row">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="ghost"
              className="border"
            >
              <FaGoogle />
              Google
            </Button>
            <Button variant="ghost" type="button" onClick={handleGithubLogin} className="border">
              <FaGithub />
              Github
            </Button>
          </div>
          <Divider>OR</Divider>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Email</Label>
            <Input
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              type="email"
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
              onChange={formik.handleChange}
              name="password"
              onBlur={formik.handleBlur}
              type="password"
              placeholder="Your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="grid w-full mt-4 max-w-sm items-center gap-3">
            <Button type="submit">Login</Button>
            {firebaseError && (
              <div className="text-red-500 text-sm">{firebaseError}</div>
            )}
          </div>
        </form>
      </Card>
      <div data-aos="slide-left" className="w-full flex justify-center md:w-1/2">
        <Lottie animationData={happyDog} loop={true} className="w-full h-auto max-w-xs sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg" />
      </div>
    </section>
  );
}

export default LoginPage;
