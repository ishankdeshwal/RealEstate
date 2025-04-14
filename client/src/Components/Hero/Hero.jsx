import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import './Hero.css'
import {motion, spring}  from 'framer-motion'
import SearchBar from "../SearchBar/SearchBar";

function Hero() {
  return (
    <div className="text-white relative overflow-hidden">
      <div className="gap-5 p-[1rem] sm:p-[2rem] flex flex-col md:flex-row justify-between items-center mt-[2rem] sm:mt-[2.5rem]">
        {/* left */}
        <div className="flex flex-col justify-center items-start gap-8 sm:gap-12 w-full md:w-auto">
          <div className="relative z-1 tittle">
            <div className="rounded-full w-8 h-8 sm:w-12 sm:h-12 bg-orange-400 absolute right-[28%] top-[-6%] z-[-1]"></div>
            <motion.h1
            initial={{y:"2rem",opacity:1}}
            animate={{y:0,opacity:1}}
            transition={{
              duration:2,
              type:"spring"
            }}
            className="font-medium text-3xl sm:text-4xl md:text-5xl leading-tight sm:leading-12">
              Discover <br /> Most Suitable <br /> Property
            </motion.h1>
          </div>
          <div className="flex text-[rgba(255,255,255,0.5)] text-xs sm:text-sm flex-col justify-center items-start gap-1 sm:gap-2">
            <span className="secondaryText">Find a variety of properties that suit you very easilty</span>
            <span className="secondaryText">Forget all difficulties in finding a residence for you</span>
          </div>
         <SearchBar isHero={true} />
          <div className="stats flex justify-between items-center w-full sm:w-auto gap-[1rem] sm:gap-[1.5rem] md:gap-7">
          <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
            <span className="flex items-center justify-between gap-1 sm:gap-2">
              <CountUp className="font-medium text-xl sm:text-2xl md:text-3xl" start={8800} end={9000} duration={4} />
              <span className="text-yellow-500 text-xl sm:text-2xl md:text-3xl">+</span>
            </span>
            <span className="text-[rgba(255,255,255,0.5)] text-xs sm:text-sm font-medium">
              Premium Producs
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
            <span className="flex items-center justify-between gap-1 sm:gap-2">
              <CountUp className="font-medium text-xl sm:text-2xl md:text-3xl" start={1950} end={2000} duration={4} />
              <span className="text-yellow-500 text-xl sm:text-2xl md:text-3xl">+</span>
            </span>
            <span className="text-[rgba(255,255,255,0.5)] text-xs sm:text-sm font-medium">
            Happy Customer
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
            <span className="flex items-center justify-between gap-1 sm:gap-2">
              <CountUp className="font-medium text-xl sm:text-2xl md:text-3xl" end={28} />
              <span className="text-yellow-500 text-xl sm:text-2xl md:text-3xl">+</span>
            </span>
            <span className="text-[rgba(255,255,255,0.5)] text-xs sm:text-sm font-medium">
            Awards Winning
            </span>
          </div>
          </div>
        </div>

        {/* right */}
        <div className="h-right w-full md:w-auto mt-6 md:mt-0">
          <motion.div
          initial={{x:"7rem",opacity:0}}
          animate={{x:0,opacity:1}}
          transition={{
            duration:2,
            type:"spring"
          }}
           className="border-[4px] sm:border-[8px] border-[rgba(255,255,255,0.12)] w-full sm:w-[95%] h-[20rem] sm:h-[25rem] md:h-[30rem] image-container overflow-hidden rounded-t-[10rem] sm:rounded-t-[15rem] mx-auto">
            <img className="w-full h-full object-cover" src="./hero-image.png" alt="" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
