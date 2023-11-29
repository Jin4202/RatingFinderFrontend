import { Col, Container, Row } from "react-bootstrap";

export default function Home(props) {

    return (
        <Container>
            <Row style={{
                marginTop: '40px',
            }}>
                <Col>
                    <h1>Discover Unique Items for Every Occasion</h1>
                </Col>
                <Col>
                    <div>
                        Welcome to our website, where you can find a wide selection of high-quality items to suit your needs.
                        Whether you're searching for a gift or treating yourself, we have something special just for you.
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        
                        marginTop: '30px',
                    }}>
                        <div style={{
                            marginRight: '10px',
                        }}>
                            <MainButton background={'black'} text={'white'}>
                                Browse
                            </MainButton>
                        </div>

                        <MainButton background={'white'} text={'black'}>
                            Shop Now
                        </MainButton>
                    </div>
                </Col>
            </Row>
            <Row style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    minHeight: '400px',
                    backgroundColor: 'lightgrey',
                    margin: '20px',
                }}>
                    Image
                </div>
            </Row>
        </Container>
    );
}

function MainButton(props) {
    const backgroundColor = props.background;
    const textColor = props.text;
    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',

        borderWidth: '1px',

        backgroundColor: backgroundColor,
        color: textColor,
    };
    return (
        <button style={buttonStyle}>
            {props.children}
        </button>
    )
}