import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";
function UploadImage({
  propertyDetails,
  setPropertyDetails,
  prevStep,
  nextStep,
}) {
  const [ImageUrl, setImageUrl] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handlenext=()=>{
    setPropertyDetails((prev)=>({...prev,image:ImageUrl}))
    nextStep();
  }
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dpqmatgx1",
        uploadPreset: "i3lqd3k6",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, []);
  return (
    <div className="flexColCenter mt-[3rem] gap-6">
      {!ImageUrl ? (
        <div
          onClick={() => widgetRef.current?.open()}
          className="flexColCenter w-[80%] h-75  border-2 border-dashed border-gray-400 "
        >
          <AiOutlineCloudUpload size={50} color="gray" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          onClick={() => widgetRef.current?.open()}
          className="w-[80%] h-[25rem] rounded-[10px] cursor-pointer overflow-hidden "
        >
          <img className="w-full h-full  cover" src={ImageUrl} alt="Uploaded" />
        </div>
      )}
      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={handlenext} disabled={!ImageUrl}>Next Step</Button>
      </Group>
    </div>
  );
}

export default UploadImage;
