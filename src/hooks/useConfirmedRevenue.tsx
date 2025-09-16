import useReservation from "../stores/Reservations";
import useStatus from "../stores/Reservation_status";

const useRevenue = () => {
    const TotalPrice = useReservation((state) => state.TotalPrice);
    const status = useStatus((state) => state.status)
    if(status === "done"){
        return TotalPrice
    }
    else{
        return ""
    }
}

export default useRevenue;

// This Hook main Objective is returing the Confirmed Revenue to the Dashboard it works only if the status is done