import React, { Component } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardImg,
  CardBody,
  CardTitle,
  CardDeck
} from "reactstrap";

class Login extends Component {
  
  redirectTo = () => {
    window.location.href = "http://portal.azure.com";
  };

  render() {
    return (
      <CardDeck style={styles.container}>
        <Card style={styles.card}>
          <CardHeader style={styles.header}>
            <CardImg
              className="logos"
              style={styles.logos}
              src="./github.png"
            />
          </CardHeader>
          <CardBody>
            <CardTitle>Log In to Azure</CardTitle>
            <Button
              className="btn-github"
              style={{ backgroundColor: "#444444" }}
              onClick={this.redirectTo}
            >
              Log In
            </Button>
          </CardBody>
        </Card>
        <Card style={styles.card}>
          <CardHeader style={styles.header}>
            <CardImg
              className="logos"
              style={styles.logos}
              src="./ourLogo.jpg"
            />
          </CardHeader>
          <CardBody>
            <CardTitle>Direct Log In</CardTitle>
            <Button
              className="btn-github"
              onClick={() => this.props.onLogin(this)}
              style={{ backgroundColor: "#444444" }}
            >
              Log In
            </Button>
          </CardBody>
        </Card>
      </CardDeck>
    );
  }
}

const styles = {
  logos: {
    maxWidth: "250px",
    maxHeight: "250px"
  },
  header: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white"
  },
  card: {
    textAlign: "center",
    boxShadow: "7px 7px 8px 0px rgba(0,0,0,0.3)",
    margin: "50px",
    borderRadius: "2px"
  },
  container: {
    backgroundColor: "#ededed",
    borderRadius: "5px",
    boxShadow: "10px 10px 150px 58px rgba(0,0,0,0.6)",
    marginTop: "80px"
  }
};

export default Login;
