import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ProductCard(props) {
    const product = props.data;

    const image = product.image;
    const name = product.name;
    const type = product.type;
    const price = product.price;
    const id = product.prod_id;


    return (
        <Container style={{
            maxWidth: '400px',
            marginBottom: '10px',
        }}>
            <Row>
                <Col style={{
                    backgroundColor: '#D3D3D3',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <img src={`data:image/png;base64, ${image}`} alt={name} maxWidth='400px' maxHeight='300px' style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }} />

                </Col>
            </Row>
            <Row>
                <Col style={{
                    fontWeight: '600',
                    fontSize: '18px',
                }}>
                    {name}
                </Col>
                <Col md="auto"
                    style={{
                        fontWeight: '600',
                        fontSize: '20px',
                    }}>
                    ${price}
                </Col>
            </Row>
            <Row>
                <Col style={{
                    fontWeight: '400',
                    fontSize: '14px',
                }}>
                    {type}
                </Col>
            </Row>
        </Container>
    );
}