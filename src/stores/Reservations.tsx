import {create} from "zustand"
import axios from "axios"

interface Reservations_store {
    TotalPrice : number
    Date : number | string
    StartTime : any
    EndTime : any
    fetchReservation : (id : number | string) => Promise<void>
}

const useReservation = create<Reservations_store>((set) => ({
    TotalPrice: 0,
    Date: 0,
    StartTime: null,
    EndTime: null,

    fetchReservation: async (id) => {
        try {
        const response = await axios.get(`/Reservations/${id}`)
        const newResponse = response.data.Reservation["Reservations1"]
        set(() => ({
            TotalPrice: newResponse.TotalPrice,
            Date: newResponse.Date,
            StartTime: newResponse.StartTime,
            EndTime: newResponse.EndTime,
        }))
        console.log(response.data.Reservation["Reservations1"])
      } catch(error) {
        set({TotalPrice : 0,Date : 0,StartTime : null,EndTime : null,})
        console.log("error fetching Reservations ", error)
      }
    }
}))

export default useReservation;

// This is the Reservations store you can get the data from the Reservations tabel from here with all the data needed for your Hooks the status is not here it may get merged
// with the status store if we dont need a status store