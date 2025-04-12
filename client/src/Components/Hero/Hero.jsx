import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import './Hero.css'
import {motion, spring}  from 'framer-motion'
import SearchBar from "../SearchBar/SearchBar";

function Hero() {
  return (
    <div className="text-white relative  ">
      <div className=" gap-5 p-[2rem] flex flex-col md:flex-row justify-between items-center mt-[2.5rem] ">
        {/* left */}
        <div className="flex flex-col justify-center items-start gap-12 ">
          <div className="relative z-1 tittle">
            <div className="rounded-full w-12 h-12 bg-orange-400 absolute right-[28%]  top-[-6%] z-[-1]"></div>
            <motion.h1
            initial={{y:"2rem",opacity:1}}
            animate={{y:0,opacity:1}}
            transition={{
              duration:2,
              type:"spring"
            }}
            className="font-medium text-5xl leading-12 ">
              Discover <br /> Most Suitable <br /> Property
            </motion.h1>
          </div>
          <div className="flex text-[rgba(255,255,255,0.5)] text-sm  flex-col justify-center items-start gap-2 ">
            <span className="secondaryText">Find a variety of properties that suit you very easilty</span>
            <span className="secondaryText">Forget all difficulties in finding a residence for you</span>
          </div>
         <SearchBar isHero={true} />
          <div className="stats flex justify-between items-center sm:w-auto  gap-[1.5rem] sm:gap-7 ">
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="flex items-center justify-between gap-2">
              <CountUp className="font-medium text-3xl" start={8800} end={9000} duration={4} />
              <span className="text-yellow-500 text-3xl">+</span>
            </span>
            <span className="text-[rgba(255,255,255,0.5)] text-sm font-medium">
              Premium Producs
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="flex items-center justify-between gap-2">
              <CountUp className="font-medium text-3xl" start={1950} end={2000} duration={4} />
              <span className="text-yellow-500 text-3xl">+</span>
            </span>
            <span className="text-[rgba(255,255,255,0.5)] text-sm font-medium">
            Happy Customer
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="flex items-center justify-between gap-2">
              <CountUp className="font-medium text-3xl"  end={28}  />
              <span className="text-yellow-500 text-3xl">+</span>
            </span>
            <span className="text-[rgba(255,255,255,0.5)] text-sm font-medium">
            Awards Winning
            </span>
          </div>
          </div>
        </div>

        {/* right */}
        <div className="h-right">
          <motion.div
          initial={{x:"7rem",opacity:0}}
          animate={{x:0,opacity:1}}
          transition={{
            duration:2,
            type:"spring"
          }}
           className="border-[8px] border-[rgba(255,255,255,0.12)] w-[95%]  h-[30rem] image-container overflow-hidden rounded-t-[15rem] ">
            <img className="w-full h-full " src="./hero-image.png" alt="" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
