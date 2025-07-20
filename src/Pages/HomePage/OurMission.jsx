import Divider from "@/Shared/Divider";
import Section from "@/Shared/Section";
import React, { useEffect } from "react";
import Masonry from "./Masonary/Masonry";

const items = [
  { id: "11", img: "/misson/11.jpeg", height: 410 },
  { id: "13", img: "/misson/13.jpeg", height: 390 },
  { id: "14", img: "/misson/14.jpeg", height: 520 },
  { id: "16", img: "/misson/16.jpeg", height: 310 },
  { id: "20", img: "/misson/20.jpg", height: 350 },
].sort(() => Math.random() - 0.5);

function OurMission() {

  useEffect(()=>{
    const random=Math.floor(Math.random()*items.length)
    items[random].height=600
  },[])

  return (
    <Section>
      <h2 data-aos="slide-right">Our Mission</h2>
      <Divider />
      <div className="flex flex-col gap-10 lg:gap-20 items-center mt-10">
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
            data-aos="fade-up"
          />
        <div data-aos="fade-up">
          <p className="text-lg md:text-xl leading-relaxed">
            At{" "}
            <span className="text-primary text-2xl md:text-3xl">Pawdopt</span>,
            we believe every animal deserves a second chance — and every person
            deserves the joy of a loyal companion.
            <br />
            <br />
            We built this platform with one clear goal:{" "}
            <strong>
              to make pet adoption easier, kinder, and more connected.
            </strong>{" "}
            Too many animals spend their lives in shelters simply because the
            right person didn’t know they existed. Pawdopt changes that.
            <br />
            <br />
            Through our simple and user-friendly interface, you can:
          </p>

          <ul className="text-left mt-6 text-base md:text-lg text-foreground list-disc list-inside">
            <li>Browse adoptable pets by type, location, and availability</li>
            <li>Read detailed stories of pets looking for forever homes</li>
            <li>Send adoption requests with just a few clicks</li>
            <li>Support animal welfare through donation campaigns</li>
          </ul>

          <p className="mt-8 text-lg md:text-xl leading-relaxed">
            Whether you’re ready to adopt, want to support others who do, or are
            just here to learn more — you’re part of something that truly
            matters.
          </p>

          <p className="mt-6 text-xl font-medium text-muted-foreground">
            Because Pawdopt isn't just a website.
            <br /> It's a bridge between forgotten animals and the families
            they've been waiting for.
          </p>

          <blockquote className="mt-10 text-lg italic text-accent-foreground">
            “Saving one animal won’t change the world, but it will change the
            world for that one animal.”
          </blockquote>
        </div>
      </div>
    </Section>
  );
}

export default OurMission;
