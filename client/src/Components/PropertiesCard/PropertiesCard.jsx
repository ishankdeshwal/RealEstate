import React from "react";
import {AiFillHeart}  from 'react-icons/ai'
import {truncate} from 'lodash'
import {useNavigate} from 'react-router-dom'
import Heart from "../Heart/Heart";

function PropertiesCard({ card }) {
  const navigate=useNavigate();
  return (
    <div className="relative w-full sm:w-[15rem] md:w-[18rem] lg:w-[20rem]">
      <div
        onClick={()=>{
          navigate(`/properties/${card.id}`)
        }}
        className="SwiperSlide w-full flex hover:scale-[1.025] cursor-pointer
        hover:shadow-[0px_72px_49px_-51px_rgba(136,160,255,0.21)] flex-col gap-[10px]
        p-3 rounded-[10px] m-auto transition-all duration-300 ease-in"
      >
        <div className="relative w-full aspect-[4/3]"> 
          <div className="absolute top-[10px] text-white right-[10px] sm:right-[20px] z-10"> 
            <Heart id={card?.id} />
          </div>
          <img 
            className="w-full h-full object-cover rounded-[10px]" 
            src={card.image} 
            alt={card.title} 
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="secondaryText text-[1rem] sm:text-[1.2rem] font-medium">
            <span className="orange">$</span>
            <span>{card.price}</span>
          </span>
          <span className="primaryText text-[1rem] sm:text-[1.1rem]">
            {truncate(card.title,{length:15})}
          </span>
          <span className="secondaryText text-[0.9rem] sm:text-[1rem]">
            {truncate(card.description,{length:80})}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertiesCard;
