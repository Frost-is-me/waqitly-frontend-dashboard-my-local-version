import {create} from 'zustand';
import axios from 'axios';
 interface status_store{
    status: null | 'reserved' | 'pending' | 'rejected' | 'cancelled' | 'done';
    amount: number
    done_count: number;
    reserved_count: number;
    pending_count: number;
    rejected_count: number;
    cancelled_count: number;
    fetchStatus: (reservation_id: string | number) => Promise<void>;
}

const useStatus = create<status_store>((set) => ({
    status: null,
    amount: 0,
    done_count: 0,
    reserved_count: 0,
    pending_count: 0,
    rejected_count: 0,
    cancelled_count: 0,
    fetchStatus: async (reservation_id) => {
        set({ status: null });
        try {
            const response = await axios.get(`/Reservations/${reservation_id}`);
            const newstatus = response.data.Reservation["Reservations1"].status
            set((state) => ({
                status: newstatus,
                amount: state.amount + 1,
                done_count: newstatus === 'done' ? state.done_count + 1 : state.done_count,
                reserved_count: newstatus === 'reserved' ? state.reserved_count + 1 : state.reserved_count,
                pending_count: newstatus === 'pending' ? state.pending_count + 1 : state.pending_count,
                rejected_count: newstatus === 'rejected' ? state.rejected_count + 1 : state.rejected_count,
                cancelled_count: newstatus === 'cancelled' ? state.cancelled_count + 1 : state.cancelled_count,
             }));
            console.log(response.data.Reservation["Reservations1"].status)
        } catch (error) {
            set({ status: null });
            console.log("Error fetching status:", error);
        }
    }
}));

export default useStatus;

// This is the the status store you can get your status from here and you can use it for Hooks or other features it will likley change once the back-end is ready but the idea
// and how it works should reamin the same
