import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/Common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import UseCountries from "../../Hooks/UseCountries";
import Map from '../Map/Map.jsx'
function AddLocation({ propertyDetails, setPropertyDetails, nextStep }) {
    const{getAll}=UseCountries()
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });
  const handleSubmit=()=>{
    const {hasErrors}=form.validate()
    if(!hasErrors){
        setPropertyDetails((prev)=>({...prev,city,address,country}))
        nextStep()
    }
  }
  const { country, city, address } = form.values;
  return (
    <form 
    onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit()
    }}
    >
      <div className="flexCenter" style={{
        gap:"3rem",
        marginTop:"3rem",
        justifyContent:"space-between",
        flexDirection:"row"

      }}>
      {/* left */}
        {/* innputs */}
        <div className="flexColStart flex-1 gap-[1rem] ">
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            required
            {...form.getInputProps("country", { type: "input" })}
          />
          <TextInput
          w={"100%"}
          withAsterisk
          label="City"
          required
          {...form.getInputProps("city", { type: "input" })}
          />
          <TextInput
          w={"100%"}
          withAsterisk
          required
          label="Address"
          {...form.getInputProps("address", { type: "input" })}
          />
        </div>
        <div></div>
      

      {/* right */}
      <div className="flex-1 ">
        <Map
        address={address}
        city={city}
        country={country}
        />
      </div>
      </div>
      <Group position="center" mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
}

export default AddLocation;
