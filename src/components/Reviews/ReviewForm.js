import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

import * as yup from "yup";
import * as formik from "formik";

import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import FormSection from "../Layout/FormSection";

function ReviewForm(props) {
    const schema = yup.object().shape({
        content: yup.string()
            .max(500)
            .required(),
        fps: yup.number()
            .positive()
            .required(),
        gameplayRating: yup.number()
            .required(),
        graphicsRating: yup.number()
            .required(),
        musicRating: yup.number()
            .required()
    });

    const {Formik} = formik;
    const history = useNavigate();

    return (
        <Formik
            validationSchema={schema}
            onSubmit={props.onCreate}
            initialValues={{
                content: "",
                fps: 0,
                gameplayRating: 0,
                graphicsRating: 0,
                musicRating: 0
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {props.loadErrors ? <Alert variant="danger"
                                               className="mb-3">{props.loadErrors.code ? `[${props.loadErrors.code}] ${props.loadErrors.message}` : `${props.loadErrors.message}`}</Alert> : ''}
                    {props.submitErrors ? <Alert variant="danger"
                                                 className="mb-3">{props.submitErrors.code ? `[${props.submitErrors.code}] ${props.submitErrors.message}` : `${props.submitErrors.message}`}</Alert> : ''}

                    <FormSection name="Review content"
                                 description={
                                     <Fragment>
                                         <p>Feel free to write all your impressions about gameplay and, most
                                             importantly, performance
                                             of {props.game ? props.game.name : 'the game'}.</p>
                                         <p>You can also provide how you was able to run game on your device - to help
                                             others with incompatible devices.</p>
                                     </Fragment>
                                 }>
                        <FloatingLabel className="mb-3" controlId="game" label="Game">
                            <Form.Control
                                type="text"
                                value={props.game ? props.game.name : ''}
                                disabled
                            />
                        </FloatingLabel>

                        <FloatingLabel className="mb-3" controlId="content" label="Content">
                            <Form.Control
                                as="textarea"
                                style={{"height": "20em"}}
                                name="content"
                                value={values.content}
                                onChange={handleChange}
                                isInvalid={!!errors.content}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                    </FormSection>
                    <FormSection name="Game's score"
                                 description={`Rate ${props.game ? props.game.name : 'the game'} using simple 0-10 scale.`}>
                        <FloatingLabel className="mb-3" controlId="fps" label="Average FPS">
                            <Form.Control
                                type="number"
                                name="fps"
                                value={values.fps}
                                onChange={handleChange}
                                isInvalid={!!errors.fps}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.fps}
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="gameplay">
                                    <Form.Label>Gameplay</Form.Label>
                                    <p className="mb-0">
                                        <span className="h3">{values.gameplayRating}</span>
                                        <span className="text-muted">/10</span>
                                    </p>
                                    <Form.Range
                                        name="gameplayRating"
                                        min={0}
                                        max={10}
                                        step={1}
                                        defaultValue={values.gameplayRating}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="graphics">
                                    <Form.Label>Graphics</Form.Label>
                                    <p className="mb-0">
                                        <span className="h3">{values.graphicsRating}</span>
                                        <span className="text-muted">/10</span>
                                    </p>
                                    <Form.Range
                                        name="graphicsRating"
                                        min={0}
                                        max={10}
                                        step={1}
                                        defaultValue={values.graphicsRating}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="music">
                                    <Form.Label>Music</Form.Label>
                                    <p className="mb-0">
                                        <span className="h3">{values.musicRating}</span>
                                        <span className="text-muted">/10</span>
                                    </p>
                                    <Form.Range
                                        type={"number"}
                                        name="musicRating"
                                        min={0}
                                        max={10}
                                        step={1}
                                        defaultValue={values.musicRating}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                    </FormSection>

                    <Row>
                        <hr/>
                        <Col md={4}/>
                        <Col md={8}>
                            <ButtonGroup className="mb-3">
                                <Button variant="primary" type="submit">Submit changes</Button>
                                <Button variant="outline-secondary" onClick={() => history(-1)}>Nevermind</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

export default ReviewForm;