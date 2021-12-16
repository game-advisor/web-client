import {API_URL} from "../config/constant";
import axios from "axios";
import {useNavigate, Navigate} from "react-router-dom";

function Logout() {
    let history = useNavigate();
    const token = localStorage.getItem("token");

    localStorage.clear();
    return <Navigate to="/login" replace />
    /*
    axios.post(
        API_URL + '/user/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ).then(
        localStorage.clear();
        history('/login');
    ); */
}

export default Logout;