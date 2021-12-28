import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";

function EditDevice() {
    const params = useParams();
    return (
        <Container>
            <p>Edytuj urządzenie {params.id}</p>
        </Container>
    );
}

export default EditDevice;