import {Fragment, useContext, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";

import APIService from "../../api/APIService";
import AuthContext from "../../store/AuthContext";

import { BreadcrumbItem } from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import DeviceForm from "../../components/Devices/DeviceForm";

function NewDevice() {
    const [submitState, setSubmitState] = useState({
        completed: false,
        data: null,
        errors: null
    });

    const authCtx = useContext(AuthContext);
    const api = APIService();
    const history = useNavigate();

    function submitDevice(deviceData) {
        setSubmitState({
            completed: false,
            data: null
        });

        api.post('/device/add', deviceData)
            .then((res) => {
                setSubmitState({
                    completed: res.completed,
                    data: res.data,
                    errors: res.errors
                })
                history(`/me/devices`);
            })
            .catch((err) => setSubmitState({
                completed: err.completed,
                data: err.data,
                errors: err.errors
            }))
    }

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout isPersonal={true}
                       subpages={<Fragment>
                           <BreadcrumbItem linkAs={Link} linkProps={{to: "/me/devices"}}>Devices</BreadcrumbItem>
                           <BreadcrumbItem active>New device</BreadcrumbItem>
                       </Fragment>}>

            <PageSection name="Add new device" description="Add your device using forms below"
                         withAction={false}>
                <DeviceForm onSubmit={submitDevice} submitResponse={submitState.data} submitErrors={submitState.errors}/>
            </PageSection>
        </ProfileLayout>
    );
}

export default NewDevice;