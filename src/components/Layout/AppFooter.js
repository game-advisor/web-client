import {Container} from "react-bootstrap";

function AppFooter() {
    return (
        <Container as="footer" fluid className="bg-light mt-3">
            <Container className="py-5 d-flex justify-content-center">
                &copy; 2021 GameAdvisor Team
            </Container>
        </Container>
    );
}

export default AppFooter;