import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

const Hero = () => {
  return (
    <div className="relative w-full h-screen  text-white">
      {/* Carousel Section */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        <SwiperSlide>
          <div className="flex justify-center items-center h-full">
            <h2 className="text-4xl font-bold">Welcome to Our Fashion Store</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center h-full">
            <h2 className="text-4xl font-bold">Exclusive Offers Await You!</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center items-center h-full">
            <h2 className="text-4xl font-bold">Shop Now & Get Amazing Deals</h2>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Call to Action Section */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-6 py-3 rounded-lg shadow-md transition">
          Start Shopping Now 🚀
        </button>
      </div>
    </div>
  );
};

export default Hero;
