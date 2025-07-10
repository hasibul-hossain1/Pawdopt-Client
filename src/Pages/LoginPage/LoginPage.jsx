import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Divider from "@/Shared/Divider";
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import lot from '../../assets/2.json'

function LoginPage() {
  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="p-8 rounded-lg" data-aos="slide-right">
        <form>
          <h4 className="mb-4">Login With</h4>

          <div className="flex justify-around flex-col sm:flex-row">
            <Button variant="ghost" className="border">
                <FaGoogle/>
              Google
            </Button>
            <Button variant="ghost" className="border">
                <FaGithub/>
              Github
            </Button>
          </div>
          <Divider>OR</Divider>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Email</Label>
            <Input type="email" placeholder="your-mail@example.com" />
          </div>
          <div className="grid w-full mt-4 max-w-sm items-center gap-3">
            <Label>Password</Label>
            <Input type="password" placeholder="Your password" />
          </div>
          <div className="grid w-full mt-4 max-w-sm items-center gap-3">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Card>
      <div data-aos="slide-left"><Lottie animationData={lot} loop={true} style={{width: 400, height: 400}}/></div>
    </section>
  );
}

export default LoginPage;
