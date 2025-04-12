import React from "react";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";

function Contact() {
  return (
    <section className="mx-auto">
      <div className="paddings innerWidth flex flex-col md:flex-row gap-10 md:gap-40 justify-between items-center w-full">
        {/* Left */}
        <div className="flexColStart flex-1 gap-4 contact-modes items-center md:text-left">
          <span className="orangeText">Our Contacts</span>
          <span className="primaryText">Easy to Contact us</span>
          <span className="secondaryText">
            We are always ready to help by providing the best services for you.
            We believe a good place to live can make your life better.
          </span>
          <div className="flex flex-col mt-6 gap-10 w-full">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Call Mode */}
              <div className="flexColCenter mode gap-10 hover:scale-105 hover:shadow-md cursor-pointer w-full md:w-[16rem] p-4 rounded-xl border border-gray-300 transition duration-300">
                <div className="flex items-center gap-4">
                  <div className="flexCenter rounded-md p-2 bg-blue-50">
                    <MdCall size={25} />
                  </div>
                  <div className="flexColStart">
                    <span className="text-[#1f3e72] font-medium text-lg">
                      Call
                    </span>
                    <span className="secondaryText">021 123 145 154</span>
                  </div>
                </div>
                <div className="flexCenter button hover:bg-blue-500 w-full bg-blue-100 text-blue-700 text-sm font-medium p-2 rounded-md">
                  Call now
                </div>
              </div>

              {/* Chat Mode */}
              <div className="flexColCenter gap-10 hover:scale-105 hover:shadow-md cursor-pointer w-full md:w-[16rem] p-4 rounded-xl border border-gray-300 transition duration-300">
                <div className="flex items-center gap-4">
                  <div className="flexCenter rounded-md p-2 bg-blue-50">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart">
                    <span className="text-[#1f3e72] font-medium text-lg">
                      Chat
                    </span>
                    <span className="secondaryText">021 123 145 154</span>
                  </div>
                </div>
                <div className="flexCenter button hover:bg-blue-500 w-full bg-blue-100 text-blue-700 text-sm font-medium p-2 rounded-md">
                  Chat now
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
              {/* Video Call Mode */}
              <div className="flexColCenter gap-10 hover:scale-105 hover:shadow-md cursor-pointer w-full md:w-[16rem] p-4 rounded-xl border border-gray-300 transition duration-300">
                <div className="flex items-center gap-4">
                  <div className="flexCenter rounded-md p-2 bg-blue-50">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart">
                    <span className="text-[#1f3e72] font-medium text-lg">
                      Video Call
                    </span>
                    <span className="secondaryText">021 123 145 154</span>
                  </div>
                </div>
                <div className="flexCenter button hover:bg-blue-500 w-full bg-blue-100 text-blue-700 text-sm font-medium p-2 rounded-md">
                  Video Call now
                </div>
              </div>

              {/* Message Mode */}
              <div className="flexColCenter gap-10 hover:scale-105 hover:shadow-md cursor-pointer w-full md:w-[16rem] p-4 rounded-xl border border-gray-300 transition duration-300">
                <div className="flex items-center gap-4">
                  <div className="flexCenter rounded-md p-2 bg-blue-50">
                    <HiChatBubbleBottomCenter size={25} />
                  </div>
                  <div className="flexColStart">
                    <span className="text-[#1f3e72] font-medium text-lg">
                      Message
                    </span>
                    <span className="secondaryText">021 123 145 154</span>
                  </div>
                </div>
                <div className="flexCenter button hover:bg-blue-500 w-full bg-blue-100 text-blue-700 text-sm font-medium p-2 rounded-md">
                  Message now
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 w-full flex justify-center items-center mt-6 md:mt-0">
          <div className="border-[8px] border-[rgba(255,255,255,0.12)] w-[20rem] md:w-[30rem] h-[25rem] md:h-[40rem] overflow-hidden rounded-t-[10rem] md:rounded-t-[15rem] flex">
            <img
              className="w-full h-full object-cover"
              src="/contact.jpg"
              alt="Contact"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
