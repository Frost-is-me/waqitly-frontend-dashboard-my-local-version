import useReservation from "@/stores/Reservations";
import { useTotalBooking } from "./useBookingsStatus";

const useAveragePrice = () => {
    const TotalBookings = useTotalBooking()
    const {TotalPrice,} = useReservation()
    const averageprice = (totalBooking: number, totalPrice: number) : number => {
        if(totalBooking < 0 || !Number.isFinite(TotalPrice)){
            return 0
        }
        return totalBooking / totalPrice
    }
    const getAveragePrice = averageprice(TotalBookings,TotalPrice)

    return getAveragePrice
}

export default useAveragePrice;