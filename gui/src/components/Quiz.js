import React, { useState, useEffect } from "react";
import Header from "./Header";
import FooterQuiz from "./FooterQuiz";
import { useAuthentication } from "../context/AuthenticationContext";
import { Container } from "react-bootstrap";
import LoginPage from "./LoginPage";
import { Card, Accordion, Button } from "react-bootstrap";
import {
  FcFlowChart,
  FcGraduationCap,
  FcTreeStructure,
  FcLink,
  FcLock,
  FcUnlock,
  FcSurvey,
} from "react-icons/fc";
import { FaUniversity } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import { TbListNumbers } from "react-icons/tb";

export default function Quiz() {
  const [specializations, setSpecializations] = useState(null);
  const { currentUser } = useAuthentication();
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const getSpecializationsFilteredRamura = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/specializationsTotalRamuraQuiz/${id}`, {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
    })
      .then((res) => res.json())
      .then((data) => {
        setSpecializations(data);
      });
  };

  const questions = [
    {
      questionText: "Îți place să numeri bani?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [{ majorText: "Matematică" }, { majorText: "Științe economice" }],
    },
    {
      questionText: "Ți-ar plăcea să cânți pe o scenă?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Arte" },
        { majorText: "Psihologie și științe comportamentale" },
      ],
    },
    {
      questionText:
        "Ai putea să ajuți persoanele cu handicap să se pregătească pentru o meserie?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Științe ale comunicării" },
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Sociologie" },
      ],
    },
    {
      questionText: "Îți place să citești cărți, reviste științifice?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Matematică" },
        { majorText: "Informatică" },
        { majorText: "Fizică" },
        { majorText: "Chimie și inginerie chimică" },
        { majorText: "Științele pământului și atmosferei" },
        { majorText: "Inginerie civilă" },
        {
          majorText: "Inginerie electrică, electronică și telecomunicații",
        },
        { majorText: "Inginerie geologică, mine, petrol și gaze" },
        { majorText: "Ingineria transporturilor" },
        { majorText: "Ingineria resurselor vegetale și animale" },
        {
          majorText:
            "Ingineria sistemelor, calculatoare și tehnologia informației",
        },
        {
          majorText:
            "Inginerie mecanincă, mecatronică, inginerie industrială și management",
        },
        { majorText: "Biologie" },
        { majorText: "Biochimie" },
        { majorText: "Medicină" },
        { majorText: "Medicină veterinară" },
        { majorText: "Medicină dentară" },
        { majorText: "Farmacie" },
        { majorText: "Științe juridice" },
        { majorText: "Științe administrative" },
        { majorText: "Științe ale comunicării" },
        { majorText: "Sociologie" },
        { majorText: "Științe politice" },
        {
          majorText: "Științe militare, informații și ordine publică",
        },
        { majorText: "Științe economice" },
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Filologie" },
        { majorText: "Filosofie" },
        { majorText: "Istorie" },
        { majorText: "Teologie" },
        { majorText: "Studii culturale" },
        { majorText: "Arhitectură și urbanism" },
        { majorText: "Arte" },
        { majorText: "Știința sportului și educației fizice" },
      ],
    },
    {
      questionText: "Ți-ar plăcea să faci muncă de cercetare?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Chimie și inginerie chimică" },
        { majorText: "Științele pământului și atmosferei" },
        { majorText: "Inginerie geologică, mine, petrol și gaze" },
        { majorText: "Ingineria resurselor vegetale și animale" },
        { majorText: "Biologie" },
        { majorText: "Biochimie" },
        { majorText: "Medicină" },
        { majorText: "Medicină veterinară" },
        { majorText: "Medicină dentară" },
        { majorText: "Farmacie" },
      ],
    },
    {
      questionText: "Țe simți pregătit să ocupi o poziție de lider?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Științe politice" },
        { majorText: "Științe militare, informații și ordine publică" },
        { majorText: "Științe economice" },
        { majorText: "Știința sportului și educației fizice" },
      ],
    },
    {
      questionText: "Ai răbdare să introduci informații în calculator?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Informatică" },
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Științe economice" },
      ],
    },
    {
      questionText: "Ți se pare dificil să te prezinți altor persoane?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Sociologie" },
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Studii culturale" },
      ],
    },
    {
      questionText:
        "Te simți pregătit să-ți manifești afecțiunea față de ceilalți?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Sociologie" },
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Medicină" },
        { majorText: "Medicină veterinară" },
        { majorText: "Medicină dentară" },
        { majorText: "Studii culturale" },
        { majorText: "Științe ale comunicării" },
      ],
    },
    {
      questionText: "Ai putea să susții pe cineva în scopurile vieții sale?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Sociologie" },
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Teologie" },
      ],
    },
    {
      questionText:
        "Știi să răspunzi la întrebarea „Ce fel de persoană ești?”?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Studii culturale" },
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Teologie" },
      ],
    },
    {
      questionText: "Ești o persoană creativă?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Arte" },
        { majorText: "Arhitectură și urbanism" },
        { majorText: "Informatică" },
      ],
    },
    {
      questionText: "Ești pasionat de studiul științelor exacte?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Matematică" },
        { majorText: "Informatică" },
        { majorText: "Fizică" },
        { majorText: "Chimie și inginerie chimică" },
        { majorText: "Științele pământului și atmosferei" },
        { majorText: "Inginerie civilă" },
        {
          majorText: "Inginerie electrică, electronică și telecomunicații",
        },
        { majorText: "Inginerie geologică, mine, petrol și gaze" },
        { majorText: "Ingineria transporturilor" },
        { majorText: "Ingineria resurselor vegetale și animale" },
        {
          majorText:
            "Ingineria sistemelor, calculatoare și tehnologia informației",
        },
        {
          majorText:
            "Inginerie mecanincă, mecatronică, inginerie industrială și management",
        },
        { majorText: "Biologie" },
        { majorText: "Biochimie" },
        { majorText: "Medicină" },
        { majorText: "Medicină veterinară" },
        { majorText: "Medicină dentară" },
        { majorText: "Farmacie" },
        { majorText: "Științe economice" },
      ],
    },
    {
      questionText: "Te descurci să îți gestionezi banii?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [{ majorText: "Matematică" }, { majorText: "Științe economice" }],
    },
    {
      questionText: "Știi ce este bine și ce este rău?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Teologie" },
        { majorText: "Medicină" },
        { majorText: "Științe militare, informații și ordine publică" },
        { majorText: "Științe politice" },
      ],
    },
    {
      questionText: "Crezi în Dumnezeu?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Teologie" },
      ],
    },
    {
      questionText: "Te orientezi după niște principii în legătură cu munca?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Teologie" },
        { majorText: "Matematică" },
      ],
    },
    {
      questionText: "Ai studiat profil real în liceu și ți-a plăcut?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Matematică" },
        { majorText: "Informatică" },
        { majorText: "Fizică" },
        { majorText: "Chimie și inginerie chimică" },
        { majorText: "Științele pământului și atmosferei" },
        { majorText: "Inginerie civilă" },
        {
          majorText: "Inginerie electrică, electronică și telecomunicații",
        },
        { majorText: "Inginerie geologică, mine, petrol și gaze" },
        { majorText: "Ingineria transporturilor" },
        { majorText: "Ingineria resurselor vegetale și animale" },
        {
          majorText:
            "Ingineria sistemelor, calculatoare și tehnologia informației",
        },
        {
          majorText:
            "Inginerie mecanincă, mecatronică, inginerie industrială și management",
        },
        { majorText: "Biologie" },
        { majorText: "Biochimie" },
        { majorText: "Medicină" },
        { majorText: "Medicină veterinară" },
        { majorText: "Medicină dentară" },
        { majorText: "Farmacie" },
        { majorText: "Științe economice" },
      ],
    },
    {
      questionText: "Ai studiat profil uman în liceu și ți-a plăcut?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Științe juridice" },
        { majorText: "Științe administrative" },
        { majorText: "Științe ale comunicării" },
        { majorText: "Sociologie" },
        { majorText: "Științe politice" },
        {
          majorText: "Științe militare, informații și ordine publică",
        },
        { majorText: "Științe economice" },
        { majorText: "Psihologie și științe comportamentale" },
        { majorText: "Filologie" },
        { majorText: "Filosofie" },
        { majorText: "Istorie" },
        { majorText: "Teologie" },
        { majorText: "Studii culturale" },
        { majorText: "Arhitectură și urbanism" },
        { majorText: "Arte" },
        { majorText: "Știința sportului și educației fizice" },
      ],
    },
    {
      questionText: "Îți plac animalele?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Ingineria resurselor vegetale și animale" },
        { majorText: "Biologie" },
        { majorText: "Medicină veterinară" },
      ],
    },
    {
      questionText: "Îți plac sporturile extreme?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Știința sportului și educației fizice" },
        { majorText: "Fizicăe" },
      ],
    },
    {
      questionText: "Dulapul tău cu haine este organizat?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Matematică" },
        { majorText: "Informatică" },
        { majorText: "Științe militare, informații și ordine publică" },
        { majorText: "Arhitectură și urbanism" },
        { majorText: "Știința sportului și educației fizice" },
      ],
    },
    {
      questionText: "Ai o relație bună cu autoritatea?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Științe politice" },
        { majorText: "Științe juridice" },
        { majorText: "Științe militare, informații și ordine publică" },
        { majorText: "Științe administrative" },
        { majorText: "Teologie" },
      ],
    },
    {
      questionText: "Ai construit vreodată ceva și ți-a plăcut?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Arte" },
        { majorText: "Arhitectură și urbanism" },
        { majorText: "Fizică" },
        { majorText: "Ingineria transporturilor" },
        {
          majorText:
            "Ingineria sistemelor, calculatoare și tehnologia informației",
        },
        {
          majorText:
            "Inginerie mecanincă, mecatronică, inginerie industrială și management",
        },
        { majorText: "Inginerie civilă" },
      ],
    },
    {
      questionText: "Ai o rutină de îngrijire?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Medicină dentară" },
        { majorText: "Medicină" },
        { majorText: "Biochimie" },
        { majorText: "Chimie și inginerie chimică" },
        { majorText: "Farmacie" },
      ],
    },
    {
      questionText: "Ai o gândire logică?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Matematică" },
        { majorText: "Informatică" },
        { majorText: "Fizică" },
        { majorText: "Chimie și inginerie chimică" },
        { majorText: "Științele pământului și atmosferei" },
        { majorText: "Inginerie civilă" },
        {
          majorText: "Inginerie electrică, electronică și telecomunicații",
        },
        { majorText: "Inginerie geologică, mine, petrol și gaze" },
        { majorText: "Ingineria transporturilor" },
        { majorText: "Ingineria resurselor vegetale și animale" },
        {
          majorText:
            "Ingineria sistemelor, calculatoare și tehnologia informației",
        },
        {
          majorText:
            "Inginerie mecanincă, mecatronică, inginerie industrială și management",
        },
        { majorText: "Biologie" },
        { majorText: "Biochimie" },
        { majorText: "Medicină" },
        { majorText: "Medicină veterinară" },
        { majorText: "Medicină dentară" },
        { majorText: "Farmacie" },
        { majorText: "Științe economice" },
      ],
    },
    {
      questionText: "Ti-ar plăcea să faci experimente într-un laborator?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Fizică" },
        { majorText: "Chimie și inginerie chimică" },
        { majorText: "Științele pământului și atmosferei" },
        { majorText: "Ingineria resurselor vegetale și animale" },
        { majorText: "Biologie" },
        { majorText: "Biochimie" },
        { majorText: "Medicină" },
        { majorText: "Medicină veterinară" },
        { majorText: "Medicină dentară" },
        { majorText: "Farmacie" },
      ],
    },
    {
      questionText: "Te simți îndemânatic când folosești un computer?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [{ majorText: "Informatică" }],
    },
    {
      questionText: "Îti place viața la țară?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Filosofie" },
        { majorText: "Științele pământului și atmosferei" },
        { majorText: "Ingineria resurselor vegetale și animale" },
        { majorText: "Biologie" },
        { majorText: "Biochimie" },
        { majorText: "Medicină veterinară" },
        { majorText: "Teologie" },
        { majorText: "Ingineria resurselor vegetale și animale" },
      ],
    },
    {
      questionText: "Ți-ar plăcea să fii vânător de uragane?",
      answerOptions: [{ answerText: "Da" }, { answerText: "Nu" }],
      majors: [
        { majorText: "Științe militare, informații și ordine publică" },
        { majorText: "Științele pământului și atmosferei" },
        { majorText: "Știința sportului și educației fizice" },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [ramuri, setRamuri] = useState([
    { majorText: "Matematică", majorScore: 0 },
    { majorText: "Informatică", majorScore: 0 },
    { majorText: "Fizică", majorScore: 0 },
    { majorText: "Chimie și inginerie chimică", majorScore: 0 },
    { majorText: "Științele pământului și atmosferei", majorScore: 0 },
    { majorText: "Inginerie civilă", majorScore: 0 },
    {
      majorText: "Inginerie electrică, electronică și telecomunicații",
      majorScore: 0,
    },
    { majorText: "Inginerie geologică, mine, petrol și gaze", majorScore: 0 },
    { majorText: "Ingineria transporturilor", majorScore: 0 },
    { majorText: "Ingineria resurselor vegetale și animale", majorScore: 0 },
    {
      majorText: "Ingineria sistemelor, calculatoare și tehnologia informației",
      majorScore: 0,
    },
    {
      majorText:
        "Inginerie mecanincă, mecatronică, inginerie industrială și management",
      majorScore: 0,
    },
    { majorText: "Biologie", majorScore: 0 },
    { majorText: "Biochimie", majorScore: 0 },
    { majorText: "Medicină", majorScore: 0 },
    { majorText: "Medicină veterinară", majorScore: 0 },
    { majorText: "Medicină dentară", majorScore: 0 },
    { majorText: "Farmacie", majorScore: 0 },
    { majorText: "Științe juridice", majorScore: 0 },
    { majorText: "Științe administrative", majorScore: 0 },
    { majorText: "Științe ale comunicării", majorScore: 0 },
    { majorText: "Sociologie", majorScore: 0 },
    { majorText: "Științe politice", majorScore: 0 },
    {
      majorText: "Științe militare, informații și ordine publică",
      majorScore: 0,
    },
    { majorText: "Științe economice", majorScore: 0 },
    { majorText: "Psihologie și științe comportamentale", majorScore: 0 },
    { majorText: "Filologie", majorScore: 0 },
    { majorText: "Filosofie", majorScore: 0 },
    { majorText: "Istorie", majorScore: 0 },
    { majorText: "Teologie", majorScore: 0 },
    { majorText: "Studii culturale", majorScore: 0 },
    { majorText: "Arhitectură și urbanism", majorScore: 0 },
    { majorText: "Arte", majorScore: 0 },
    { majorText: "Știința sportului și educației fizice", majorScore: 0 },
  ]);

  function contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) return true;
    }
    return false;
  }

  const handleAnswerOptionClick = (answerOption) => {
    if (answerOption.answerText === "Da") {
      for (let j = 0; j < ramuri.length; j++) {
        if (
          contains(
            questions[currentQuestion].majors,
            "majorText",
            ramuri[j].majorText
          )
        ) {
          let newArr = [...ramuri];
          newArr[j].majorScore += 5;
          setRamuri(newArr);
        }
      }
    } else {
      for (let j = 0; j < ramuri.length; j++) {
        if (
          contains(
            questions[currentQuestion].majors,
            "majorText",
            ramuri[j].majorText
          )
        ) {
          let newArr = [...ramuri];
          newArr[j].majorScore -= 5;
          setRamuri(newArr);
        }
      }
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const getResultSpecializations = (id) => {
    const result = [];
    if (specializations) {
      specializations.forEach((specialization) => {
        if (specialization.ramura === id) {
          if (matches) {
            result.push(
              <div className="mb-3 shadow-sm">
                <Card border="light" bg="light">
                  <Card.Body className="d-md-flex">
                    <Card.Title
                      style={{ flexShrink: "0", width: "33%" }}
                      className="text-center p-3"
                    >
                      {specialization.specializare}
                    </Card.Title>
                    <Card.Text
                      className="d-md-flex gap-6"
                      style={{ flexShrink: "0" }}
                    >
                      <div
                        className="d-md-flex flex-column"
                        style={{ width: "350px" }}
                      >
                        <div>
                          <GrMapLocation />
                          <span>
                            {" "}
                            - {specialization.oras}, {specialization.regiune}{" "}
                          </span>
                        </div>
                        <div>
                          <FaUniversity />
                          <span> - {specialization.universitate}</span>
                        </div>
                        <div>
                          <FcGraduationCap />
                          <span> - {specialization.facultate}</span>
                        </div>
                        <div>
                          <FcTreeStructure />
                          <span> - Domeniul {specialization.domeniu}</span>
                        </div>

                        <div>
                          <FcFlowChart />
                          <span> - Ramura {specialization.ramura}</span>
                        </div>
                      </div>

                      {specialization.link &&
                      specialization.statut &&
                      specialization.numar_locuri_buget &&
                      specialization.numar_locuri_taxa &&
                      specialization.ultima_medie_buget &&
                      specialization.ultima_medie_taxa &&
                      specialization.taxa_anuala ? (
                        <div
                          className="d-md-flex flex-column"
                          style={{ width: "350px" }}
                        >
                          <div>
                            <FcLink />
                            <span>
                              {" "}
                              -{" "}
                              <a href={specialization.link}>
                                {specialization.link.replace("https://", "")}
                              </a>
                            </span>
                          </div>
                          <div>
                            {specialization.statut === "Privat" ? (
                              <FcLock />
                            ) : (
                              <FcUnlock />
                            )}
                            <span> - {specialization.statut}</span>
                          </div>
                          <div>
                            <TbListNumbers />
                            <span>
                              {" "}
                              - {specialization.numar_locuri_buget} locuri
                              buget, {specialization.numar_locuri_taxa} locuri
                              taxa
                            </span>
                          </div>
                          <div>
                            <FcSurvey />
                            <span>
                              {" "}
                              - Ultima medie la buget:{" "}
                              {specialization.ultima_medie_buget}
                            </span>
                          </div>
                          <div>
                            <FcSurvey />
                            <span>
                              {" "}
                              - Ultima medie la taxă:{" "}
                              {specialization.ultima_medie_taxa}
                            </span>
                          </div>
                          <div>
                            <BiMoney />
                            <span>
                              {" "}
                              - Taxa anuală {specialization.taxa_anuala} lei
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="d-md-flex flex-column"
                          style={{ width: "350px" }}
                        >
                          <div>
                            <FcLink />
                            <span> - Link: N/A</span>
                          </div>
                          <div>
                            {specialization.statut === "Privat" ? (
                              <FcLock />
                            ) : (
                              <FcUnlock />
                            )}
                            <span> - Statut: N/A</span>
                          </div>
                          <div>
                            <TbListNumbers />
                            <span> - Număr locuri buget/taxă: N/A</span>
                          </div>
                          <div>
                            <FcSurvey />
                            <span>
                              {" "}
                              - Ultima medie la buget: N/A
                              {specialization.ultima_medie_buget}
                            </span>
                          </div>
                          <div>
                            <FcSurvey />
                            <span> - Ultima medie la taxă: N/A</span>
                          </div>
                          <div>
                            <BiMoney />
                            <span> - Taxa anuală: N/A</span>
                          </div>
                        </div>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          } else {
            result.push(
              <div className="mb-3 shadow-sm">
                <Card border="light" bg="light">
                  <Card.Body className="d-md-flex">
                    <Card.Title
                      style={{ flexShrink: "0" }}
                      className="text-center p-3"
                    >
                      {specialization.specializare}
                    </Card.Title>
                    <Card.Text
                      className="d-md-flex gap-6"
                      style={{ flexShrink: "0" }}
                    >
                      <div className="d-md-flex flex-column">
                        <div>
                          <GrMapLocation />
                          <span>
                            {" "}
                            - {specialization.oras}, {specialization.regiune}{" "}
                          </span>
                        </div>
                        <div>
                          <FaUniversity />
                          <span> - {specialization.universitate}</span>
                        </div>
                        <div>
                          <FcGraduationCap />
                          <span> - {specialization.facultate}</span>
                        </div>
                        <div>
                          <FcTreeStructure />
                          <span> - Domeniul {specialization.domeniu}</span>
                        </div>

                        <div>
                          <FcFlowChart />
                          <span> - Ramura {specialization.ramura}</span>
                        </div>
                      </div>
                      {specialization.link &&
                      specialization.statut &&
                      specialization.numar_locuri_buget &&
                      specialization.numar_locuri_taxa &&
                      specialization.ultima_medie_buget &&
                      specialization.ultima_medie_taxa &&
                      specialization.taxa_anuala ? (
                        <div className="d-md-flex flex-column">
                          <div>
                            <FcLink />
                            <span>
                              {" "}
                              -{" "}
                              <a href={specialization.link}>
                                {specialization.link.replace("https://", "")}
                              </a>
                            </span>
                          </div>
                          <div>
                            {specialization.statut === "Privat" ? (
                              <FcLock />
                            ) : (
                              <FcUnlock />
                            )}
                            <span> - {specialization.statut}</span>
                          </div>
                          <div>
                            <TbListNumbers />
                            <span>
                              {" "}
                              - {specialization.numar_locuri_buget} locuri
                              buget, {specialization.numar_locuri_taxa} locuri
                              taxa
                            </span>
                          </div>
                          <div>
                            <FcSurvey />
                            <span>
                              {" "}
                              - Ultima medie la buget:{" "}
                              {specialization.ultima_medie_buget}
                            </span>
                          </div>
                          <div>
                            <FcSurvey />
                            <span>
                              {" "}
                              - Ultima medie la taxă:{" "}
                              {specialization.ultima_medie_taxa}
                            </span>
                          </div>
                          <div>
                            <BiMoney />
                            <span>
                              {" "}
                              - Taxa anuală {specialization.taxa_anuala} lei
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="d-md-flex flex-column">
                          <div>
                            <FcLink />
                            <span> - Link: N/A</span>
                          </div>
                          <div>
                            {specialization.statut === "Privat" ? (
                              <FcLock />
                            ) : (
                              <FcUnlock />
                            )}
                            <span> - Statut: N/A</span>
                          </div>
                          <div>
                            <TbListNumbers />
                            <span> - Număr locuri buget/taxă: N/A</span>
                          </div>
                          <div>
                            <FcSurvey />
                            <span>
                              {" "}
                              - Ultima medie la buget: N/A
                              {specialization.ultima_medie_buget}
                            </span>
                          </div>
                          <div>
                            <FcSurvey />
                            <span> - Ultima medie la taxă: N/A</span>
                          </div>
                          <div>
                            <BiMoney />
                            <span> - Taxa anuală: N/A</span>
                          </div>
                        </div>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          }
        }
      });
    }
    return result;
  };

  const showResult = () => {
    let result = [];
    let quizResultDb = "";
    ramuri.sort((a, b) => parseInt(b.majorScore) - parseInt(a.majorScore));
    if (Math.max(...ramuri.map((x) => x.majorScore)) > 0) {
      for (let i = 0; i < 3; i++) {
        if (ramuri[i].majorScore > 0) {
          result.push(
            <Accordion.Item eventKey={i}>
              <Accordion.Header
                onClick={() => {
                  getSpecializationsFilteredRamura(ramuri[i].majorText);
                }}
              >
                {ramuri[i].majorText}
              </Accordion.Header>
              <Accordion.Body style={{ color: "black" }}>
                {getResultSpecializations(ramuri[i].majorText)}
              </Accordion.Body>
            </Accordion.Item>
          );
          quizResultDb = quizResultDb + ramuri[i].majorText + ";";
        }
      }
      if (ramuri[3].majorScore == ramuri[2].majorScore) {
        result.push(
          <Accordion.Item eventKey={3}>
            <Accordion.Header
              onClick={() => {
                getSpecializationsFilteredRamura(ramuri[3].majorText);
              }}
            >
              {ramuri[3].majorText}
            </Accordion.Header>
            <Accordion.Body style={{ color: "black" }}>
              {getResultSpecializations(ramuri[3].majorText)}
            </Accordion.Body>
          </Accordion.Item>
        );
        quizResultDb = quizResultDb + ramuri[3].majorText + ";";
      }
      if (ramuri[4].majorScore == ramuri[3].majorScore) {
        result.push(
          <Accordion.Item eventKey={3}>
            <Accordion.Header
              onClick={() => {
                getSpecializationsFilteredRamura(ramuri[4].majorText);
              }}
            >
              {ramuri[4].majorText}
            </Accordion.Header>
            <Accordion.Body style={{ color: "black" }}>
              {getResultSpecializations(ramuri[4].majorText)}
            </Accordion.Body>
          </Accordion.Item>
        );
        quizResultDb = quizResultDb + ramuri[4].majorText;
      }

      if (result != null) {
        const postData = {
          quizResult: quizResultDb,
        };

        fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/users/${currentUser.uid}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }).then((res) => res.json());
      }
      result.push(
        <div className="mt-4" style={{ textAlign: "center" }}>
          <a href="/quiz"> Reia chestionarul</a>
        </div>
      );
    } else {
      result.push(
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Reia chestionarul. Ai răspuns „nu" la toate întrebările!</div>
          <a href="/quiz"> Reia chestionarul</a>
        </div>
      );
    }
    return result;
  };

  return (
    <>
      {currentUser ? (
        <>
          <Header />
          <div
            style={{
              position: "relative",
              zIndex: "1",
              marginBottom: "120px",
              backgroundColor: "white",
            }}
            className="shadow-lg"
          >
            {showScore ? (
              <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
              >
                <div
                  style={{
                    width: "100%",
                    minHeight: "300px",
                    height: "min-content",
                    borderRadius: "15px",
                    padding: "20px",
                    boxShadow: "10px 10px 42px 0px rgba(0, 0, 0, 0.75)",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "normal",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    max-width="600"
                    height="300"
                    viewBox="0 0 511.56264 532.44842"
                    xlink="http://www.w3.org/1999/xlink"
                    style={{ paddingRight: "10px", marginTop: "2rem" }}
                  >
                    <polygon
                      points="454.49103 405.20843 454.48102 405.44842 466.49103 532.44842 378.85101 532.44842 367.49103 454.44842 362.49103 530.44842 272.49103 529.44842 282.05103 429.66839 290.18103 383.41839 290.18103 383.40838 291.401 376.44842 452.10101 376.44842 452.31103 378.96838 454.49103 405.20843"
                      fill="#2f2e41"
                    />
                    <path
                      d="M222.88285,478.83064c9.28179,1.69101,18.96019-8.76188,21.61758-23.34779,1.16327-6.38475,.78778-12.50277-.78019-17.50611l1.42323-8.40799,23.88334-113.10923s43.98031-87.97522,43.9791-103.24828c-.00111-15.27287-12.72223-22.76282-12.72223-22.76282l-17.21435,.16096-53.98264,131.84662-9.72217,97.42982-1.57289,13.36711c-3.2316,4.12897-5.74053,9.72145-6.90332,16.10621-2.65749,14.58572,2.71275,27.78048,11.99454,29.4715Z"
                      fill="#ffb6b6"
                    />
                    <polygon
                      points="397.99103 135.94842 381.99103 98.94842 329.99103 107.94842 326.49103 151.47992 397.99103 135.94842"
                      fill="#ffb6b6"
                    />
                    <polygon
                      points="397.99103 135.94842 381.99103 98.94842 329.99103 107.94842 326.49103 151.47992 397.99103 135.94842"
                      opacity=".1"
                    />
                    <path
                      d="M510.99121,212.9484s-37-69-44-76c-3.11621-3.11621-8.01465-3.15955-12.49316-2.25134l-51.50684-17.74866-17.45801-9.8092-1.15039,18.66199-57.31543,10.28748c.31836-11.38086,1.92383-15.70972,1.92383-15.70972l-21,24.56946-41,20,.02246,.18005c-3.00879,1.05029-5.86133,2.84741-8.02246,5.81995-8,11-30,145-30,145l47,10,6.39648-40.13953,4.60352,36.13953,3.5,67.5s64,55,95,35,69-19,69-19l.94824-31.28796c.6748-1.07861,1.05176-1.71204,1.05176-1.71204l-1-110.98425v-29.5321c7.61816,10.61353,16.81152,19.74109,27.5,24.01636,35,14,28-43,28-43Z"
                      fill="#e6e6e6"
                    />
                    <circle
                      cx="350.55585"
                      cy="66.61991"
                      r="47.83848"
                      fill="#ffb6b6"
                    />
                    <path
                      d="M384.87476,80.13948s4.15987-14.55954,13.51957-13.51957c9.3597,1.03997,11.43964-7.27977,9.3597-11.43964-2.07993-4.15987-6.2398-24.95921-6.2398-24.95921,0,0,2.07993-14.55954-10.39967-16.63947-12.4796-2.07993-16.63947-4.15987-18.71941-8.31974-2.07993-4.15987-33.27894-8.31974-43.67861-2.07993-10.39967,6.2398-18.71941,18.2117-25.99917,21.58546-7.27977,3.37375-13.51957,9.61355-9.3597,20.01322,4.15987,10.39967,10.19286,30.7392,10.19286,30.7392,0,0,10.60648-3.70006,12.68641,2.53974,2.07993,6.2398-6.2398-2.07993,4.15987-18.71941,10.39967-16.63947,10.39967-33.27894,27.03914-27.03914,16.63947,6.2398,35.35888,4.15987,33.27894,16.63947-2.07993,12.4796,4.15987,31.19901,4.15987,31.19901Z"
                      fill="#2f2e41"
                    />
                    <g>
                      <path
                        d="M381.94946,459.38422H18.63322c-10.27456,0-18.63322-8.35942-18.63322-18.63322V247.758c0-10.2738,8.35866-18.63322,18.63322-18.63322H381.94946c10.27456,0,18.63322,8.35942,18.63322,18.63322v192.993c0,10.2738-8.35866,18.63322-18.63322,18.63322Z"
                        fill="#fff"
                      />
                      <path
                        d="M381.94946,459.38422H18.63322c-10.27456,0-18.63322-8.35942-18.63322-18.63322V247.758c0-10.2738,8.35866-18.63322,18.63322-18.63322H381.94946c10.27456,0,18.63322,8.35942,18.63322,18.63322v192.993c0,10.2738-8.35866,18.63322-18.63322,18.63322ZM18.63322,232.23639c-8.55846,0-15.52161,6.96315-15.52161,15.52161v192.993c0,8.55846,6.96315,15.52161,15.52161,15.52161H381.94946c8.55846,0,15.52161-6.96315,15.52161-15.52161V247.758c0-8.55846-6.96315-15.52161-15.52161-15.52161H18.63322Z"
                        fill="#3f3d56"
                      />
                      <circle
                        cx="353.90847"
                        cy="247.79446"
                        r="4.66742"
                        fill="#3f3d56"
                      />
                      <circle
                        cx="366.35492"
                        cy="247.79446"
                        r="4.66742"
                        fill="#3f3d56"
                      />
                      <circle
                        cx="378.80138"
                        cy="247.79446"
                        r="4.66742"
                        fill="#3f3d56"
                      />
                      <path
                        d="M26.44872,323.2511c-1.28688,0-2.33371,1.04683-2.33371,2.33371,0,.62749,.24234,1.20788,.68218,1.63633,.44365,.45428,1.0248,.69738,1.65153,.69738H375.68976c1.28688,0,2.33371-1.04683,2.33371-2.33371,0-.62749-.24234-1.20788-.68218-1.63633-.44365-.45428-1.0248-.69738-1.65153-.69738H26.44872Z"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M332.12717,322.4732v6.22323H26.44872c-.85567,0-1.63358-.34233-2.19365-.91797-.57574-.56007-.91797-1.33797-.91797-2.19365,0-1.71144,1.40026-3.11161,3.11161-3.11161H332.12717Z"
                        fill="#0275d8"
                      />
                      <path
                        d="M371.80025,310.80464h-31.11614c-3.43144,0-6.22323-2.79103-6.22323-6.22323s2.79179-6.22323,6.22323-6.22323h31.11614c3.43144,0,6.22323,2.79103,6.22323,6.22323s-2.79179,6.22323-6.22323,6.22323Z"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M167.98953,278.1327H28.78243c-3.43144,0-6.22323-2.79103-6.22323-6.22323s2.79179-6.22323,6.22323-6.22323H167.98953c3.43144,0,6.22323,2.79103,6.22323,6.22323s-2.79179,6.22323-6.22323,6.22323Z"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M26.44872,393.26242c-1.28688,0-2.33371,1.04683-2.33371,2.33371,0,.62749,.24234,1.20788,.68218,1.63633,.44365,.45428,1.0248,.69738,1.65153,.69738H375.68976c1.28688,0,2.33371-1.04683,2.33371-2.33371,0-.62749-.24234-1.20788-.68218-1.63633-.44365-.45428-1.0248-.69738-1.65153-.69738H26.44872Z"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M212.33003,392.48451v6.22323H26.44872c-.85567,0-1.63358-.34233-2.19365-.91797-.57574-.56007-.91797-1.33797-.91797-2.19365,0-1.71144,1.40026-3.11161,3.11161-3.11161H212.33003Z"
                        fill="#0275d8"
                      />
                      <path
                        d="M371.80025,380.81596h-31.11614c-3.43144,0-6.22323-2.79103-6.22323-6.22323s2.79179-6.22323,6.22323-6.22323h31.11614c3.43144,0,6.22323,2.79103,6.22323,6.22323s-2.79179,6.22323-6.22323,6.22323Z"
                        fill="#e6e6e6"
                      />
                    </g>
                    <g>
                      <ellipse
                        cx="426.27357"
                        cy="70.44086"
                        rx="48.72643"
                        ry="47.69976"
                        fill="#0275d8"
                      />
                      <path
                        d="M442.81136,46.3808c-6.487,11.81215-12.97405,23.62439-19.46106,35.43659-4.13442-7.30499-8.24624-14.62285-12.39083-21.92211-1.43136-2.5209-5.32473-.25351-3.88976,2.27368,4.80448,8.46149,9.55919,16.95111,14.36367,25.41259,.82147,1.44676,3.07677,1.48035,3.8898,0,7.12599-12.9757,14.25199-25.95141,21.37798-38.92707,1.39635-2.54258-2.4924-4.81822-3.8898-2.27368Z"
                        fill="#fff"
                      />
                    </g>
                    <path
                      d="M493.53827,196.17181l-48.54724-23.22339s-1.94983-15.5437-11.05402-21.08789c-1.54779-3.6925-3.32855-7.74908-4.94598-10.96332-4-7.94879,2-22.94879-3-22.94879s-12.39122,15.77543-12,20c.30031,3.24292,2.98059,8.90472,3.5343,13.8609-6.09709,2.29949-11.01564,6.24084-14.24964,9.37903-2.79865,2.71575-3.8385,6.76755-2.74475,10.51073,3.16948,10.84703,11.09153,33.24933,22.46008,33.24933,15,0,19-3,19-3,0,0,31,39,54,42s-2.45276-47.77661-2.45276-47.77661Z"
                      fill="#ffb6b6"
                    />
                  </svg>
                  <div
                    style={{
                      color: "black",
                      width: "100%",
                    }}
                  >
                    <p
                      className="text-center"
                      style={{ fontSize: "18px", fontStyle: "italic" }}
                    >
                      Îți multumim pentru parcurgerea chestionarului. Mai jos
                      regăsești ramurile de studiu potrivite ție cu opțiunile
                      universitare aferente. Mult spor la explorat!{" "}
                    </p>
                    <Accordion className="mt-4">{showResult()}</Accordion>
                  </div>
                </div>
              </Container>
            ) : (
              <Container
                className="d-flex align-items-normal justify-content-center"
                style={{ minHeight: "100vh" }}
              >
                {matches ? (
                  <div className="d-flex flex-column">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      max-width="600px"
                      height="300px"
                      viewBox="0 0 844.67538 595.26155"
                      xlink="http://www.w3.org/1999/xlink"
                    >
                      <circle cx="431.39281" cy="548" r="46" fill="#0275d8" />
                      <path
                        d="M883.86176,743.78487c25.7345-7.72868,53.09381-15.78786,73.50313-34.161,18.23763-16.41813,30.55024-41.48912,22.99475-66.1115-7.54-24.57187-30.12421-40.95629-53.44165-49.10532-13.225-4.62188-27.06087-7.18608-40.89147-9.20037-15.03485-2.18967-30.13615-3.98373-45.23026-5.71012q-91.67724-10.48563-184.04386-12.811c-30.38456-.76525-60.76358-.74682-91.15243-.3057-27.13937.394-55.72215.38417-80.899-11.15051-19.57846-8.96979-37.348-25.28881-42.8033-46.73352-6.29728-24.75467,5.318-49.96382,21.97993-67.892,8.78265-9.45011,19.04731-17.40385,29.63621-24.71743,11.4874-7.93416,23.37539-15.30643,35.52084-22.18813a494.63414,494.63414,0,0,1,74.7667-34.4685c12.74555-4.63445,25.68047-8.63281,38.72759-12.32143,11.017-3.11469,22.06832-6.23382,32.71588-10.47748,20.58349-8.20371,40.161-22.09985,45.39464-44.88142,4.96024-21.59145-3.40305-45.03067-18.065-61.07057-16.96282-18.557-42.53949-26.69181-67.06007-28.008-27.52842-1.47765-54.42246,5.412-80.29678,14.15585-27.59673,9.326-54.59854,20.04924-82.77827,27.60322a556.95783,556.95783,0,0,1-85.19574,15.83655c-14.08227,1.49951-28.59019,3.19273-42.75626,2.04475-11.87246-.96211-23.68426-4.45375-32.43408-12.87964-7.50252-7.22477-11.97184-17.154-10.4353-27.63238.27909-1.90318,3.17022-1.09407,2.89284.79752-1.8704,12.75513,6.79991,24.50863,17.48415,30.5293,12.34817,6.95832,27.37408,6.9678,41.1218,6.172a537.82528,537.82528,0,0,0,88.51452-12.79561c28.59252-6.53059,56.16382-15.86633,83.70391-25.83908,26.15594-9.47153,52.89665-18.71579,80.84009-20.76729,24.24611-1.78007,49.75165,1.75222,70.87426,14.42313,18.56387,11.136,32.21482,29.70722,36.56451,51.01813,4.25044,20.82462-1.63632,41.785-17.4,56.31714-16.32147,15.04633-38.7007,21.47909-59.55655,27.40368-26.45223,7.51437-52.33726,16.29809-77.39248,27.7031a485.82354,485.82354,0,0,0-72.8001,40.92805c-22.24625,15.20228-44.2007,34.33058-51.23658,61.45126-3.27739,12.63313-2.67227,26.03212,2.8116,37.96461,4.87605,10.60993,12.90656,19.53469,22.26169,26.41853,22.32074,16.42443,50.45266,19.79665,77.41421,20.13212,30.28143.37678,60.56382-.64518,90.85508-.148q92.5988,1.51977,184.81863,11.27265,23.108,2.44594,46.15759,5.40711c13.82158,1.776,27.68967,3.54058,41.27849,6.69464,24.16222,5.60822,47.67389,16.39167,62.69178,36.878a61.31938,61.31938,0,0,1,11.94709,30.44593c1.05134,11.52384-1.76985,23.0693-6.98016,33.32083-11.53233,22.69042-33.13363,37.12286-56.07337,46.60471-12.28683,5.0786-25.03167,8.926-37.7516,12.74609-1.853.55651-2.64487-2.338-.79752-2.89283Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#f2f2f2"
                      />
                      <circle cx="125.89281" cy="69.5" r="24" fill="#f2f2f2" />
                      <circle cx="292.39281" cy="115" r="24" fill="#f2f2f2" />
                      <circle cx="433.39281" cy="24" r="24" fill="#f2f2f2" />
                      <circle cx="521.39281" cy="126" r="24" fill="#f2f2f2" />
                      <circle cx="402.39281" cy="244" r="24" fill="#f2f2f2" />
                      <circle cx="251.39281" cy="301" r="24" fill="#f2f2f2" />
                      <circle cx="411.39281" cy="390" r="24" fill="#f2f2f2" />
                      <circle cx="583.39281" cy="440" r="24" fill="#f2f2f2" />
                      <circle cx="784.39281" cy="429" r="24" fill="#f2f2f2" />
                      <path
                        d="M604.12763,220.37264c-71.89185.50782-130.75611,58.92987-131.77735,130.81635-.00946.66369-.01381,5.33048-.01324,11.43422a33.74778,33.74778,0,0,0,33.74387,33.746h.00007a33.76855,33.76855,0,0,0,33.76114-33.79775c-.00343-4.15211-.00551-7.02584-.00551-7.20227a64.00037,64.00037,0,1,1,98.52027,53.8794l.01171.01422s-48.02832,30.91956-62.67089,73.33545l.01245.003a94.00389,94.00389,0,0,0-3.87354,26.76794c0,3.72538.21916,36.32138.64261,62.77767a34.78649,34.78649,0,0,0,34.79009,34.22233h.00007a34.79588,34.79588,0,0,0,34.79384-35.01061c-.14706-24.22912-.22661-52.44168-.22661-54.48939,0-26.04473,25.12525-51.99475,45.76367-68.91741,23.76587-19.48694,40.86792-46.04291,47.73706-75.99909a86.7618,86.7618,0,0,0,2.49927-18.8335A132.75,132.75,0,0,0,604.12763,220.37264Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#0275d8"
                      />
                      <path
                        d="M1021.147,747.63078H178.853a1.19069,1.19069,0,0,1,0-2.38137h842.294a1.19068,1.19068,0,0,1,0,2.38137Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                      <circle
                        cx="628.44885"
                        cy="242.9959"
                        r="30"
                        fill="#2f2e41"
                      />
                      <polygon
                        points="573.012 582.129 560.753 582.129 554.92 534.841 573.015 534.841 573.012 582.129"
                        fill="#a0616a"
                      />
                      <path
                        d="M551.99554,578.62562h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H537.10868a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,551.99554,578.62562Z"
                        fill="#2f2e41"
                      />
                      <polygon
                        points="668.012 582.129 655.753 582.129 649.92 534.841 668.015 534.841 668.012 582.129"
                        fill="#a0616a"
                      />
                      <path
                        d="M646.99554,578.62562h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H632.10868a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,646.99554,578.62562Z"
                        fill="#2f2e41"
                      />
                      <circle
                        cx="623.88979"
                        cy="248.61007"
                        r="24.56103"
                        fill="#a0616a"
                      />
                      <path
                        d="M816.19123,504.7751l10.98975-25.25a31.38253,31.38253,0,0,0-6.94971-35.6,31.87322,31.87322,0,0,0-3.07031-2.67,30.93522,30.93522,0,0,0-18.98975-6.57,32.179,32.179,0,0,0-13.3999,2.98c-.36035.16-.71.33-1.07031.5-.68994.33-1.36963.69-2.02979,1.06a31.67823,31.67823,0,0,0-15.70019,23.88l-4.8501,40.64c-1.21973,3.19-44.73975,118.39-29.51953,206.34a4.46692,4.46692,0,0,0,3.81982,3.67l15.43018,2.1a4.49661,4.49661,0,0,0,5.00976-3.53l25.89014-123.41a3.50323,3.50323,0,0,1,6.79981-.23l36.58007,129.78a4.47129,4.47129,0,0,0,4.31006,3.28,5.12184,5.12184,0,0,0,.87012-.08l18.84961-3.63a4.471,4.471,0,0,0,3.63037-4.81C850.02131,682.3351,835.3011,527.60512,816.19123,504.7751Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M706.10166,421.41909A10.05576,10.05576,0,0,0,716.696,432.6225l13.72894,32.99236,10.385-15.3943-14.62937-28.97a10.11027,10.11027,0,0,0-20.07892.16852Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#a0616a"
                      />
                      <path
                        d="M800.19025,537.99553a10.05577,10.05577,0,0,0,8.42651-12.91316l28.88533-21.03846-17.39036-6.51224-24.76387,20.97687a10.11028,10.11028,0,0,0,4.84239,19.487Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#a0616a"
                      />
                      <path
                        d="M753.10188,487.61024a17.05692,17.05692,0,0,1-3.29834-.32519,16.30539,16.30539,0,0,1-11.94751-9.61621l-19.23438-23.45313a4.50075,4.50075,0,0,1,1.11109-6.68066l13.68432-8.4707a4.50007,4.50007,0,0,1,6.21533,1.49023l13.5564,22.334L779.15022,443.702A9.72146,9.72146,0,0,1,790.46,459.26356l-25.91186,23.63672A16.25271,16.25271,0,0,1,753.10188,487.61024Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M823.252,522.8827c-.03515,0-.07055,0-.10571-.001a4.50783,4.50783,0,0,1-3.31079-1.57031l-12.16626-14.19336a4.49979,4.49979,0,0,1,.92041-6.67286l22.78149-15.1875-20.63842-24.8125a9.721,9.721,0,0,1,14.8872-12.18261l25.0835,24.51269a16.52481,16.52481,0,0,1-3.67529,26.94043l-20.50122,21.75391A4.50742,4.50742,0,0,1,823.252,522.8827Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M795.30707,470.58358a4.63212,4.63212,0,0,1-.584-.03711,4.46111,4.46111,0,0,1-3.71045-3.06885l-9.14234-28.02929a3.08255,3.08255,0,0,1,1.594-3.72461l.29663-.14014c.269-.12793.5354-.25439.80737-.37549a32.57412,32.57412,0,0,1,13.603-3.023,31.327,31.327,0,0,1,17.16138,5.15674,3.13007,3.13007,0,0,1,.90136,4.29443L799.08393,468.504A4.45513,4.45513,0,0,1,795.30707,470.58358Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#e6e6e6"
                      />
                      <circle
                        cx="652.1011"
                        cy="219.78616"
                        r="9.81668"
                        fill="#2f2e41"
                      />
                      <path
                        d="M796.11115,361.36513h0a26,26,0,0,0-26,25.99994v11.00006h13.5293l6.4707-11,1.94141,11h41.05859l-11-11.00006A26,26,0,0,0,796.11115,361.36513Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M834.80883,365.43121a15.15,15.15,0,0,1,16.48081-10.39558c6.256,1.04586,11.20228,6.07455,14.14944,11.69107s4.30806,11.90252,6.28935,17.92793,4.79124,12.08362,9.79306,15.984,12.67721,4.9584,17.58966.94607a20.11809,20.11809,0,0,1-37.47706,7.18124c-2.59206-4.61172-3.26121-10.01684-4.02988-15.251s-1.7674-10.6498-4.86211-14.94043-8.88772-7.09293-13.80374-5.13859Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M515.60883,380.40755h0a33.748,33.748,0,0,1-33.74414-33.746c-.00049-6.10376.0039-10.77051.01318-11.4342a131.50724,131.50724,0,0,1,15.35889-59.90875,131.80321,131.80321,0,0,0-25.35889,75.90875c-.00928.66369-.01367,5.33044-.01318,11.4342a33.748,33.748,0,0,0,33.74414,33.746h0A33.77281,33.77281,0,0,0,538.09662,371.817,33.62247,33.62247,0,0,1,515.60883,380.40755Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                      <path
                        d="M606.415,291.47848a64.00385,64.00385,0,0,1,55.65918,89.413,63.9972,63.9972,0,1,0-107.42578-66.98523A63.87073,63.87073,0,0,1,606.415,291.47848Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                      <path
                        d="M616.79682,590.40755h0a34.78682,34.78682,0,0,1-34.79-34.22235c-.42334-26.45629-.64258-59.0523-.64258-62.77765a94.00389,94.00389,0,0,1,3.87354-26.76794l-.01221-.003a95.069,95.069,0,0,1,5.49414-12.70087,110.04745,110.04745,0,0,0-15.49414,28.70087l.01221.003a94.00389,94.00389,0,0,0-3.87354,26.76794c0,3.72535.21924,36.32136.64258,62.77765a34.78682,34.78682,0,0,0,34.79,34.22235h0a34.80287,34.80287,0,0,0,33.40185-25.04846A34.66005,34.66005,0,0,1,616.79682,590.40755Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                      <polygon
                        points="126.541 582.585 138.8 582.584 144.633 535.296 126.538 535.297 126.541 582.585"
                        fill="#ffb8b8"
                      />
                      <path
                        d="M301.576,731.45065H340.1067a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H316.46283A14.88686,14.88686,0,0,1,301.576,731.45066v0A0,0,0,0,1,301.576,731.45065Z"
                        transform="translate(464.05409 1325.40429) rotate(179.99738)"
                        fill="#2f2e41"
                      />
                      <polygon
                        points="82.541 582.585 94.8 582.584 100.633 535.296 82.538 535.297 82.541 582.585"
                        fill="#ffb8b8"
                      />
                      <path
                        d="M257.576,731.45065H296.1067a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H272.46283A14.88686,14.88686,0,0,1,257.576,731.45066v0A0,0,0,0,1,257.576,731.45065Z"
                        transform="translate(376.05409 1325.4063) rotate(179.99738)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M270.91659,720.41068l-11.975-.62988a4.6735,4.6735,0,0,1-4.41851-4.967l14.31268-158.46594,65.911,17.78562,6.35023-1.73241L321.23868,712.68583a4.69622,4.69622,0,0,1-4.35816,3.94458l-12.9089.60147a4.67413,4.67413,0,0,1-4.93149-4.79557l2.339-84.19641a1.55813,1.55813,0,0,0-3.0832-.36007L275.739,716.69228a4.64568,4.64568,0,0,1-4.56913,3.7255C271.086,720.41778,271.00154,720.41575,270.91659,720.41068Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <circle
                        cx="128.74202"
                        cy="249.75879"
                        r="24.56103"
                        fill="#ffb8b8"
                      />
                      <path
                        d="M265.51193,474.28693l2.70056,58.26748.97625,21.19852a4.64221,4.64221,0,0,0,3.07432,4.17534l63.336,22.94342a4.47742,4.47742,0,0,0,1.59954.28045,4.64358,4.64358,0,0,0,4.66371-4.7881L339.2657,471.5969A36.93044,36.93044,0,0,0,308.522,435.91974c-.61263-.09345-1.23592-.18695-1.8592-.27006a36.24947,36.24947,0,0,0-29.165,9.44122,37.23612,37.23612,0,0,0-11.9859,29.196Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#ccc"
                      />
                      <path
                        d="M365.85452,569.24512a10.06355,10.06355,0,0,1-5.36877-15.22659l-21.478-28.56,18.53424-1.14707,17.55439,27.29693a10.111,10.111,0,0,1-9.24184,17.63673Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#ffb8b8"
                      />
                      <path
                        d="M350.75332,548.85022a4.64437,4.64437,0,0,1-2.54106-2.51848L315.854,469.2374a12.4634,12.4634,0,1,1,22.98438-9.64693l32.3582,77.09534a4.679,4.679,0,0,1-2.50048,6.11822l-14.36542,6.029a4.64165,4.64165,0,0,1-3.57741.01724Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#ccc"
                      />
                      <path
                        d="M298.50776,546.13086,329.587,486.62205a4.87826,4.87826,0,0,1,6.57494-2.06344l45.11152,23.5601a4.87826,4.87826,0,0,1,2.06343,6.57494l-31.07927,59.50881a4.87827,4.87827,0,0,1-6.57494,2.06344L300.5712,552.7058A4.87826,4.87826,0,0,1,298.50776,546.13086Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                      <path
                        d="M319.35062,518.94278a10.06358,10.06358,0,0,0-15.517-4.46026l-29.77845-19.75406-.05061,18.56963L302.2904,529.21a10.111,10.111,0,0,0,17.06022-10.26718Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#ffb8b8"
                      />
                      <path
                        d="M281.7006,523.11883l-24.33677-19.27776a17.16326,17.16326,0,0,1-7.82343-27.13518l22.09715-28.95951a10.096,10.096,0,0,1,17.1296,10.28435l-17.48384,28.6,25.694,12.18686a4.67363,4.67363,0,0,1,1.94814,6.71958l-10.37175,16.41406a4.682,4.682,0,0,1-3.16671,2.1111c-.02565.00448-.05149.00846-.0773.0123A4.69555,4.69555,0,0,1,281.7006,523.11883Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#ccc"
                      />
                      <path
                        d="M287.84537,418.57447a2.13479,2.13479,0,0,1,1.85636-2.81905,4.93046,4.93046,0,0,1,3.4761,1.71495,13.8334,13.8334,0,0,0,3.07115,2.63711c1.18812.59889,2.79953.51354,3.47685-.62824.63605-1.07221.20023-2.508-.18482-3.75347a36.90711,36.90711,0,0,1-1.62991-9.77c-.11092-3.70032.41115-7.562,2.45972-10.44807,2.64387-3.72475,7.37142-5.13883,11.84544-5.0363s8.87547,1.48362,13.30713,2.35665c1.52992.30139,3.32826.4555,4.35153-.73025,1.08805-1.26082.68844-3.3014.22563-5.00376-1.20094-4.41743-2.475-8.98461-5.26525-12.55224a18.89839,18.89839,0,0,0-12.06081-6.79014,28.93848,28.93848,0,0,0-13.46236,1.52838,36.09628,36.09628,0,0,0-17.68285,12.3186,29.23592,29.23592,0,0,0-5.57809,21.60019,26.66712,26.66712,0,0,0,9.88579,16.85462Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M598.92043,735.14922a45.99375,45.99375,0,0,1-17.07033-71.4888,45.99715,45.99715,0,1,0,62.56892,66.464A45.96919,45.96919,0,0,1,598.92043,735.14922Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                    </svg>
                    <div
                      style={{
                        // maxWidth: "600px",
                        width: "600px",
                        minHeight: "300px",
                        height: "min-content",
                        borderRadius: "15px",
                        padding: "20px",
                        boxShadow: "10px 10px 42px 0px rgba(0, 0, 0, 0.75)",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ marginBottom: "20px", color: "black" }}>
                          <span
                            className="text-center"
                            style={{
                              fontSize: "25px",
                              color: "black",
                              fontStyle: "italic",
                            }}
                          >
                            Întrebarea {currentQuestion + 1}/{questions.length}
                          </span>
                        </div>
                        <div
                          style={{
                            marginBottom: "12px",
                            color: "black",
                            fontSize: "20px",
                          }}
                        >
                          {questions[currentQuestion].questionText}
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {questions[currentQuestion].answerOptions.map(
                          (answerOption) => (
                            <Button
                              variant="outline-dark"
                              style={{ margin: "10px", width: "70%" }}
                              onClick={() =>
                                handleAnswerOptionClick(answerOption)
                              }
                            >
                              {answerOption.answerText}
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      max-width="400px"
                      height="200px"
                      viewBox="0 0 844.67538 595.26155"
                      xlink="http://www.w3.org/1999/xlink"
                    >
                      <circle cx="431.39281" cy="548" r="46" fill="#0275d8" />
                      <path
                        d="M883.86176,743.78487c25.7345-7.72868,53.09381-15.78786,73.50313-34.161,18.23763-16.41813,30.55024-41.48912,22.99475-66.1115-7.54-24.57187-30.12421-40.95629-53.44165-49.10532-13.225-4.62188-27.06087-7.18608-40.89147-9.20037-15.03485-2.18967-30.13615-3.98373-45.23026-5.71012q-91.67724-10.48563-184.04386-12.811c-30.38456-.76525-60.76358-.74682-91.15243-.3057-27.13937.394-55.72215.38417-80.899-11.15051-19.57846-8.96979-37.348-25.28881-42.8033-46.73352-6.29728-24.75467,5.318-49.96382,21.97993-67.892,8.78265-9.45011,19.04731-17.40385,29.63621-24.71743,11.4874-7.93416,23.37539-15.30643,35.52084-22.18813a494.63414,494.63414,0,0,1,74.7667-34.4685c12.74555-4.63445,25.68047-8.63281,38.72759-12.32143,11.017-3.11469,22.06832-6.23382,32.71588-10.47748,20.58349-8.20371,40.161-22.09985,45.39464-44.88142,4.96024-21.59145-3.40305-45.03067-18.065-61.07057-16.96282-18.557-42.53949-26.69181-67.06007-28.008-27.52842-1.47765-54.42246,5.412-80.29678,14.15585-27.59673,9.326-54.59854,20.04924-82.77827,27.60322a556.95783,556.95783,0,0,1-85.19574,15.83655c-14.08227,1.49951-28.59019,3.19273-42.75626,2.04475-11.87246-.96211-23.68426-4.45375-32.43408-12.87964-7.50252-7.22477-11.97184-17.154-10.4353-27.63238.27909-1.90318,3.17022-1.09407,2.89284.79752-1.8704,12.75513,6.79991,24.50863,17.48415,30.5293,12.34817,6.95832,27.37408,6.9678,41.1218,6.172a537.82528,537.82528,0,0,0,88.51452-12.79561c28.59252-6.53059,56.16382-15.86633,83.70391-25.83908,26.15594-9.47153,52.89665-18.71579,80.84009-20.76729,24.24611-1.78007,49.75165,1.75222,70.87426,14.42313,18.56387,11.136,32.21482,29.70722,36.56451,51.01813,4.25044,20.82462-1.63632,41.785-17.4,56.31714-16.32147,15.04633-38.7007,21.47909-59.55655,27.40368-26.45223,7.51437-52.33726,16.29809-77.39248,27.7031a485.82354,485.82354,0,0,0-72.8001,40.92805c-22.24625,15.20228-44.2007,34.33058-51.23658,61.45126-3.27739,12.63313-2.67227,26.03212,2.8116,37.96461,4.87605,10.60993,12.90656,19.53469,22.26169,26.41853,22.32074,16.42443,50.45266,19.79665,77.41421,20.13212,30.28143.37678,60.56382-.64518,90.85508-.148q92.5988,1.51977,184.81863,11.27265,23.108,2.44594,46.15759,5.40711c13.82158,1.776,27.68967,3.54058,41.27849,6.69464,24.16222,5.60822,47.67389,16.39167,62.69178,36.878a61.31938,61.31938,0,0,1,11.94709,30.44593c1.05134,11.52384-1.76985,23.0693-6.98016,33.32083-11.53233,22.69042-33.13363,37.12286-56.07337,46.60471-12.28683,5.0786-25.03167,8.926-37.7516,12.74609-1.853.55651-2.64487-2.338-.79752-2.89283Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#f2f2f2"
                      />
                      <circle cx="125.89281" cy="69.5" r="24" fill="#f2f2f2" />
                      <circle cx="292.39281" cy="115" r="24" fill="#f2f2f2" />
                      <circle cx="433.39281" cy="24" r="24" fill="#f2f2f2" />
                      <circle cx="521.39281" cy="126" r="24" fill="#f2f2f2" />
                      <circle cx="402.39281" cy="244" r="24" fill="#f2f2f2" />
                      <circle cx="251.39281" cy="301" r="24" fill="#f2f2f2" />
                      <circle cx="411.39281" cy="390" r="24" fill="#f2f2f2" />
                      <circle cx="583.39281" cy="440" r="24" fill="#f2f2f2" />
                      <circle cx="784.39281" cy="429" r="24" fill="#f2f2f2" />
                      <path
                        d="M604.12763,220.37264c-71.89185.50782-130.75611,58.92987-131.77735,130.81635-.00946.66369-.01381,5.33048-.01324,11.43422a33.74778,33.74778,0,0,0,33.74387,33.746h.00007a33.76855,33.76855,0,0,0,33.76114-33.79775c-.00343-4.15211-.00551-7.02584-.00551-7.20227a64.00037,64.00037,0,1,1,98.52027,53.8794l.01171.01422s-48.02832,30.91956-62.67089,73.33545l.01245.003a94.00389,94.00389,0,0,0-3.87354,26.76794c0,3.72538.21916,36.32138.64261,62.77767a34.78649,34.78649,0,0,0,34.79009,34.22233h.00007a34.79588,34.79588,0,0,0,34.79384-35.01061c-.14706-24.22912-.22661-52.44168-.22661-54.48939,0-26.04473,25.12525-51.99475,45.76367-68.91741,23.76587-19.48694,40.86792-46.04291,47.73706-75.99909a86.7618,86.7618,0,0,0,2.49927-18.8335A132.75,132.75,0,0,0,604.12763,220.37264Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#0275d8"
                      />
                      <path
                        d="M1021.147,747.63078H178.853a1.19069,1.19069,0,0,1,0-2.38137h842.294a1.19068,1.19068,0,0,1,0,2.38137Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                      <circle
                        cx="628.44885"
                        cy="242.9959"
                        r="30"
                        fill="#2f2e41"
                      />
                      <polygon
                        points="573.012 582.129 560.753 582.129 554.92 534.841 573.015 534.841 573.012 582.129"
                        fill="#a0616a"
                      />
                      <path
                        d="M551.99554,578.62562h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H537.10868a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,551.99554,578.62562Z"
                        fill="#2f2e41"
                      />
                      <polygon
                        points="668.012 582.129 655.753 582.129 649.92 534.841 668.015 534.841 668.012 582.129"
                        fill="#a0616a"
                      />
                      <path
                        d="M646.99554,578.62562h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H632.10868a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,646.99554,578.62562Z"
                        fill="#2f2e41"
                      />
                      <circle
                        cx="623.88979"
                        cy="248.61007"
                        r="24.56103"
                        fill="#a0616a"
                      />
                      <path
                        d="M816.19123,504.7751l10.98975-25.25a31.38253,31.38253,0,0,0-6.94971-35.6,31.87322,31.87322,0,0,0-3.07031-2.67,30.93522,30.93522,0,0,0-18.98975-6.57,32.179,32.179,0,0,0-13.3999,2.98c-.36035.16-.71.33-1.07031.5-.68994.33-1.36963.69-2.02979,1.06a31.67823,31.67823,0,0,0-15.70019,23.88l-4.8501,40.64c-1.21973,3.19-44.73975,118.39-29.51953,206.34a4.46692,4.46692,0,0,0,3.81982,3.67l15.43018,2.1a4.49661,4.49661,0,0,0,5.00976-3.53l25.89014-123.41a3.50323,3.50323,0,0,1,6.79981-.23l36.58007,129.78a4.47129,4.47129,0,0,0,4.31006,3.28,5.12184,5.12184,0,0,0,.87012-.08l18.84961-3.63a4.471,4.471,0,0,0,3.63037-4.81C850.02131,682.3351,835.3011,527.60512,816.19123,504.7751Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M706.10166,421.41909A10.05576,10.05576,0,0,0,716.696,432.6225l13.72894,32.99236,10.385-15.3943-14.62937-28.97a10.11027,10.11027,0,0,0-20.07892.16852Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#a0616a"
                      />
                      <path
                        d="M800.19025,537.99553a10.05577,10.05577,0,0,0,8.42651-12.91316l28.88533-21.03846-17.39036-6.51224-24.76387,20.97687a10.11028,10.11028,0,0,0,4.84239,19.487Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#a0616a"
                      />
                      <path
                        d="M753.10188,487.61024a17.05692,17.05692,0,0,1-3.29834-.32519,16.30539,16.30539,0,0,1-11.94751-9.61621l-19.23438-23.45313a4.50075,4.50075,0,0,1,1.11109-6.68066l13.68432-8.4707a4.50007,4.50007,0,0,1,6.21533,1.49023l13.5564,22.334L779.15022,443.702A9.72146,9.72146,0,0,1,790.46,459.26356l-25.91186,23.63672A16.25271,16.25271,0,0,1,753.10188,487.61024Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M823.252,522.8827c-.03515,0-.07055,0-.10571-.001a4.50783,4.50783,0,0,1-3.31079-1.57031l-12.16626-14.19336a4.49979,4.49979,0,0,1,.92041-6.67286l22.78149-15.1875-20.63842-24.8125a9.721,9.721,0,0,1,14.8872-12.18261l25.0835,24.51269a16.52481,16.52481,0,0,1-3.67529,26.94043l-20.50122,21.75391A4.50742,4.50742,0,0,1,823.252,522.8827Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M795.30707,470.58358a4.63212,4.63212,0,0,1-.584-.03711,4.46111,4.46111,0,0,1-3.71045-3.06885l-9.14234-28.02929a3.08255,3.08255,0,0,1,1.594-3.72461l.29663-.14014c.269-.12793.5354-.25439.80737-.37549a32.57412,32.57412,0,0,1,13.603-3.023,31.327,31.327,0,0,1,17.16138,5.15674,3.13007,3.13007,0,0,1,.90136,4.29443L799.08393,468.504A4.45513,4.45513,0,0,1,795.30707,470.58358Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#e6e6e6"
                      />
                      <circle
                        cx="652.1011"
                        cy="219.78616"
                        r="9.81668"
                        fill="#2f2e41"
                      />
                      <path
                        d="M796.11115,361.36513h0a26,26,0,0,0-26,25.99994v11.00006h13.5293l6.4707-11,1.94141,11h41.05859l-11-11.00006A26,26,0,0,0,796.11115,361.36513Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M834.80883,365.43121a15.15,15.15,0,0,1,16.48081-10.39558c6.256,1.04586,11.20228,6.07455,14.14944,11.69107s4.30806,11.90252,6.28935,17.92793,4.79124,12.08362,9.79306,15.984,12.67721,4.9584,17.58966.94607a20.11809,20.11809,0,0,1-37.47706,7.18124c-2.59206-4.61172-3.26121-10.01684-4.02988-15.251s-1.7674-10.6498-4.86211-14.94043-8.88772-7.09293-13.80374-5.13859Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M515.60883,380.40755h0a33.748,33.748,0,0,1-33.74414-33.746c-.00049-6.10376.0039-10.77051.01318-11.4342a131.50724,131.50724,0,0,1,15.35889-59.90875,131.80321,131.80321,0,0,0-25.35889,75.90875c-.00928.66369-.01367,5.33044-.01318,11.4342a33.748,33.748,0,0,0,33.74414,33.746h0A33.77281,33.77281,0,0,0,538.09662,371.817,33.62247,33.62247,0,0,1,515.60883,380.40755Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                      <path
                        d="M606.415,291.47848a64.00385,64.00385,0,0,1,55.65918,89.413,63.9972,63.9972,0,1,0-107.42578-66.98523A63.87073,63.87073,0,0,1,606.415,291.47848Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                      <path
                        d="M616.79682,590.40755h0a34.78682,34.78682,0,0,1-34.79-34.22235c-.42334-26.45629-.64258-59.0523-.64258-62.77765a94.00389,94.00389,0,0,1,3.87354-26.76794l-.01221-.003a95.069,95.069,0,0,1,5.49414-12.70087,110.04745,110.04745,0,0,0-15.49414,28.70087l.01221.003a94.00389,94.00389,0,0,0-3.87354,26.76794c0,3.72535.21924,36.32136.64258,62.77765a34.78682,34.78682,0,0,0,34.79,34.22235h0a34.80287,34.80287,0,0,0,33.40185-25.04846A34.66005,34.66005,0,0,1,616.79682,590.40755Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                      <polygon
                        points="126.541 582.585 138.8 582.584 144.633 535.296 126.538 535.297 126.541 582.585"
                        fill="#ffb8b8"
                      />
                      <path
                        d="M301.576,731.45065H340.1067a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H316.46283A14.88686,14.88686,0,0,1,301.576,731.45066v0A0,0,0,0,1,301.576,731.45065Z"
                        transform="translate(464.05409 1325.40429) rotate(179.99738)"
                        fill="#2f2e41"
                      />
                      <polygon
                        points="82.541 582.585 94.8 582.584 100.633 535.296 82.538 535.297 82.541 582.585"
                        fill="#ffb8b8"
                      />
                      <path
                        d="M257.576,731.45065H296.1067a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H272.46283A14.88686,14.88686,0,0,1,257.576,731.45066v0A0,0,0,0,1,257.576,731.45065Z"
                        transform="translate(376.05409 1325.4063) rotate(179.99738)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M270.91659,720.41068l-11.975-.62988a4.6735,4.6735,0,0,1-4.41851-4.967l14.31268-158.46594,65.911,17.78562,6.35023-1.73241L321.23868,712.68583a4.69622,4.69622,0,0,1-4.35816,3.94458l-12.9089.60147a4.67413,4.67413,0,0,1-4.93149-4.79557l2.339-84.19641a1.55813,1.55813,0,0,0-3.0832-.36007L275.739,716.69228a4.64568,4.64568,0,0,1-4.56913,3.7255C271.086,720.41778,271.00154,720.41575,270.91659,720.41068Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <circle
                        cx="128.74202"
                        cy="249.75879"
                        r="24.56103"
                        fill="#ffb8b8"
                      />
                      <path
                        d="M265.51193,474.28693l2.70056,58.26748.97625,21.19852a4.64221,4.64221,0,0,0,3.07432,4.17534l63.336,22.94342a4.47742,4.47742,0,0,0,1.59954.28045,4.64358,4.64358,0,0,0,4.66371-4.7881L339.2657,471.5969A36.93044,36.93044,0,0,0,308.522,435.91974c-.61263-.09345-1.23592-.18695-1.8592-.27006a36.24947,36.24947,0,0,0-29.165,9.44122,37.23612,37.23612,0,0,0-11.9859,29.196Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#ccc"
                      />
                      <path
                        d="M365.85452,569.24512a10.06355,10.06355,0,0,1-5.36877-15.22659l-21.478-28.56,18.53424-1.14707,17.55439,27.29693a10.111,10.111,0,0,1-9.24184,17.63673Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#ffb8b8"
                      />
                      <path
                        d="M350.75332,548.85022a4.64437,4.64437,0,0,1-2.54106-2.51848L315.854,469.2374a12.4634,12.4634,0,1,1,22.98438-9.64693l32.3582,77.09534a4.679,4.679,0,0,1-2.50048,6.11822l-14.36542,6.029a4.64165,4.64165,0,0,1-3.57741.01724Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#ccc"
                      />
                      <path
                        d="M298.50776,546.13086,329.587,486.62205a4.87826,4.87826,0,0,1,6.57494-2.06344l45.11152,23.5601a4.87826,4.87826,0,0,1,2.06343,6.57494l-31.07927,59.50881a4.87827,4.87827,0,0,1-6.57494,2.06344L300.5712,552.7058A4.87826,4.87826,0,0,1,298.50776,546.13086Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                      <path
                        d="M319.35062,518.94278a10.06358,10.06358,0,0,0-15.517-4.46026l-29.77845-19.75406-.05061,18.56963L302.2904,529.21a10.111,10.111,0,0,0,17.06022-10.26718Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#ffb8b8"
                      />
                      <path
                        d="M281.7006,523.11883l-24.33677-19.27776a17.16326,17.16326,0,0,1-7.82343-27.13518l22.09715-28.95951a10.096,10.096,0,0,1,17.1296,10.28435l-17.48384,28.6,25.694,12.18686a4.67363,4.67363,0,0,1,1.94814,6.71958l-10.37175,16.41406a4.682,4.682,0,0,1-3.16671,2.1111c-.02565.00448-.05149.00846-.0773.0123A4.69555,4.69555,0,0,1,281.7006,523.11883Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#ccc"
                      />
                      <path
                        d="M287.84537,418.57447a2.13479,2.13479,0,0,1,1.85636-2.81905,4.93046,4.93046,0,0,1,3.4761,1.71495,13.8334,13.8334,0,0,0,3.07115,2.63711c1.18812.59889,2.79953.51354,3.47685-.62824.63605-1.07221.20023-2.508-.18482-3.75347a36.90711,36.90711,0,0,1-1.62991-9.77c-.11092-3.70032.41115-7.562,2.45972-10.44807,2.64387-3.72475,7.37142-5.13883,11.84544-5.0363s8.87547,1.48362,13.30713,2.35665c1.52992.30139,3.32826.4555,4.35153-.73025,1.08805-1.26082.68844-3.3014.22563-5.00376-1.20094-4.41743-2.475-8.98461-5.26525-12.55224a18.89839,18.89839,0,0,0-12.06081-6.79014,28.93848,28.93848,0,0,0-13.46236,1.52838,36.09628,36.09628,0,0,0-17.68285,12.3186,29.23592,29.23592,0,0,0-5.57809,21.60019,26.66712,26.66712,0,0,0,9.88579,16.85462Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#2f2e41"
                      />
                      <path
                        d="M598.92043,735.14922a45.99375,45.99375,0,0,1-17.07033-71.4888,45.99715,45.99715,0,1,0,62.56892,66.464A45.96919,45.96919,0,0,1,598.92043,735.14922Z"
                        transform="translate(-177.66231 -152.36922)"
                        fill="#3f3d56"
                      />
                    </svg>
                    <div
                      style={{
                        // maxWidth: "400px",
                        width: "100%",
                        minHeight: "300px",
                        height: "min-content",
                        borderRadius: "15px",
                        padding: "20px",
                        boxShadow: "10px 10px 42px 0px rgba(0, 0, 0, 0.75)",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        backgroundColor: "whitesmoke",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ marginBottom: "20px", color: "black" }}>
                          <span
                            className="text-center"
                            style={{
                              fontSize: "25px",
                              color: "black",
                              fontStyle: "italic",
                            }}
                          >
                            Întrebarea {currentQuestion + 1}/{questions.length}
                          </span>
                        </div>
                        <div
                          style={{
                            marginBottom: "12px",
                            color: "black",
                            fontSize: "20px",
                          }}
                        >
                          {questions[currentQuestion].questionText}
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {questions[currentQuestion].answerOptions.map(
                          (answerOption) => (
                            <Button
                              variant="outline-dark"
                              style={{ margin: "10px", width: "70%" }}
                              onClick={() =>
                                handleAnswerOptionClick(answerOption)
                              }
                            >
                              {answerOption.answerText}
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Container>
            )}
          </div>
          <FooterQuiz />
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
