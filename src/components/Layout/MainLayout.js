import {Fragment} from "react";

import MainHeader from "./MainLayout/MainHeader";
import AppFooter from "./AppFooter";

function MainLayout(props) {
    return (
        <Fragment>
            <MainHeader />
            {props.children}
            <AppFooter />
        </Fragment>
    );
}

export default MainLayout;