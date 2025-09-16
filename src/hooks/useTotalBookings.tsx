import useStatus from "../stores/Reservation_status";

const useTotalBooking = (): number => {
    const { reserved_count } = useStatus();
    return reserved_count;
};

export default useTotalBooking;

//This Hook main Objective is returning the total bookings to the Dashboard it only works if the status is reserved