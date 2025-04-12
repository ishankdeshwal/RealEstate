import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "../../utils/accordion";
import './Value.css'
function Value() {
  return (
    <section className="pt-10">
      <div className="paddings innerWidth flex justify-between gap-20 flex-col md:flex-row">
        {/* Left */}
        <div className="border-[8px] flex-1 border-[rgba(232,232,232,0.93)] overflow-hidden rounded-t-[15rem]">
          <img className="w-full h-full cover" src="./value.png" alt="" />
        </div>

        {/* Right */}
        <div className="flexColStart flex-1 gap-2">
          <span className="orangeText">Our Value</span>
          <span className="primaryText">Value We Give To You</span>
          <span className="secondaryText">
            We are always ready to help by providing the best services for you.
            <br />
            We believe a good place to live can make your life better.
          </span>

          <Accordion className="mt-6 border-no" allowMultipleExpanded={false} preExpanded={[0]}>
            {data.map((item, i) => (
              <AccordionItem key={i} uuid={i}>
                <AccordionItemState>
                  {({ expanded }) => (
                    <div
                      className={`accordionItem mb-5 border-1 overflow-hidden rounded-xl border-[rgba(189,219,236,0.93)] bg-white ${
                        expanded ? "shadow-xl" : ""
                      }`}
                    >
                      <AccordionItemHeading>
                        <AccordionItemButton className="accordionButton flex justify-between bg-white p-3 w-full cursor-pointer">
                          <div className="flexCenter bg-[#eeeeff] rounded-md p-2">
                            {item.icon}
                          </div>
                          <span className="primaryText">{item.heading}</span>
                          <div>
                            <MdOutlineArrowDropDown
                              className={`bg-[#eeeeff] p-2 w-full h-full rounded-md transition-transform duration-300 ${
                                expanded ? "rotate-180" : ""
                              }`}
                              size={20}
                            />
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>{item.detail}</AccordionItemPanel>
                    </div>
                  )}
                </AccordionItemState>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default Value;
