import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function Layout(props) {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(null);
    alert("Sucessfully Logged Out")
  };

  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid black",
          padding: "15px",
        }}
      >
        <Container>
          <Row>
            <Col>
              <Link>
                <LayoutButton
                  backgroundColor={"#FFFFFF"}
                  textColor={"#000000"}
                  to="/"
                >
                  Logo
                </LayoutButton>
              </Link>
            </Col>
            <Col xs={8}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <LayoutButton backgroundColor={"#FFFFFF"} textColor={"#000000"}>
                  About Us
                </LayoutButton>
                <LayoutButton backgroundColor={"#FFFFFF"} textColor={"#000000"}>
                  Services
                </LayoutButton>
                <LayoutButton backgroundColor={"#FFFFFF"} textColor={"#000000"}>
                  Products
                </LayoutButton>
                <LayoutButton backgroundColor={"#FFFFFF"} textColor={"#000000"}>
                  More
                </LayoutButton>
              </div>
            </Col>
            {user ? (
              <>
                <Col>
                  <Link to="/">
                    <LayoutButton
                      backgroundColor={"#000000"}
                      textColor={"#FFFFFF"}
                    >
                      Profile
                    </LayoutButton>
                  </Link>
                </Col>
                <Col>
                  <Link to="/">
                    <LayoutButton
                      backgroundColor={"#000000"}
                      textColor={"#FFFFFF"}
                      logout={logout}
                    >
                      Log Out
                    </LayoutButton>
                  </Link>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <Link to="/signup">
                    <LayoutButton
                      backgroundColor={"#000000"}
                      textColor={"#FFFFFF"}
                    >
                      Sign Up
                    </LayoutButton>
                  </Link>
                </Col>

                <Col>
                  <Link to="/login">
                    <LayoutButton
                      backgroundColor={"#000000"}
                      textColor={"#FFFFFF"}
                    >
                      Login
                    </LayoutButton>
                  </Link>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </div>
      <Outlet />
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            fontWeight: "bold",

            marginTop: "80px",
          }}
        >
          <div>Logo</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",

              fontSize: "16px",
            }}
          >
            <div style={{ padding: "16px" }}>About Us</div>
            <div style={{ padding: "16px" }}>Services</div>
            <div style={{ padding: "16px" }}>Contact Us</div>
            <div style={{ padding: "16px" }}>FAQ</div>
            <div style={{ padding: "16px" }}>Blog</div>
          </div>
        </div>
        <Container
          style={{
            fontSize: "14px",
            paddingTop: "20px",
            paddingBottom: "20px",
            borderTop: "1px solid black",
          }}
        >
          <Row>
            <Col>© 2023 Rating Finder. All rights reserved.</Col>
            <Col md="auto">Privacy Policy</Col>
            <Col md="auto">Terms and Conditions</Col>
            <Col md="auto">Cookie Policy</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

function LayoutButton(props) {
  const background_color = props.backgroundColor;
  const text_color = props.textColor;
  return (
    <button
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: "100px",
        height: "40px",

        color: text_color,
        fontSize: "16px",
        fontWeight: "400",

        borderWidth: "0px",
        backgroundColor: background_color,
      }}
      onClick={props.logout}
    >
      {props.children}
    </button>
  );
}
