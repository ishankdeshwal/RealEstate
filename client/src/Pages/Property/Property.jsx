import React, { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removebooking } from "../../utils/Api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthCheck from "../../hooks/useAuthCheck";
import "./Property.css";
import Map from "../../Components/Map/Map";
import BookingModel from "../../Components/BookingModel/BookingModel";
import UserDetailContext from "../../Context/UserDetailsContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../Components/Heart/Heart";

function Property() {
  const {
    userDetails: { token, bookings = [] },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { user } = useAuth0();
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);

  useEffect(() => {
    if (Array.isArray(bookings)) {
      const booking = bookings.find(booking => booking.id === id);
      if (booking) {
        setIsBooked(true);
        setBookingDate(booking.date);
      } else {
        setIsBooked(false);
        setBookingDate(null);
      }
    }
  }, [bookings, id]);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["resd", id],
    queryFn: async () => {
      return getProperty(id);
    },
  });

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removebooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id)
      }));
      setIsBooked(false);
      setBookingDate(null);
      toast.success("Booking Cancelled", { position: "bottom-right" });
    }
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter min-h-[60vh]">
          <PuffLoader color="#406ff" size={80} />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter min-h-[60vh]">
          <span className="text-red-500">Error While Fetching the Property</span>
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColStart property-container paddings">
        <div className="like right-8 sm:right-8 md:right-10 top-8 sm:top-8 md:top-10">
         <Heart id={id} />
        </div>
        <img
          className="cove w-full h-[20rem] sm:h-[25rem] md:h-[30rem] object-cover rounded-lg"
          src={data?.image}
          alt={data?.title || "Property image"}
        />
        <div className="flexCenter flex-col lg:flex-row property-details gap-8 mt-8">
          <div className="flexColStart left w-full lg:w-1/2">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-4">
              <span className="primaryText text-xl sm:text-2xl">{data?.title}</span>
              <span className="orangeText text-xl sm:text-2xl">
                $ {data?.price}
              </span>
            </div>
            <div className="flexStart facilities flex-wrap gap-4 mb-4">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span> {data.facilities?.bathrooms} Bathrooms </span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span> {data.facilities?.parkings} Parking </span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span> {data.facilities?.bedrooms}Rooms </span>
              </div>
            </div>
            <span className="secondaryText mb-4" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>
            <div className="flexStart mb-6" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}{"  "}
                {data?.city}{"  "}
                {data?.country}{"  "}
              </span>
            </div>
            {isBooked ? (
              <>
                <Button onClick={() => cancelBooking()} disabled={cancelling} variant="outline" w={"100%"} color="red" className="mb-4">
                  Cancel Booking
                </Button>
                <span className="mb-6">
                  Your Visit already booked for {bookingDate}
                </span>
              </>
            ) : (
              <button
                className="button mb-6"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your Visit
              </button>
            )}

            {!isBooked && (
              <BookingModel
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                setOpened={setModalOpened}
                propertyId={id}
                email={user?.email}
              />
            )}
          </div>

          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Property;
