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

export default function Item(props) {
    const [itemData, setItemData] = useState([]);
    const [itemDetailData, setItemDetailData] = useState([]);

    useEffect(() => {
        axios.get(DB_URL + "/product/3")
            .then((res) => {
                setItemData(res.data);
                console.log(res.data);
            })
            .catch((e) => {
                console.log("Error while fetching data" + e);
            });

        axios.get(DB_URL + "/product/3/review")
            .then((res) => {
                setItemDetailData(res.data);
                console.log(res.data);
            })
            .catch((e) => {
                console.log("Error while fetching data" + e);
            });
    }, []);

    const name = itemData.name;
    const image = itemData.image;
    const brand = itemData.brand;
    const price = itemData.price;
    const rating = itemData.rating;
    const type = itemData.type;
    const summary = itemDetailData.length > 0 ? itemDetailData[4].summary : '';

    return (
        <>
            <Container style={{
                fontSize: '16px',
            }}>
                <Row>
                    <Col>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <div style={{
                                width: '70%',
                            }}>
                                <div style={titleFont}>
                                    Item Information
                                </div>
                                <div>
                                    {name}
                                    {summary}
                                </div>
                                <div style={{
                                    backgroundColor : '#D3D3D3',
                                    display: 'flex',
                                    alignItems: 'center',

                                    marginTop: '20px',
                                    marginBottom: '20px',
                                }}>
                                    <img src={`data:image/png;base64, ${image}`} alt={name} maxWidth='400px' maxHeight='500px' style={{
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                    }} />
                                </div>

                                <div>
                                    <div style={titleFont}>
                                        Product Review
                                    </div>
                                    <div>
                                        Pros & Cons
                                    </div>
                                </div>
                            </div>
                        </div >
                    </Col>
                </Row>
                <>
                    <Row style={{
                        marginBottom: '40px',
                    }}>
                        <Col>
                            <div style={titleFont}>
                                Customer Testimonials
                            </div>
                            <div>
                                Read what our customers have to say
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                Rating
                            </div>
                            <div>
                                Comments
                            </div>
                            <div>
                                User
                            </div>
                        </Col>
                        <Col>
                            <div>
                                Rating
                            </div>
                            <div>
                                Comments
                            </div>
                            <div>
                                User
                            </div>
                        </Col>
                    </Row>
                </>
            </Container>
        </>

    );
}