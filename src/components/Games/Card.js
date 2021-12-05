import React, {Component} from "react";
import {Badge, Button, Card as BCard, Col, Container, Form, Nav, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const Card = (props) => {
    return (
        <BCard>
            <BCard.Img variant="top" src={props.imgLocation} />
            <BCard.Body>
                <BCard.Title style={{ marginTop: '-100%' }}>{props.title}</BCard.Title>
                <BCard.Text>{props.description}</BCard.Text>

                <BCard.Text className="text-muted">{props.reviewCount} reviews &bull; {props.publisher}</BCard.Text>
                <Button variant="primary">Go somewhere</Button>
            </BCard.Body>
        </BCard>
    );
}

export default Card;