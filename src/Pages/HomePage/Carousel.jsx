import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import BlurText from "@/Pages/HomePage/BlurText/BlurText";

const images = [
  {
    img: img1,
    tit: "“Will you be my forever friend?”",
    des: "Every wag, every lick, every bark — it’s how we say ‘I love you.’ Please find us.",
  },
  {
    img: img2,
    tit: "“I promise to curl up beside you.”",
    des: "Soft paws, slow blinks, quiet purrs. All we ask is a cozy spot in your heart and your home.",
  },
  {
    img: img3,
    tit: "“We’re waiting... tails wagging, hearts hoping.”",
    des: "Whether furry, fluffy, or floppy-eared — we’re ready to love. All we need is a chance.",
  },
];

function Carousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const textAnimation = (title, description = "") => {
    return (
      <div className="absolute top-4 xs:top-10 sm:top-[30%] flex justify-center items-center flex-col w-full z-10" data-aos="fade-up">
        <div className="max-w-4xl bg-accent/40 text-center p-4 rounded-lg">
        <BlurText
          className="text-sm sm:text-4xl text-primary font-play lg:text-7xl font-bold"
          text={title}
        />
        <BlurText
          className="text-[10px] text-secondary-foreground mt-2 sm:text-2xl lg:text-4xl font-bold"
          text={description}
          
        />

        </div>
      </div>
    );
  };
  return (
    <Splide
      onMoved={(splide) => setSelectedIndex(splide.index)}
      options={{
        type: "fade",
        rewind: true,
        autoplay: true,
        interval: 8000,
        speed: 1200,
        pauseOnHover: true,
        breakpoints: {
          300:{
            arrows:true
          },
          640: {
            arrows: false,
          },
        },
        pagination: true,
        perPage: 1,
        drag: true,
      }}
      aria-label="Pawdopt Pet Carousel"
    >
      {images.map((item, index) => (
        <SplideSlide key={index} className="relative">
          <img
            src={item.img}
            alt="Cute Puppy"
            className="w-full mt-2 rounded-xl shadow-xl"
          />
          {selectedIndex === index && textAnimation(item.tit, item.des)}
        </SplideSlide>
      ))}
    </Splide>
  );
}

export default Carousel;
