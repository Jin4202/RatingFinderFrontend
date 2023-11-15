import axios from "axios";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DB_URL } from "../../utils/URLs";

const titleFont = {
    fontWeight: 'bold',
    fontSize: '48px',
    marginTop: '20px',
    marginBottom: '20px',
};

export default function Signup(props) {

    useEffect(() => {

    }, []);

    return (
        <>
            <div style={{
                marginBottom: '80px',
            }}>
                <div style={{
                    margin: '40px',
                }}>
                    <div style={titleFont}>
                        Find Your Ratings
                    </div>
                    <div>
                        Sign up now to get personalized recommendations and share your reviews with others.
                    </div>
                </div>


            </div>
            <Container>
                <Row>
                    <Col>
                        <div style={titleFont}>
                            Get in Touch
                        </div>
                    </Col>
                    <Col>
                        <div>
                            First Name
                        </div>
                        <div>
                            Last Name
                        </div>
                        <div>
                            Username
                        </div>
                        <div>
                            Email
                        </div>
                        <div>
                            Password
                        </div>
                        <div>
                            Re-type Password
                        </div>
                    </Col>
                </Row>
            </Container>
        </>

    );
}