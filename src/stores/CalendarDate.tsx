import {create} from "zustand"

interface DateStore {
    date: Date | undefined
    month: Date
    setDate: (date : Date) => void
    setMonth: (month : Date) => void
    Today: () => void
}

const useDates = create<DateStore>((set) => ({
    date: new Date(),
    month: new Date(),
    setDate: (date) => set({date}),
    setMonth: (month) => set({month}),
    Today: () => set({date: new Date(), month: new Date()})
}))

export default useDates