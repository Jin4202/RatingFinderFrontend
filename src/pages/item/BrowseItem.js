import ProductCard from '../../components/item/ProductCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DB_URL } from '../../utils/URLs';

export default function BrowseItem(props) {

    const [productData, getProductData] = useState([]);
    useEffect(() => {
        axios.get(DB_URL + "/product/allProduct")
            .then((res) => {
                getProductData(res.data);
            });
    }, []);

    return (
        <div>
            <Container style={{
                margin: '64px',
            }}>
                <Row>
                    <Col style={{
                        fontWeight: '600',
                        fontSize: '16px',
                    }}>
                        Discover
                    </Col>
                </Row>
                <Row>
                    <Col style={{
                        fontWeight: '700',
                        fontSize: '48px',
                    }}>
                        Featured
                    </Col>
                </Row>
                <Row>
                    <Col style={{
                        fontWeight: '400',
                        fontSize: '18px',
                    }}>
                        Browse our wide selection of products and find the perfect one for you.
                    </Col>
                </Row>
            </Container >
            <Container>
                <Row>
                    {productData.length > 0 ? (productData.map((product) => {
                        return (
                            <Col>
                                <ProductCard data={product} />
                            </Col>
                        );
                    })) : (<></>)}
                </Row>

            </Container>

        </div>



    );
}