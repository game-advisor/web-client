import axios from "axios";
import {API_URL} from "../../config/constant";

function Logout() {
    axios.post(API_URL + '/user/logout')
        .then(
            res => {
                window.location = "/";
            },
            err => console.log(err)
        );
}

export default Logout;