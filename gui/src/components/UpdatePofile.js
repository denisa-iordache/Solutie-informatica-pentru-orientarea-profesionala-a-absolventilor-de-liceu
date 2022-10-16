import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Modal, ListGroup, ButtonGroup } from "react-bootstrap";
import { useAuthentication } from "../context/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Footer from "./Footer";
import Header from "./Header";
import Chart from "./Chart";
import Workbook from "react-excel-workbook";

export default function UpdatePofile() {
  const nameRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword, upload } =
    useAuthentication();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [users, setUsers] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [specializations, setSpecializations] = useState([]);
  const [ramuri, setRamuri] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (ramuri[3] || (ramuri[3] && ramuri[4])) {
      fetch(
        `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/specializationsTotalRamuraSomeFields/${ramuri[0]}/${ramuri[1]}/${ramuri[2]}/${ramuri[3]}/${ramuri[4]}`,
        {
          method: "GET",
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setSpecializations(data);
        });
    } else {
      fetch(
        `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/specializationsTotalRamuraSomeFields/${ramuri[0]}/${ramuri[1]}/${ramuri[2]}`,
        {
          method: "GET",
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setSpecializations(data);
        });
    }
  }, [ramuri]);

  const splitSpecializations = () => {
    const r1 = [];
    const r2 = [];
    const r3 = [];
    const r4 = [];
    const r5 = [];
    if (specializations) {
      specializations.forEach((specialization) => {
        if (ramuri[3] && ramuri[4]) {
          if (specialization.ramura === ramuri[0]) {
            r1.push(specialization);
          } else if (specialization.ramura === ramuri[1]) {
            r2.push(specialization);
          } else if (specialization.ramura === ramuri[2]) {
            r3.push(specialization);
          } else if (specialization.ramura === ramuri[3]) {
            r4.push(specialization);
          } else if (specialization.ramura === ramuri[4]) {
            r5.push(specialization);
          }
        } else if (ramuri[3]) {
          if (specialization.ramura === ramuri[0]) {
            r1.push(specialization);
          } else if (specialization.ramura === ramuri[1]) {
            r2.push(specialization);
          } else if (specialization.ramura === ramuri[2]) {
            r3.push(specialization);
          } else if (specialization.ramura === ramuri[3]) {
            r4.push(specialization);
          }
        } else {
          if (specialization.ramura === ramuri[0]) {
            r1.push(specialization);
          } else if (specialization.ramura === ramuri[1]) {
            r2.push(specialization);
          } else if (specialization.ramura === ramuri[2]) {
            r3.push(specialization);
          }
        }
      });
      return [r1, r2, r3, r4, r5];
    }
  };

  const [content, setContent] = useState(
    <div>
      <img
        className="d-block w-100"
        src="undraw_profile_re_4a55.svg"
        alt="Forth slide"
      />
    </div>
  );

  const getUsers = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/users`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.records);
        setCount(data.count);
      });
  };

  function howMuchIsRepeated(arr) {
    const count = [...new Set(arr)].map((val) => [
      val,
      arr.join("").split(val).length - 1,
    ]);
    let array = [];

    for (let i = 0; i < count.length; i++) {
      array[`${count[i][0]}`] = `${count[i][1]}`;
    }
    return array;
  }

  const usersResult = () => {
    let resultArray = [];
    let resultUsers = [];
    if (users) {
      users.forEach((user) => {
        if (user.quizResult) {
          resultArray = user.quizResult.split(";");
          for (let i = 0; i < resultArray.length; i++) {
            if (resultArray[i] != "") {
              resultUsers.push(resultArray[i]);
            }
          }
        }
      });
    }

    return howMuchIsRepeated(resultUsers);
  };

  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
    setMessage("Poza de profil actualizata!");
  }

  function handleDelete() {
    const user = auth.currentUser;
    user
      .delete()
      .then(() => {
        console.log("user deteled");
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/users/${currentUser.uid}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const getUserDetails = async () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/users/${currentUser.uid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, [currentUser]);

  useEffect(() => {
    getUsers();
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    setMessage("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    if (
      nameRef.current.value !== user.nume ||
      surnameRef.current.value !== user.prenume ||
      usernameRef.current.value !== user.username
    ) {
      const postData = {
        id: currentUser.uid,
        nume: nameRef.current.value,
        prenume: surnameRef.current.value,
        username: usernameRef.current.value,
      };
      fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/users/${currentUser.uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
        //setMessage("Profile updated!");
      })
      .catch(() => {
        setError("Failed to update profile!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const splitQuizResult = () => {
    let resultArray = [];
    let resultAccordion = [];
    if (user.quizResult) {
      resultArray = user.quizResult.split(";");
      for (let i = 0; i < resultArray.length; i++) {
        if (resultArray[i] != "") {
          resultAccordion.push(
            <ListGroup.Item
              as="li"
              className="m-1 rounded border border-1 shadow-sm"
            >
              {resultArray[i]}
            </ListGroup.Item>
          );
        }
      }
    }
    return resultAccordion;
  };

  const labels = () => {
    let resultArray = [];
    let filteredArray = [];
    if (user.quizResult) {
      resultArray = user.quizResult.split(";");
      for (let i = 0; i < resultArray.length; i++) {
        if (resultArray[i] != "") {
          filteredArray.push(resultArray[i]);
        }
      }
    }
    return filteredArray;
  };

  const data = () => {
    let resultArray = [];
    let aparitii = usersResult();
    let filteredArray = [];
    let filteredArrayWithPercentages = [];
    if (user.quizResult) {
      resultArray = user.quizResult.split(";");
      for (let i = 0; i < resultArray.length; i++) {
        if (resultArray[i] != "") {
          filteredArray.push(resultArray[i]);
        }
      }
      for (let i = 0; i < filteredArray.length; i++) {
        let index = Object.keys(aparitii).indexOf(filteredArray[i]);
        let value = Object.values(aparitii)[index];
        let numberValue = parseInt(value);
        filteredArrayWithPercentages.push((numberValue / count) * 100);
      }
      setRamuri(filteredArray);
    }
    return filteredArrayWithPercentages;
  };

  const getResultSpecializations = (id) => {
    const result = [];
    if (specializations) {
      specializations.forEach((specialization) => {
        if (specialization.ramura === id) {
          result.push(specialization);
        }
      });
    }
    // console.log(result);
    return result;
  };

  const getExcelDoc = () => {
    let result = null;
    if (ramuri[3] && ramuri[4]) {
      result = (
        <Workbook
          filename="rezultatChestionar.xlsx"
          element={
            <button className="btn btn-outline-primary">
              Descarcă în format excel opțiunile universitare specifice fiecărei
              ramuri recomandate ție
            </button>
          }
        >
          <Workbook.Sheet
            data={splitSpecializations()[0]}
            name={ramuri[0].slice(0, 30)}
          >
            <Workbook.Column label="specializare" value="specializare" />
            <Workbook.Column label="facultate" value="facultate" />
            <Workbook.Column label="universitate" value="universitate" />
            <Workbook.Column label="ramura" value="ramura" />
            <Workbook.Column label="domeniu" value="domeniu" />
            <Workbook.Column label="oras" value="oras" />
            <Workbook.Column label="regiune" value="regiune" />
            <Workbook.Column label="statut" value="statut" />
            <Workbook.Column label="link" value="link" />
            <Workbook.Column
              label="numar_locuri_buget"
              value="numar_locuri_buget"
            />
            <Workbook.Column
              label="numar_locuri_taxa"
              value="numar_locuri_taxa"
            />
            <Workbook.Column
              label="ultima_medie_buget"
              value="ultima_medie_buget"
            />
            <Workbook.Column
              label="ultima_medie_taxa"
              value="ultima_medie_taxa"
            />
            <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
          </Workbook.Sheet>
          <Workbook.Sheet
            data={splitSpecializations()[1]}
            name={ramuri[1].slice(0, 30)}
          >
            <Workbook.Column label="specializare" value="specializare" />
            <Workbook.Column label="facultate" value="facultate" />
            <Workbook.Column label="universitate" value="universitate" />
            <Workbook.Column label="ramura" value="ramura" />
            <Workbook.Column label="domeniu" value="domeniu" />
            <Workbook.Column label="oras" value="oras" />
            <Workbook.Column label="regiune" value="regiune" />
            <Workbook.Column label="statut" value="statut" />
            <Workbook.Column label="link" value="link" />
            <Workbook.Column
              label="numar_locuri_buget"
              value="numar_locuri_buget"
            />
            <Workbook.Column
              label="numar_locuri_taxa"
              value="numar_locuri_taxa"
            />
            <Workbook.Column
              label="ultima_medie_buget"
              value="ultima_medie_buget"
            />
            <Workbook.Column
              label="ultima_medie_taxa"
              value="ultima_medie_taxa"
            />
            <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
          </Workbook.Sheet>
          <Workbook.Sheet
            data={splitSpecializations()[2]}
            name={ramuri[2].slice(0, 30)}
          >
            <Workbook.Column label="specializare" value="specializare" />
            <Workbook.Column label="facultate" value="facultate" />
            <Workbook.Column label="universitate" value="universitate" />
            <Workbook.Column label="ramura" value="ramura" />
            <Workbook.Column label="domeniu" value="domeniu" />
            <Workbook.Column label="oras" value="oras" />
            <Workbook.Column label="regiune" value="regiune" />
            <Workbook.Column label="statut" value="statut" />
            <Workbook.Column label="link" value="link" />
            <Workbook.Column
              label="numar_locuri_buget"
              value="numar_locuri_buget"
            />
            <Workbook.Column
              label="numar_locuri_taxa"
              value="numar_locuri_taxa"
            />
            <Workbook.Column
              label="ultima_medie_buget"
              value="ultima_medie_buget"
            />
            <Workbook.Column
              label="ultima_medie_taxa"
              value="ultima_medie_taxa"
            />
            <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
          </Workbook.Sheet>
          <Workbook.Sheet
            data={splitSpecializations()[3]}
            name={ramuri[3].slice(0, 30)}
          >
            <Workbook.Column label="specializare" value="specializare" />
            <Workbook.Column label="facultate" value="facultate" />
            <Workbook.Column label="universitate" value="universitate" />
            <Workbook.Column label="ramura" value="ramura" />
            <Workbook.Column label="domeniu" value="domeniu" />
            <Workbook.Column label="oras" value="oras" />
            <Workbook.Column label="regiune" value="regiune" />
            <Workbook.Column label="statut" value="statut" />
            <Workbook.Column label="link" value="link" />
            <Workbook.Column
              label="numar_locuri_buget"
              value="numar_locuri_buget"
            />
            <Workbook.Column
              label="numar_locuri_taxa"
              value="numar_locuri_taxa"
            />
            <Workbook.Column
              label="ultima_medie_buget"
              value="ultima_medie_buget"
            />
            <Workbook.Column
              label="ultima_medie_taxa"
              value="ultima_medie_taxa"
            />
            <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
          </Workbook.Sheet>
          <Workbook.Sheet
            data={splitSpecializations()[4]}
            name={ramuri[4].slice(0, 30)}
          >
            <Workbook.Column label="specializare" value="specializare" />
            <Workbook.Column label="facultate" value="facultate" />
            <Workbook.Column label="universitate" value="universitate" />
            <Workbook.Column label="ramura" value="ramura" />
            <Workbook.Column label="domeniu" value="domeniu" />
            <Workbook.Column label="oras" value="oras" />
            <Workbook.Column label="regiune" value="regiune" />
            <Workbook.Column label="statut" value="statut" />
            <Workbook.Column label="link" value="link" />
            <Workbook.Column
              label="numar_locuri_buget"
              value="numar_locuri_buget"
            />
            <Workbook.Column
              label="numar_locuri_taxa"
              value="numar_locuri_taxa"
            />
            <Workbook.Column
              label="ultima_medie_buget"
              value="ultima_medie_buget"
            />
            <Workbook.Column
              label="ultima_medie_taxa"
              value="ultima_medie_taxa"
            />
            <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
          </Workbook.Sheet>
        </Workbook>
      );
    } else if (ramuri[3]) {
      result = (
        <Workbook
          filename="rezultatChestionar.xlsx"
          element={
            <button className="btn btn-outline-primary">
              Descarcă în format excel opțiunile universitare specifice fiecărei
              ramuri recomandate ție
            </button>
          }
        >
          <Workbook.Sheet
            data={splitSpecializations()[0]}
            name={ramuri[0].slice(0, 30)}
          >
            <Workbook.Column label="specializare" value="specializare" />
            <Workbook.Column label="facultate" value="facultate" />
            <Workbook.Column label="universitate" value="universitate" />
            <Workbook.Column label="ramura" value="ramura" />
            <Workbook.Column label="domeniu" value="domeniu" />
            <Workbook.Column label="oras" value="oras" />
            <Workbook.Column label="regiune" value="regiune" />
            <Workbook.Column label="statut" value="statut" />
            <Workbook.Column label="link" value="link" />
            <Workbook.Column
              label="numar_locuri_buget"
              value="numar_locuri_buget"
            />
            <Workbook.Column
              label="numar_locuri_taxa"
              value="numar_locuri_taxa"
            />
            <Workbook.Column
              label="ultima_medie_buget"
              value="ultima_medie_buget"
            />
            <Workbook.Column
              label="ultima_medie_taxa"
              value="ultima_medie_taxa"
            />
            <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
          </Workbook.Sheet>
          <Workbook.Sheet
            data={splitSpecializations()[1]}
            name={ramuri[1].slice(0, 30)}
          >
            <Workbook.Column label="specializare" value="specializare" />
            <Workbook.Column label="facultate" value="facultate" />
            <Workbook.Column label="universitate" value="universitate" />
            <Workbook.Column label="ramura" value="ramura" />
            <Workbook.Column label="domeniu" value="domeniu" />
            <Workbook.Column label="oras" value="oras" />
            <Workbook.Column label="regiune" value="regiune" />
            <Workbook.Column label="statut" value="statut" />
            <Workbook.Column label="link" value="link" />
            <Workbook.Column
              label="numar_locuri_buget"
              value="numar_locuri_buget"
            />
            <Workbook.Column
              label="numar_locuri_taxa"
              value="numar_locuri_taxa"
            />
            <Workbook.Column
              label="ultima_medie_buget"
              value="ultima_medie_buget"
            />
            <Workbook.Column
              label="ultima_medie_taxa"
              value="ultima_medie_taxa"
            />
            <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
          </Workbook.Sheet>
          <Workbook.Sheet
            data={splitSpecializations()[2]}
            name={ramuri[2].slice(0, 30)}
          >
            <Workbook.Column label="specializare" value="specializare" />
            <Workbook.Column label="facultate" value="facultate" />
            <Workbook.Column label="universitate" value="universitate" />
            <Workbook.Column label="ramura" value="ramura" />
            <Workbook.Column label="domeniu" value="domeniu" />
            <Workbook.Column label="oras" value="oras" />
            <Workbook.Column label="regiune" value="regiune" />
            <Workbook.Column label="statut" value="statut" />
            <Workbook.Column label="link" value="link" />
            <Workbook.Column
              label="numar_locuri_buget"
              value="numar_locuri_buget"
            />
            <Workbook.Column
              label="numar_locuri_taxa"
              value="numar_locuri_taxa"
            />
            <Workbook.Column
              label="ultima_medie_buget"
              value="ultima_medie_buget"
            />
            <Workbook.Column
              label="ultima_medie_taxa"
              value="ultima_medie_taxa"
            />
            <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
          </Workbook.Sheet>
          <Workbook.Sheet
            data={splitSpecializations()[3]}
            name={ramuri[3].slice(0, 30)}
          >
            <Workbook.Column label="specializare" value="specializare" />
            <Workbook.Column label="facultate" value="facultate" />
            <Workbook.Column label="universitate" value="universitate" />
            <Workbook.Column label="ramura" value="ramura" />
            <Workbook.Column label="domeniu" value="domeniu" />
            <Workbook.Column label="oras" value="oras" />
            <Workbook.Column label="regiune" value="regiune" />
            <Workbook.Column label="statut" value="statut" />
            <Workbook.Column label="link" value="link" />
            <Workbook.Column
              label="numar_locuri_buget"
              value="numar_locuri_buget"
            />
            <Workbook.Column
              label="numar_locuri_taxa"
              value="numar_locuri_taxa"
            />
            <Workbook.Column
              label="ultima_medie_buget"
              value="ultima_medie_buget"
            />
            <Workbook.Column
              label="ultima_medie_taxa"
              value="ultima_medie_taxa"
            />
            <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
          </Workbook.Sheet>
        </Workbook>
      );
    } else {
      <Workbook
        filename="rezultatChestionar.xlsx"
        element={
          <button className="btn btn-outline-primary">
            Descarcă în format excel opțiunile universitare specifice fiecărei
            ramuri recomandate ție
          </button>
        }
      >
        <Workbook.Sheet
          data={splitSpecializations()[0]}
          name={ramuri[0].slice(0, 30)}
        >
          <Workbook.Column label="specializare" value="specializare" />
          <Workbook.Column label="facultate" value="facultate" />
          <Workbook.Column label="universitate" value="universitate" />
          <Workbook.Column label="ramura" value="ramura" />
          <Workbook.Column label="domeniu" value="domeniu" />
          <Workbook.Column label="oras" value="oras" />
          <Workbook.Column label="regiune" value="regiune" />
          <Workbook.Column label="statut" value="statut" />
          <Workbook.Column label="link" value="link" />
          <Workbook.Column
            label="numar_locuri_buget"
            value="numar_locuri_buget"
          />
          <Workbook.Column
            label="numar_locuri_taxa"
            value="numar_locuri_taxa"
          />
          <Workbook.Column
            label="ultima_medie_buget"
            value="ultima_medie_buget"
          />
          <Workbook.Column
            label="ultima_medie_taxa"
            value="ultima_medie_taxa"
          />
          <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
        </Workbook.Sheet>
        <Workbook.Sheet
          data={splitSpecializations()[1]}
          name={ramuri[1].slice(0, 30)}
        >
          <Workbook.Column label="specializare" value="specializare" />
          <Workbook.Column label="facultate" value="facultate" />
          <Workbook.Column label="universitate" value="universitate" />
          <Workbook.Column label="ramura" value="ramura" />
          <Workbook.Column label="domeniu" value="domeniu" />
          <Workbook.Column label="oras" value="oras" />
          <Workbook.Column label="regiune" value="regiune" />
          <Workbook.Column label="statut" value="statut" />
          <Workbook.Column label="link" value="link" />
          <Workbook.Column
            label="numar_locuri_buget"
            value="numar_locuri_buget"
          />
          <Workbook.Column
            label="numar_locuri_taxa"
            value="numar_locuri_taxa"
          />
          <Workbook.Column
            label="ultima_medie_buget"
            value="ultima_medie_buget"
          />
          <Workbook.Column
            label="ultima_medie_taxa"
            value="ultima_medie_taxa"
          />
          <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
        </Workbook.Sheet>
        <Workbook.Sheet
          data={splitSpecializations()[2]}
          name={ramuri[2].slice(0, 30)}
        >
          <Workbook.Column label="specializare" value="specializare" />
          <Workbook.Column label="facultate" value="facultate" />
          <Workbook.Column label="universitate" value="universitate" />
          <Workbook.Column label="ramura" value="ramura" />
          <Workbook.Column label="domeniu" value="domeniu" />
          <Workbook.Column label="oras" value="oras" />
          <Workbook.Column label="regiune" value="regiune" />
          <Workbook.Column label="statut" value="statut" />
          <Workbook.Column label="link" value="link" />
          <Workbook.Column
            label="numar_locuri_buget"
            value="numar_locuri_buget"
          />
          <Workbook.Column
            label="numar_locuri_taxa"
            value="numar_locuri_taxa"
          />
          <Workbook.Column
            label="ultima_medie_buget"
            value="ultima_medie_buget"
          />
          <Workbook.Column
            label="ultima_medie_taxa"
            value="ultima_medie_taxa"
          />
          <Workbook.Column label="taxa_anuala" value="taxa_anuala" />
        </Workbook.Sheet>
      </Workbook>;
    }
    return result;
  };

  return (
    <>
      <Header />
      <div
        className="d-md-grid shadow-lg"
        style={{
          gridTemplateColumns: "2fr 4fr",
          position: "relative",
          zIndex: "1",
          marginBottom: "100px",
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      >
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Ștergere cont</Modal.Title>
          </Modal.Header>
          <Modal.Body>Ești sigur că dorești să-ți ștergi contul?</Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button className="btn btn-warning w-25" onClick={handleClose}>
              Anulează
            </Button>
            <Button className="btn btn-danger w-25" onClick={handleDelete}>
              Șterge
            </Button>
          </Modal.Footer>
        </Modal>
        <div
          className="d-flex flex-column align-items-center border border-2"
          style={{
            background: "white",
          }}
        >
          <div style={{ textAlign: "center", margin: "1rem" }}>
            <img
              src={photoURL || "blank-profile-picture.png"}
              alt="Avatar"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                borderWidth: "5px",
                borderColor: "#0275d8",
                borderStyle: "outset",
              }}
            />
          </div>
          <Form.Group
            controlId="formFile"
            className="m-5"
            style={{ width: "90%" }}
          >
            <Form.Control type="file" onChange={handleChange} />
          </Form.Group>
          <Button
            disabled={loading || !photo}
            className="mb-5"
            style={{ width: "90%" }}
            type="submit"
            onClick={handleClick}
          >
            Încarcă fotografia de profil
          </Button>
          <ButtonGroup vertical style={{ width: "90%" }}>
            <Button
              variant="outline-primary"
              className="mb-5 rounded"
              onClick={() => {
                setContent(
                  <div className="fields" style={{ width: "95%" }}>
                    <Form onSubmit={handleSubmit} className="mt-2 ">
                      <Form.Group id="name">
                        <Form.Label>Nume</Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="text"
                          ref={nameRef}
                          required
                          defaultValue={user.nume}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="surname">
                        <Form.Label>Prenume</Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="text"
                          ref={surnameRef}
                          required
                          defaultValue={user.prenume}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="username">
                        <Form.Label>Nume de utilizator</Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="text"
                          ref={usernameRef}
                          required
                          defaultValue={user.username}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="email">
                        <Form.Label>Adresa de email</Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="email"
                          ref={emailRef}
                          required
                          defaultValue={currentUser.email}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="password">
                        <Form.Label>Parolă</Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="password"
                          ref={passwordRef}
                          placeholder="Leave blank to keep the same password"
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="password-confirm">
                        <Form.Label>Confirmare parolă</Form.Label>
                        <Form.Control
                          type="password"
                          ref={passwordConfirmRef}
                          placeholder="Leave blank to keep the same password"
                        ></Form.Control>
                      </Form.Group>
                      <div className="d-flex justify-content-between m-5">
                        <Button
                          disabled={loading}
                          className="w-25"
                          variant="outline-primary"
                          type="submit"
                        >
                          Actualizează-ți profilul
                        </Button>
                        <Button
                          className="w-25"
                          variant="outline-danger"
                          onClick={handleShow}
                        >
                          Ștergere cont
                        </Button>
                      </div>
                    </Form>
                  </div>
                );
              }}
            >
              Profil
            </Button>
            <Button
              variant="outline-primary"
              className="mb-5 rounded"
              onClick={() => {
                setContent(
                  <div className="d-flex flex-column m-2 align-items-center ">
                    {user.quizResult && (
                      <div style={{ textAlign: "left", height: "90%" }}>
                        <h2 style={{ fontStyle: "italic" }}>
                          Rezultatele ultimei parcurgeri a chestionarului:
                        </h2>
                        <ListGroup
                          as="ol"
                          className="mt-4 border border-2 rounded shadow-lg d-flex flex-column"
                          numbered
                        >
                          <div>
                            <img
                              style={{ maxWidth: "600px", maxHeight: "300px" }}
                              className="d-block w-100 h-100"
                              src="undraw_result_re_uj08.svg"
                              alt="Forth slide"
                            />
                          </div>
                          {splitQuizResult()}
                        </ListGroup>
                      </div>
                    )}
                  </div>
                );
              }}
            >
              Rezultate chestionar
            </Button>
            <Button
              variant="outline-primary"
              className="mb-5 rounded"
              onClick={() => {
                setContent(
                  <div className="d-flex flex-column m-2 align-items-center">
                    <Chart labels={labels()} data={data()} />
                    <div className="d-flex m-2 align-items-center">
                      {getExcelDoc()}
                    </div>
                  </div>
                );
              }}
            >
              Rapoarte
            </Button>
          </ButtonGroup>
        </div>
        <div className="d-flex flex-column m-3">{content}</div>
      </div>
      <Footer />
    </>
  );
}
