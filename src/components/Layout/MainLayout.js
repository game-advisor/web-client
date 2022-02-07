import {Fragment} from "react";

import MainHeader from "./MainLayout/MainHeader";

function MainLayout(props) {
    return (
        <Fragment>
            <MainHeader />
            {props.children}
        </Fragment>
    );
}

export default MainLayout;