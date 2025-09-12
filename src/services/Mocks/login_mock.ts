import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
 const mock = new MockAdapter(axios);

 mock.onPost("/Users/login").reply(config => {
    const {email,password} = JSON.parse(config.data);
 
    if(email === "FakeUser@example.com" && password === "FakePassword"){
        return[200,{
    success : true,
    token : "fake_token_12345",
    user: {
        id: 1,
        userName: "Fake User",
        email: "FakeUser@example.com"}
    }]}

    else {
        return [401, {
            success: false,
            message: "Invalid input"
        }];
    }});

    //this is a mock api used for testing api calls call an api on the path and write the logic for testing the api
    export default mock;