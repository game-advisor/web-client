import {useNavigate} from "react-router-dom";

import * as yup from "yup";
import * as formik from "formik";

import {Button, Col, Form, Row} from "react-bootstrap";

function MainSearch() {
    const schema = yup.object().shape({
        name: yup.string()
    });

    const {Formik} = formik;
    const history = useNavigate();

    return (
        <Formik
            validationSchema={schema}
            onSubmit={(query) => history(`/search/${query.name}`)}
            initialValues={{
                name: ""
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="g-0">
                        <Col xs={8} md={9}>
                            <Form.Group controlId="name" >
                                <Form.Control
                                    type="text"
                                    value={values.name}
                                    size="lg"
                                    placeholder="Search"
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col className="d-grid ms-2">
                            <Button variant="primary" type="submit">Search</Button>
                        </Col>
                    </Row>
                    <Form.Text>Eg. “Need for Speed”, “FPS”</Form.Text>
                </Form>
            )}
        </Formik>
    );
}

export default MainSearch;