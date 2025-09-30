import useStatus from "../stores/Reservation_status";

const useTotalBooking = (): number => {
    const { reserved_count } = useStatus();
    return reserved_count;
};


const useTotalPending = (): number => {
    const { pending_count } = useStatus();
    return pending_count;
};

export {
useTotalBooking,
useTotalPending
}

//This Hook main Objective is returning the total bookings to the Dashboard it only works if the status is reserved