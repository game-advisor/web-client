/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState, Fragment} from "react";
import APIService from "../../api/APIService";
import authContext from "../../store/AuthContext";

import ProfileHeader from "./ProfileLayout/ProfileHeader";
import LazyHeader from "../LazyHeader";
import {Breadcrumb, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

function ProfileLayout(props) {
    const [appState, setAppState] = useState({
        loaded: false,
        user: {},
        errors: null
    })

    const authCtx = useContext(authContext);
    const api = APIService();
    const userID = props.isPersonal ? authCtx.details.userID : props.id;

    const LazyProfileHeader = LazyHeader(ProfileHeader);

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            api.get(`/user/${userID}`)
                .then((res) => setAppState({
                    loaded: res.completed,
                    user: res.data,
                    errors: res.errors
                }))
                .catch((err) => setAppState({
                    loaded: err.completed,
                    user: err.data,
                    errors: err.errors
                }))
        }
    }, [userID, authCtx]);

    return (
        <Fragment>
            <LazyProfileHeader isLoaded={appState.loaded} isPersonal={props.isPersonal} id={userID} user={appState.user}
                               errors={appState.errors}/>
            <Container as="section">
                {(props.isPersonal || (appState.loaded && appState.user)) ?
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Users</Breadcrumb.Item>
                        {props.isPersonal ?
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: `/me`}}>My profile</Breadcrumb.Item> :
                            <Breadcrumb.Item linkAs={Link}
                                             linkProps={{to: `/users/${userID}`}}>{appState.user.username}</Breadcrumb.Item>
                        }
                        {props.subpages ? props.subpages : ''}
                    </Breadcrumb>
                    : ''}

                {props.children}
            </Container>
        </Fragment>
    );
}

export default ProfileLayout;