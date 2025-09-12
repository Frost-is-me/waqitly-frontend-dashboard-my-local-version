import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

mock.onGet("/reservations/123").reply(200, {
    Reservation: {
        name1: {space: "A1",
            status: "done",
            name: "John Doe",
            date: "2023-10-15",},

        name2: {space: "A1",
            status: "reserved",
            name: "John Doe",
            date: "2023-10-15",},

        name3: {space: "A1",
            status: "rejected",
            name: "John Doe",
            date: "2023-10-15",} 
    }

});

export default mock;