import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../../utils/Common";
import PropertiesCard from "../PropertiesCard/PropertiesCard";
import UseProperties from "../../Hooks/UseProperties";
import {PuffLoader} from 'react-spinners'

function Residencies() {
  const {data,isError,isLoading}=UseProperties();
  if(isError){
    return(
      <div className='wrapper'>
        <span>Error While Fetching the Data</span>
      </div>
    )
  }
  if(isLoading){
    return(
     <div className='wrapper flexCenter loader-container' style={{height:"60vh"}}>
       <PuffLoader color="#406ff" size={80} />
     </div>
    )
  }
  return (
    <div className="relative mt-10 ">
      <div className="relative paddings innerWidth">
        <div className="flex flex-col items-center md:items-start mb-10">
          <span className="orangeText ">Best choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>

        <Swiper className="" {...sliderSettings}>
        <SliderButtons  />
          {data.slice(0,8).map((card, i) => (
            <SwiperSlide className="mt-10  " key={i}>
             <PropertiesCard card={card} />
            </SwiperSlide>
          ))}
            
        </Swiper>
      </div>
    
    </div>
  );
}

export default Residencies;

const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className=" mt-4 r-buttons items-center justify-center  absolute top-0 right-0 transform -translate-y-1/2 flex gap-4 z-20">
      <button
        className=" bg-red-100 w-8 h-8 "
        onClick={() => swiper.slidePrev()}
      >
        &lt;
      </button>
      <button
        className=""
        onClick={() => swiper.slideNext()}
      >
        &gt;
      </button>
    </div>
  );
};