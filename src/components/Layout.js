import MainNavigation from './Layout/MainNavigation';
import {Fragment} from "react";

function Layout(props) {
    return (
        <Fragment>
            <MainNavigation />
            {props.children}
        </Fragment>
    );
}

export default Layout;