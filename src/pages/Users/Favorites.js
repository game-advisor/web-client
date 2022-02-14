import {useContext} from "react";
import AuthContext from "../../store/AuthContext";
import {Navigate} from "react-router-dom";

import {BreadcrumbItem, Container} from "react-bootstrap";
import ProfileLayout from "../../components/Profile/ProfileLayout";

function Favorites() {
    const authCtx = useContext(AuthContext);
    if(authCtx.getstatus() === false)
        return <Navigate to="/login" replace/>;

    return (
        <ProfileLayout isPersonal={true} subpages={<BreadcrumbItem active>Favorities</BreadcrumbItem>}>
            <Container>My favorites placeholder</Container>
        </ProfileLayout>
    );
}

export default Favorites;