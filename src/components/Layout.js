import MainNavigation from './Layout/MainNavigation';
import classes from './Layout.module.css';
import MainHeader from "./Layout/MainHeader";
import {Container} from "react-bootstrap";

function Layout(props) {
    return (
        <div>
            <MainNavigation />
            {props.children}
        </div>
    );
}

export default Layout;