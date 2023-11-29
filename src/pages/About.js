import { Col, Container, Row } from "react-bootstrap";

export default function About(props) {

    return (
        <Container>
            <Row style={{
                marginTop: '40px',
            }}>
                <Col>
                    <h1>
                        Empowering Individuals Through Technology
                    </h1>
                </Col>
                <Col>
                    At our company, we believe in harnessing the power of technology to empower individuals and enhance their lives. Our mission is to provide innovative solutions that enable users to take control of their online presence and access personalized information and reviews.
                </Col>
            </Row>
            <Row>
                <Col style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                    margin: '40px',
                }}>
                    <h1>Meet Our Team</h1>
                    <div>
                        Get to know the talented individuals behind our website.
                    </div>
                </Col>

            </Row>
            <Row>
                <Col>
                    <MemberCard />
                </Col>
                <Col>
                    <MemberCard />
                </Col>
                <Col>
                    <MemberCard />
                </Col>
                <Col>
                    <MemberCard />
                </Col>
            </Row>
        </Container>
    );
}

function MemberCard(props) {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                minHeight: '200px',
                width: '200px',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                backgroundColor: 'lightgrey',
            }}>
                Image
            </div>
            <div>
                FirstName LastName
            </div>
            <div>
                Web Developer
            </div>
            <div>
                FirstName is a skilled web developer with a passion for creating user-friendly websites.
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 3.74268C4.17157 3.74268 3.5 4.41425 3.5 5.24268V20.2427C3.5 21.0711 4.17157 21.7427 5 21.7427H20C20.8284 21.7427 21.5 21.0711 21.5 20.2427V5.24268C21.5 4.41425 20.8284 3.74268 20 3.74268H5ZM9.02076 7.7454C9.02639 8.70165 8.31061 9.29087 7.46123 9.28665C6.66107 9.28243 5.96357 8.6454 5.96779 7.74681C5.97201 6.90165 6.63998 6.22243 7.50764 6.24212C8.38795 6.26181 9.02639 6.90728 9.02076 7.7454ZM12.7797 10.5044H10.2597H10.2583V19.0643H12.9217V18.8646C12.9217 18.4847 12.9214 18.1047 12.9211 17.7246C12.9203 16.7108 12.9194 15.6959 12.9246 14.6824C12.926 14.4363 12.9372 14.1804 13.0005 13.9455C13.2381 13.068 14.0271 12.5013 14.9074 12.6406C15.4727 12.7291 15.8467 13.0568 16.0042 13.5898C16.1013 13.923 16.1449 14.2816 16.1491 14.629C16.1605 15.6766 16.1589 16.7242 16.1573 17.7719C16.1567 18.1417 16.1561 18.5117 16.1561 18.8815V19.0629H18.828V18.8576C18.828 18.4056 18.8278 17.9537 18.8275 17.5018C18.827 16.3723 18.8264 15.2428 18.8294 14.1129C18.8308 13.6024 18.776 13.099 18.6508 12.6054C18.4638 11.8713 18.0771 11.2638 17.4485 10.8251C17.0027 10.5129 16.5133 10.3118 15.9663 10.2893C15.904 10.2867 15.8412 10.2833 15.7781 10.2799C15.4984 10.2648 15.2141 10.2494 14.9467 10.3033C14.1817 10.4566 13.5096 10.8068 13.0019 11.4241C12.9429 11.4949 12.8852 11.5668 12.7991 11.6741L12.7797 11.6984V10.5044ZM6.18164 19.0671H8.83242V10.51H6.18164V19.0671Z" fill="black" />
                </svg>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.6761 4.74268H20.4362L14.4061 11.5201L21.5 20.7427H15.9456L11.5951 15.1493L6.61723 20.7427H3.85544L10.3052 13.4935L3.5 4.74268H9.19545L13.1279 9.8553L17.6761 4.74268ZM16.7073 19.1181H18.2368L8.36441 6.28196H6.7232L16.7073 19.1181Z" fill="black" />
                </svg>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 3.5C7.53145 3.5 3.5 7.53145 3.5 12.5C3.5 17.4686 7.53145 21.5 12.5 21.5C17.4588 21.5 21.5 17.4686 21.5 12.5C21.5 7.53145 17.4588 3.5 12.5 3.5ZM18.4447 7.64859C19.5184 8.95662 20.1627 10.6258 20.1822 12.4317C19.9284 12.3829 17.3904 11.8655 14.833 12.1876C14.7744 12.0607 14.7256 11.9241 14.667 11.7874C14.5108 11.4165 14.3352 11.0358 14.1594 10.6746C16.9902 9.5228 18.2787 7.86334 18.4447 7.64859ZM12.5 4.82755C14.4523 4.82755 16.2386 5.55966 17.5955 6.76031C17.4588 6.95553 16.2972 8.50759 13.564 9.53253C12.3048 7.21909 10.9089 5.32538 10.6942 5.03254C11.27 4.89588 11.8753 4.82755 12.5 4.82755ZM9.22996 5.54989C9.43494 5.82321 10.8015 7.72668 12.0803 9.99131C8.48807 10.948 5.31562 10.9284 4.97397 10.9284C5.4718 8.54664 7.08243 6.56507 9.22996 5.54989ZM4.80803 12.5098C4.80803 12.4317 4.80803 12.3536 4.80803 12.2755C5.13991 12.2852 8.86876 12.3341 12.705 11.1822C12.9295 11.6117 13.1345 12.051 13.3297 12.4902C13.2321 12.5195 13.1247 12.5488 13.0271 12.5781C9.06399 13.8568 6.95553 17.3514 6.77983 17.6442C5.55965 16.2874 4.80803 14.4816 4.80803 12.5098ZM12.5 20.192C10.7234 20.192 9.08352 19.5868 7.78525 18.5716C7.92191 18.2885 9.48371 15.282 13.8178 13.769C13.8373 13.7592 13.8471 13.7592 13.8666 13.7495C14.9501 16.551 15.3894 18.9034 15.5065 19.577C14.5792 19.9772 13.564 20.192 12.5 20.192ZM16.7852 18.8742C16.7072 18.4056 16.2972 16.1605 15.2917 13.398C17.7028 13.0173 19.8113 13.6421 20.0749 13.73C19.743 15.8677 18.513 17.7126 16.7852 18.8742Z" fill="black" />
                </svg>
            </div>
        </div>
    )
}