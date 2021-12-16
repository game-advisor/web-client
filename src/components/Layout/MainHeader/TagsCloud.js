import {Link} from "react-router-dom";

import {Nav} from "react-bootstrap";

function MainSearch() {
    return (
        <Nav fill variant="pills">
            <Nav.Item>
                <Nav.Link as={Link} to="/explore/newest">Newest</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/explore/hottest">Hottest</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link active as={Link} to="/discover">Suggested</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/tags/console">Console</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/tags/arpg">Action RPG</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/tags/codemasters">Codemasters</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/tags/ubisoft">Ubisoft</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/tags/battlefield">Battlefield</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/tags">More tags</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default MainSearch;