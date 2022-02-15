import {Link} from "react-router-dom";
import {Card, Container, Nav} from "react-bootstrap";
import {LoginIcon, UserAddIcon} from "@heroicons/react/outline";

function AuthLayout(props) {
    return (
        <Container>
            <Card className="mt-3">
                <Card.Header>
                    <Nav fill variant="tabs" defaultActiveKey="/register">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/login" className={props.location === "/login" ? "active" : ""}>Login <LoginIcon width="18" height="18" /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/register" className={props.location === "/register" ? "active" : ""}>Register <UserAddIcon width="18" height="18" /></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    {props.children}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AuthLayout;