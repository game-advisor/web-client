/* eslint-disable react-hooks/exhaustive-deps */
import {useContext} from 'react';
import {Navigate, useNavigate} from "react-router-dom";

import authContext from "../../store/AuthContext";
import i18n from "../../i18n/en.json"

import ProfileLayout from "../../components/Profile/ProfileLayout";
import PageSection from "../../components/Layout/PageSection";
import {BreadcrumbItem} from "react-bootstrap";
import DeviceList from "../../components/Devices/DeviceList";
import {ViewGridAddIcon} from "@heroicons/react/outline";

function AllDevices() {
    const authCtx = useContext(authContext);
    const history = useNavigate();

    if (authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>

    return (
        <ProfileLayout isPersonal={true} subpages={<BreadcrumbItem active>Devices</BreadcrumbItem>}>
            <PageSection name={i18n["devices.sectionTitle"]} description={i18n["devices.sectionDesc"]}
                         withAction={true}
                         actionName={i18n["devices.actionAdd"]} actionIcon={<ViewGridAddIcon width="24" height="24" />} onAction={() => history("create")}>
                <DeviceList isPersonal={true} />
            </PageSection>
        </ProfileLayout>
    );
}

export default AllDevices;