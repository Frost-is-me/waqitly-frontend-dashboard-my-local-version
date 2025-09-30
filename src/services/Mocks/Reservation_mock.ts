import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

mock.onGet("/Reservations/Reservations1").reply(200, {
    Reservation: {
        Reservations1: {
            status: "done",
            TotalPrice : 50000,
            Date : "12-3-2025",
            StartTime : 4.30,
            EndTime : 6.30,},

        Reservations2: {
            status: "reserved",
            TotalPrice : 100000,
            Date : "11-5-2025",
            StartTime : 4.30,
            EndTime : 6.30,},

        Reservations3: {
            status: "pending",
            TotalPrice : 30000,
            Date : "4-3-2025",
            StartTime : 4.30,
            EndTime : 6.30,} 
    }

});
mock.onGet("/Reservations/Reservations2").reply(200, {
    Reservation: {
        Reservations1: {
            status: "done",
            TotalPrice : 50000,
            Date : "12-3-2025",
            StartTime : 4.30,
            EndTime : 6.30,},

        Reservations2: {
            status: "reserved",
            TotalPrice : 100000,
            Date : "11-5-2025",
            StartTime : 4.30,
            EndTime : 6.30,},

        Reservations3: {
            status: "pending",
            TotalPrice : 30000,
            Date : "4-3-2025",
            StartTime : 4.30,
            EndTime : 6.30,} 
    }

});
mock.onGet("/Reservations/Reservations3").reply(200, {
    Reservation: {
        Reservations1: {
            status: "done",
            TotalPrice : 50000,
            Date : "12-3-2025",
            StartTime : 4.30,
            EndTime : 6.30,},

        Reservations2: {
            status: "reserved",
            TotalPrice : 100000,
            Date : "11-5-2025",
            StartTime : 4.30,
            EndTime : 6.30,},

        Reservations3: {
            status: "pending",
            TotalPrice : 30000,
            Date : "4-3-2025",
            StartTime : 4.30,
            EndTime : 6.30,} 
    }

});
mock.onPut(`/reservations/1`).reply(200, {
    tableData : [
  {
    id: 1,
    name: "Sarah Johnson",
    space: "Conference Room A",
    status: "reserved",
    startTime: "6:30pm",
    endTime: "8:00pm",
    totalPrice: "$150"
  },
]

});

export default mock;

// This is Reservations mock api its only purpose is to test the api calls without needing a back-end