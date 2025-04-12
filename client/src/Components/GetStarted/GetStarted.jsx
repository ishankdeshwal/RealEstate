import React from 'react'

function GetStarted() {
  return (
    <div className='pt-10'>
        <div className='paddings innerWidth  '>
                <div className=' g-inner flex flex-col justify-center items-center bg-[#4161df] gap-[1.5rem] p-6 rounded-xl border-[6px] border-[#5d77d6] text-center '>
                    <span className='text-[1.5rem] font-bold text-white'>Get Started With Homyz</span>
                    <span className='text-[0.8rem] text-[rgb(255,255,255,0.587)]'>
                    Subscribe and find super attractive price quotes from us.
                    <br />
                    Find your residence soon
                    </span>
                    <button className='button  text-xs w-30 h-20'>
                      <a href="mailo:deshwalishank@gmail.com">
                      Get Started
                      </a>
                    </button>
                </div>
        </div>
    </div>
  )
}

export default GetStarted