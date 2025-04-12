import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import userDetailsContext from "../../Context/UserDetailsContext";
import UseProperties from "../../Hooks/UseProperties";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/Api";
import { useAuth0 } from "@auth0/auth0-react";
function Facilities({
  propertyDetails,
  setPropertyDetails,
  prevStep,
  nextStep,
  setOpened,
  setActiveStep,
}) {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities?.bedrooms||0,
      parkings: propertyDetails.facilities?.parkings||0,
      bathrooms: propertyDetails.facilities?.bathrooms||0,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have one Bedroom" : null),

      bathrooms: (value) => (value < 1 ? "Must have one Bathroom" : null),
    },
  });
  const { bedrooms, parkings, bathrooms } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      mutate();
    }
  };
  // upload to server
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(userDetailsContext);

  const { refetch: refetchProperties } = UseProperties();
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: { bedrooms, parkings, bathrooms },
          userEmail: user?.email,
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSuccess: () => {
      toast.success("Property Added Successfully", {
        position: "bottom-right",
      }),
        setPropertyDetails({
          title: "",
          description: "",
          price: 0,
          country: "",
          city: "",
          address: "",
          image: null,
          facilities: {
            bedrooms: 0,
            parkings: 0,
            bathrooms: 0,
          },
          userEmail: user?.email,
        });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });
  return (
    <div className="flexColCenter ">
      <Box className="" maw="50%" mah="auto" my="xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <NumberInput
            withAsterisk
            label="No of Bedrooms"
            min={0}
            {...form.getInputProps("bedrooms")}
          />
          <NumberInput
            withAsterisk
            label="No of Parkings"
            min={0}
            {...form.getInputProps("parkings")}
          />
          <NumberInput
            withAsterisk
            label="No of Bathrooms"
            min={0}
            {...form.getInputProps("bathrooms")}
          />
          <Group position="center" mt={"xl"}>
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button type="submit" color="green" disabled={isLoading}>
              {isLoading ? "Submitting..." : " Add Property"}
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default Facilities;
