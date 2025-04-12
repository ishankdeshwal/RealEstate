import React, { useContext, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useMutation } from "@tanstack/react-query";
import UserDetailContext from "../../Context/UserDetailsContext"
import { bookVisit } from "../../utils/Api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

function BookingModel({ opened, setOpened, email, propertyId }) {
    const {
        userDetails: { token, bookings = [] },
        setUserDetails,
    } = useContext(UserDetailContext);
    
    const [value, setValue] = useState(null);
    
    const isAlreadyBooked = bookings.some(booking => booking.id === propertyId);
    
    const handleBookingSuccess = () => {
        toast.success("Booking Successful", { position: "bottom-right" });
        
        const newBooking = {
            id: propertyId,
            date: dayjs(value).format("DD/MM/YYYY"),
        };
        
        setUserDetails((prev) => ({
            ...prev,
            bookings: [
                ...(prev.bookings || []),
                newBooking,
            ],
        }));
        
        setOpened(false);
    };
 
    const { mutate, isLoading } = useMutation({
        mutationFn: () => bookVisit(value, propertyId, email, token),
        onSuccess: () => handleBookingSuccess(),
        onError: (error) => {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message, { position: "bottom-right" });
            } else {
                toast.error("Failed to book visit. Please try again.", { position: "bottom-right" });
            }
        },
    });
    
    if (isAlreadyBooked) {
        return null;
    }
    
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Book your visit Date"
            centered
        >
            <div className="flexColCenter">
                <DatePicker 
                    value={value} 
                    onChange={setValue} 
                    minDate={new Date()} 
                    placeholder="Pick a date"
                />
                <Button 
                    disabled={!value || isLoading} 
                    onClick={() => mutate()}
                    className="mt-4"
                >
                    {isLoading ? "Booking..." : "Book Visit Now"}
                </Button>
            </div>
        </Modal>
    );
}

export default BookingModel;
