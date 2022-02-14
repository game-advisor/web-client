/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState, Fragment} from "react";
import useAPI from "../../api/API";
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
    const api = useAPI();
    const userID = props.isPersonal ? authCtx.details.userID : props.id;

    const LazyProfileHeader = LazyHeader(ProfileHeader);

    useEffect(() => {
        setAppState({loaded: false});

        api.get(`/user/${userID}`)
            .then((response) => {
                setAppState({
                    loaded: true,
                    user: response.data
                });
            })
            .catch((error) => {
                if (error.response)
                    setAppState({
                        loaded: true,
                        errors: {
                            code: error.response.data.code,
                            message: `${error.response.data.message}. Try refresh the page.`
                        }
                    });

                else if (error.request)
                    setAppState({
                        loaded: true,
                        errors: {
                            message: "Incorrect request. Try refresh the page."
                        }
                    });

                else
                    setAppState({
                        loaded: true,
                        errors: {
                            message: "Unexpected error occured."
                        }
                    });
            });
    }, [userID]);

    return (
        <Fragment>
            <LazyProfileHeader isLoaded={appState.loaded} isPersonal={props.isPersonal} id={userID} user={appState.user} errors={appState.errors} />
            <Container as="section">
                {(props.isPersonal || (appState.loaded && appState.user)) ?
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/users"}}>Users</Breadcrumb.Item>
                        {props.isPersonal ?
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: `/me`}}>My profile</Breadcrumb.Item> :
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: `/users/${userID}`}}>{appState.user.username}</Breadcrumb.Item>
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