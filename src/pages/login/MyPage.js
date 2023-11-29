import axios from "axios";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DB_URL } from "../../utils/URLs";

import Accordion from 'react-bootstrap/Accordion';

const titleFont = {
    fontWeight: 'bold',
    fontSize: '48px',
    marginTop: '20px',
    marginBottom: '20px',
};

export default function MyPage(props) {

    useEffect(() => {

    }, []);

    const personalInfo = [];
    const myItems = [];


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div style={{
                            marginTop: '20px',
                            marginBottom: '20px',
                        }}>
                            <h1>
                                My Account / Items
                            </h1>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Manage My Profiles</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        First Name
                                    </div>
                                    <div>
                                        Last Name
                                    </div>
                                    <div>
                                        Email
                                    </div>
                                    <div>
                                        Password
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        width: '100%',
                                    }}>
                                        <button style={{
                                           marginLeft: 'auto',
                                           marginRight: '0px',
                                        }}>
                                            Update
                                        </button>
                                    </div>

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>My Items</Accordion.Header>
                                <Accordion.Body>
                                    <ItemCard />
                                    <ItemCard />
                                    <ItemCard />
                                    <ItemCard />
                                    <ItemCard />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

function ItemCard(props) {

    return (
        <div style={{
            minHeight: '200px',

            borderRadius: '10px',
            padding: '20px',
            marginBottom: '10px',

            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'lightgrey',
        }}>
            <Container>
                <Row>
                    <Col>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <div>
                                Item
                            </div>
                            <div style={{
                                marginLeft: 'auto',
                                marginRight: '0px',
                            }}>
                                <button>
                                    Remove from the list
                                </button>
                            </div>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                            backgroundColor: 'lightgrey',

                            width: '100px',
                            height: '100px',
                        }}>
                            Image
                        </div>
                        <div style={{
                            marginLeft: '20px',
                        }}>
                            <div>
                                Price
                            </div>
                            <div>
                                Brand
                            </div>
                            <div>
                                Type
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}