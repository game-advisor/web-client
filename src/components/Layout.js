import AppNavbar from './Layout/AppNavbar';
import {Fragment} from "react";
import AppFooter from "./Layout/AppFooter";

function Layout(props) {
    return (
        <Fragment>
            <AppNavbar />
            <main>
                {props.children}
            </main>
            <AppFooter />
        </Fragment>
    );
}

export default Layout;