import {Fragment} from "react";

import BrowseHeader from "./MainLayout/BrowseHeader";

function MainLayout(props) {
    return (
        <Fragment>
            <BrowseHeader />
            {props.children}
        </Fragment>
    );
}

export default MainLayout;