import useStatus from "../stores/Reservation_status";

const TotalBooking = (): number => {
    const { reserved_count } = useStatus();
    return reserved_count;
};

export default TotalBooking;