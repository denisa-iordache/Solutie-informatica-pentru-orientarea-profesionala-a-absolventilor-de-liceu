import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuthentication } from "../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import Footer from "./Footer";
import Header from "./Header";

export default function SignUp() {
  const nameRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, googleSignIn } = useAuthentication();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (
      passwordRef.current.value.length < 6 ||
      passwordConfirmRef.current.value.length < 6
    ) {
      return setError("The password length must be at least 6 characters");
    }
    // if (emailRef.current.value.exists) {
    //   return setError("An account with this email already exists");
    // }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then(
        (data) => {
          const postData = {
            id: data.user.uid,
            nume: nameRef.current.value,
            prenume: surnameRef.current.value,
            username: usernameRef.current.value,
          };
          console.log(postData);

          fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/users`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }).then((res) => res.json());
        }
      );
      navigate("/");
    } catch (error) {
      if (
        passwordRef.current.value.length < 6 ||
        passwordConfirmRef.current.value.length < 6
      ) {
        setError("The password length must be at least 6 characters");
      } else {
        setError("Failed to create an account!");
      }
    }
    setLoading(false);
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await googleSignIn().then((data) => {
        const postData = {
          id: data.user.uid,
          nume: null,
          prenume: null,
          username: null,
        };
        console.log(postData);

        fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/users`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }).then((res) => res.json());
      });
      navigate("/");
    } catch (error) {
      setError("Failed to create an account!");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div
        style={{
          position: "relative",
          zIndex: "1",
          marginBottom: "100px",
          backgroundColor: "white",
        }}
        className="shadow-lg"
      >
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card
              style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
            >
              <Card.Body>
                <h2 className="text-center">Creează un cont</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="name">
                    <Form.Label>Nume</Form.Label>
                    <Form.Control type="text" ref={nameRef}></Form.Control>
                  </Form.Group>
                  <Form.Group id="surname">
                    <Form.Label>Prenume</Form.Label>
                    <Form.Control type="text" ref={surnameRef}></Form.Control>
                  </Form.Group>
                  <Form.Group id="username">
                    <Form.Label>Nume de utilizator</Form.Label>
                    <Form.Control type="text" ref={usernameRef}></Form.Control>
                  </Form.Group>
                  <Form.Group id="email">
                    <Form.Label className="d-flex flex-row">
                      Adresă de email
                      <span style={{ color: "red", marginLeft: "3px" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label className="d-flex">
                      Parolă
                      <span style={{ color: "red", marginLeft: "3px" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="password-confirm">
                    <Form.Label className="d-flex">
                      Confirmare parolă
                      <span style={{ color: "red", marginLeft: "3px" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loading}
                    className="w-100 mt-2"
                    type="submit"
                  >
                    Înregistrează-te
                  </Button>
                  <div className="mt-1" style={{ textAlign: "center" }}>
                    <span>sau</span>
                  </div>
                  <GoogleButton
                    className="g-btn w-100 mt-1"
                    type="dark"
                    onClick={handleGoogleSignIn}
                  />
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-1">
              Ai deja un cont? <a href="/loginPage">Autentifică-te în cont</a>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
