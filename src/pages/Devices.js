import {useContext, Fragment} from 'react';
import {Outlet} from 'react-router-dom';

import authContext from "../store/AuthContext";
import {Navigate, useNavigate} from "react-router-dom";

import ActionHeader from "../components/Layout/Header/ActionHeader";

function Discover() {
    const authCtx = useContext(authContext);
    const history = useNavigate();

    if(authCtx.isLoggedIn === false)
        return <Navigate to="/login" replace />

    return (
        <Fragment>
            <ActionHeader name="Your devices" description="You suck" actionName="Add device" onAction={() => history("/devices/add")}/>
            <Outlet />
        </Fragment>
    );
}

export default Discover;