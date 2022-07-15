import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Card, Carousel, Button } from "react-bootstrap";

export default function About() {
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const navigate = useNavigate();

  async function handleHome() {
    navigate("/");
  }

  async function handleQuiz() {
    navigate("/quiz");
  }

  async function handleChats() {
    navigate("/chats");
  }

  return (
    <>
      <Header />
      <div
        style={{
          position: "relative",
          zIndex: "1",
          marginBottom: "100px",
          backgroundColor: "white",
          textAlign: "center",
          minHeight: "100vh",
        }}
        className="shadow-lg"
      >
        {matches ? (
          <Card className="border-0">
            <Card.Body className="m-5">
              <Carousel variant={"dark"} interval={3000} indicators={false}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="undraw_graduation_re_gthn.svg"
                    alt="First slide"
                  />
                  <Carousel.Caption style={{ top: "0", bottom: "0" }}>
                    <h3>Bine ai venit pe site-ul Univercity4U!</h3>
                    <p>
                      Pentru că știm cât de grea poate fi alegerea unei
                      facultăți și cât de multă responsabilitate implică această
                      decizie, venim în ajutorul tău! Explorează opțiunile
                      universitare din România, află ce opțiune ți s-ar potrivi
                      și discută cu ceilalți despre asta.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="undraw_searching_re_3ra9.svg"
                    alt="Second slide"
                  />
                  <Carousel.Caption
                    className="d-flex align-items-center"
                    style={{ top: "0", bottom: "0" }}
                  >
                    <h3>
                      Vrei să știi ce oportunități de studiu există la noi în
                      țară?
                    </h3>
                    <div style={{ paddingLeft: "30rem" }}>
                      <p>
                        Ei bine, aici e locul perfect de unde poți să aflii. Le
                        poți filtra, sorta și căuta după preferințele tale, poți
                        vizualiza și posta comentarii pentru fiecare
                        specializare.
                      </p>
                      <Button onClick={handleHome} variant="outline-primary">
                        Explorează opțiunile universitare
                      </Button>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="undraw_pending_approval_xuu9.svg"
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <h3
                      style={{
                        position: "absolute",
                        top: "-190px",
                        width: "280px",
                      }}
                    >
                      Multitudinea de opțiuni te copleșește și nu știi ce să
                      alegi?
                    </h3>
                    <div
                      style={{
                        position: "absolute",
                        top: "-95px",
                        right: "190px",
                        width: "375px",
                      }}
                    >
                      <p>
                        Noi venim în ajutorul tău! Poți efectua chestionarul de
                        orientare în carieră disponibil pe site, chestionar
                        avizat de către doamna psiholog clinician autonom și
                        phihoterapeut integrativ, Nicolescu Simona Diana.
                      </p>
                      <Button onClick={handleQuiz} variant="outline-primary">
                        Către chestionar
                      </Button>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="undraw_chatting_re_j55r.svg"
                    alt="Forth slide"
                  />
                  <Carousel.Caption className="d-flex align-items-center justify-content-center">
                    <h3
                      style={{
                        position: "absolute",
                        top: "-250px",
                        width: "350px",
                        left: "15px",
                      }}
                    >
                      Ți-ar prinde bine puțină comunicare în această perioadă
                      stresantă, așa-i?
                    </h3>
                    <div
                      style={{
                        position: "absolute",
                        top: "-400px",
                        right: "50px",
                        width: "300px",
                      }}
                    >
                      <p>
                        Ți-am pregătit grupuri de chat pentru fiecare ramură de
                        studiu pentru a fi mai ușor să comunici cu persoane cu
                        interese asemănătoare ție.
                      </p>
                      <Button onClick={handleChats} variant="outline-primary">
                        Înscrie-te în grupurile de chat
                      </Button>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Card.Body>
          </Card>
        ) : (
          <div className="d-flex flex-column">
            <Card style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", marginTop:"2rem", marginLeft:"2rem", marginRight:"2rem", marginBottom:"2rem" }}>
              <Card.Img variant="top" src="undraw_graduation_re_gthn.svg" />
              <Card.Body>
                <Card.Title>
                  Bine ai venit pe site-ul Univercity4You!
                </Card.Title>
                <Card.Text>
                  Pentru că știm cât de grea poate fi alegerea unei facultăți și
                  cât de multă responsabilitate implică această decizie, venim
                  în ajutorul tău! Explorează opțiunile universitare din
                  România, află ce opțiune ți s-ar potrivi și discută cu
                  ceilalți despre asta.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", marginLeft:"2rem", marginRight:"2rem", marginBottom:"2rem" }}>
              <Card.Img variant="top" src="undraw_searching_re_3ra9.svg" />
              <Card.Body>
                <Card.Title>
                  Vrei să știi ce oportunități de studiu există la noi în țară?
                </Card.Title>
                <Card.Text>
                  Ei bine, aici e locul perfect de unde poți să aflii. Le poți
                  filtra, sorta și căuta după preferințele tale, poți vizualiza
                  și posta comentarii pentru fiecare specializare.
                </Card.Text>
                <Button onClick={handleHome} variant="outline-primary">
                  Explorează opțiunile universitare
                </Button>
              </Card.Body>
            </Card>

            <Card style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", marginLeft:"2rem", marginRight:"2rem", marginBottom:"2rem"  }}>
              <Card.Img variant="top" src="undraw_pending_approval_xuu9.svg" />
              <Card.Body>
                <Card.Title>
                  Multitudinea de opțiuni te copleșește și nu știi ce să alegi?
                </Card.Title>
                <Card.Text>
                  Noi venim în ajutorul tău! Poți efectua chestionarul de
                  orientare în carieră disponibil pe site, chestionar avizat de
                  către doamna psiholog clinician autonom și phihoterapeut
                  integrativ, Nicolescu Simona Diana.
                </Card.Text>
                <Button onClick={handleQuiz} variant="outline-primary">
                  Către chestionar
                </Button>
              </Card.Body>
            </Card>

            <Card style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", marginLeft:"2rem", marginRight:"2rem", marginBottom:"2rem" }}>
              <Card.Img variant="top" src="undraw_chatting_re_j55r.svg" />
              <Card.Body>
                <Card.Title>
                  Ți-ar prinde bine puțină comunicare în această perioadă
                  stresantă, așa-i?
                </Card.Title>
                <Card.Text>
                  Ți-am pregătit grupuri de chat pentru fiecare ramură de studiu
                  pentru a fi mai ușor să comunici cu persoane cu interese
                  asemănătoare ție.
                </Card.Text>
                <Button onClick={handleChats} variant="outline-primary">
                  Înscrie-te în grupurile de chat
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
