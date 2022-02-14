import {Container} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

import * as yup from "yup";
import * as formik from "formik";

import {Button, Col, Form, Row} from "react-bootstrap";
import TagsCloud from "./TagsCloud";

function BrowseHeader() {
    const schema = yup.object().shape({
        name: yup.string()
    });

    const {Formik} = formik;
    const history = useNavigate();

    return (
        <Container as="header" fluid className="bg-dark text-white mb-3">
            <Container className="py-5">
                <h1 className="text-center mb-3">What game are you looking for?</h1>
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
                            <Form.Text>Eg. “Need for Speed”, “Half-Life”</Form.Text>
                        </Form>
                    )}
                </Formik>

                <p className="mt-5">...don’t know what do you want to play? Check our suggestions or use <Link to={`/search/advanced`}>advanced search</Link></p>
                <TagsCloud />
            </Container>
        </Container>
    );
}

export default BrowseHeader;