import React from 'react'

function Footer() {
  return (
    <div className=' pt-15'>
        <div className="paddings innerWidth flexCenter f-container border-t-[0.5px] border-[0,0,0,0.148] ">
            {/* left */}
            <div className='flexColStart gap-3'>
                <img src="./logo2.png" width={120} alt="" />
                <span className='secondaryText'>Our vision is to make all people <br />
                the best place to live for them</span>
            </div>
            {/* Right */}
            <div className='flex flex-col'>
                <span className='primaryText'>Information</span>
                <span className='secondaryText'>145 newYork,Fl 2571, USA</span>
                <div className='flex mt-[1.5rem] font-[500] gap-3'>
                    <span>Property</span>
                    <span>Services</span>
                    <span>Product</span>
                    <span>About Us</span>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Footer