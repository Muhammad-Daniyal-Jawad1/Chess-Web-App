import axios from 'axios'

async function sendLogoutRequest() {

    console.log("Logout Initiated");

    const response = await axios({
        method: "get",
        url: "http://localhost:4000/api/logout",
        headers: {
            "Content-Type": "application/json",
            "refresh-token": `${JSON.parse(localStorage.getItem('refresh-token'))}`
        }
    }).catch (function (error) {
        if (error.response) {
            console.log("Error");
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    });

    if(response)
    {
        if (response.status === 204) {
            console.log("Logout Successful");
            localStorage.clear();
            window.location.reload();
        }
    }
}

export default sendLogoutRequest