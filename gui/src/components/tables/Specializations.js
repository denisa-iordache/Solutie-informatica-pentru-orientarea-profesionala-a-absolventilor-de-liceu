import { useEffect, useState } from "react";
import {
  ListGroup,
  Form,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Accordion, Button } from "react-bootstrap";
import {
  FcFlowChart,
  FcGraduationCap,
  FcTreeStructure,
  FcLink,
  FcLock,
  FcUnlock,
  FcSurvey,
  FcSearch,
  FcLeft,
  FcRight,
} from "react-icons/fc";
import { FaUniversity } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import { TbListNumbers } from "react-icons/tb";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useAuthentication } from "../../context/AuthenticationContext";
import { InputRange } from "react-input-range";

function Specializations() {
  const { currentUser } = useAuthentication();
  const [specializations, setSpecializations] = useState(null);
  const [regions, setRegions] = useState(null);
  const [cities, setCities] = useState(null);
  const [universities, setUniversities] = useState(null);
  const [domains, setDomains] = useState(null);
  const [faculties, setFaculties] = useState(null);
  const [branches, setBranches] = useState(null);
  const mediaMatch = window.matchMedia("(min-width: 768px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState(null);
  const [commentResponse, setCommentResponse] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentsResponse, setCommentsResponse] = useState(null);
  const [commentResponseLvl2, setCommentResponseLvl2] = useState(null);
  const [commentsResponseLvl2, setCommentsResponseLvl2] = useState(null);

  const [filterString, setFilterString] = useState("");
  const [filter, setFilter] = useState("");

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState(1);

  const [page, setPage] = useState(0);
  const [first, setFirst] = useState(0);

  const [idRegion, setIdRegion] = useState("");
  const [idCity, setIdCity] = useState("");
  const [idUniversity, setIdUniversity] = useState("");
  const [idFaculty, setIdFaculty] = useState("");
  const [idDomain, setIdDomain] = useState("");
  const [idBranch, setIdBranch] = useState("");
  const [idStatut, setIdStatut] = useState("");
  const [idLB, setIdLB] = useState(0);
  const [idLT, setIdLT] = useState(0);
  const [idUMB, setIdUMB] = useState(0);
  const [idUMT, setIdUMT] = useState(0);
  const [idTA, setIdTA] = useState(0);

  const handleFilter = (event) => {
    setFilterString("specializare");
    setFilter(event.target.value);
  };

  const getSpecializations = (
    filterString,
    filter,
    sortField,
    sortOrder,
    page
  ) => {
    fetch(
      `http://localhost:8080/specializationsTotal?${filterString}=${
        filter || ""
      }&sortField=${sortField || ""}&sortOrder=${
        sortOrder || ""
      }&page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsRegions = (id, page) => {
    fetch(
      `http://localhost:8080/specializationsTotal/${id}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsCities = (id, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalOras/${id}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsUniversities = (id, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalUniversitate/${id}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsFaculties = (id, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalFacultate/${id}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsDomains = (id, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalDomeniu/${id}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsBranches = (id, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalRamura/${id}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsStatut = (id, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalStatut/${id}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsLB = (lb, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalLB/${lb}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsLT = (lb, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalLT/${lb}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsUMB = (lb, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalUMB/${lb}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsUMT = (lb, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalUMT/${lb}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  const getSpecializationsTA = (lb, page) => {
    fetch(
      `http://localhost:8080/specializationsTotalTA/${lb}/?page=${page}&pageSize=${11}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setSpecializations(data.records);
      });
  };

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  const getRegions = () => {
    fetch(`http://localhost:8080/regions`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setRegions(data);
      });
  };

  const getUniversities = () => {
    fetch(`http://localhost:8080/universities`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUniversities(data);
      });
  };

  const getDomains = () => {
    fetch(`http://localhost:8080/domains`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDomains(data);
      });
  };

  const getCities = () => {
    fetch(`http://localhost:8080/cities`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      });
  };

  const getFaculties = () => {
    fetch(`http://localhost:8080/faculties`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFaculties(data);
      });
  };

  const getBranches = () => {
    fetch(`http://localhost:8080/branches`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBranches(data);
      });
  };

  const handleSort = (evt) => {
    console.warn(evt);
    setSortField(evt.sortField);
    setSortOrder(evt.sortOrder);
  };

  const getSpecializationsFilteredRegions = (id) => {
    let checkbox = document.getElementById(id);
    if (checkbox.checked == true) {
      // fetch(
      //   `http://localhost:8080/specializationsTotal/${id}/?page=${page}&pageSize=${11}`,
      //   {
      //     method: "GET",
      //   }
      // )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setSpecializations(data.records);
      //     setCount(data.count);
      //     // setpageCount(Math.ceil(count / 11));
      //   });
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("");
      setIdRegion(id);

      fetch(`http://localhost:8080/regions/${id}/citiesRegions`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setCities(data);
        });
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
      getCities();
    }
  };

  const getSpecializationsFilteredCities = (id) => {
    let checkbox = document.getElementById(id);
    if (checkbox.checked == true) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("");
      setIdCity(id);
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
    }
  };

  const getSpecializationsFilteredUniversitate = (id) => {
    let checkbox = document.getElementById(id);
    if (checkbox.checked == true) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("");
      setIdUniversity(id);
      fetch(`http://localhost:8080/universities/${id}/facultiesUniversities`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setFaculties(data);
        });
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
      getFaculties();
    }
  };

  const getSpecializationsFilteredFacultate = (id) => {
    let checkbox = document.getElementById(id);
    if (checkbox.checked == true) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdStatut("");
      setIdFaculty(id);
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
    }
  };

  const getSpecializationsFilteredDomeniu = (id) => {
    let checkbox = document.getElementById(id);
    if (checkbox.checked == true) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("");
      setIdDomain(id);
      fetch(`http://localhost:8080/domains/${id}/branchesDomains`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setBranches(data);
        });
    } else {
      getSpecializations();
      getBranches();
    }
  };

  const getSpecializationsFilteredRamura = (id) => {
    let checkbox = document.getElementById(id);
    if (checkbox.checked == true) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("");
      setIdBranch(id);
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
    }
  };

  const getSpecializationsFilteredStatut = () => {
    let checkbox = document.getElementById("inline-checkbox-1");
    let checkbox2 = document.getElementById("inline-checkbox-2");
    if (checkbox.checked == true) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdStatut("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("Public");
    } else if (checkbox2.checked == true) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdStatut("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("Privat");
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
    }
  };

  const getSpecializationsFilteredLB = () => {
    let range = document.getElementById("rangebug");
    if (range.value) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("");
      setIdLB(range.value);
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
    }
  };

  const getSpecializationsFilteredLT = () => {
    let range = document.getElementById("rangetax");
    if (range.value) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("");
      setIdLB("");
      setIdLT(range.value);
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
    }
  };

  const getSpecializationsFilteredUMB = () => {
    let range = document.getElementById("rangeumbug");
    if (range.value) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("");
      setIdLB("");
      setIdUMB(range.value);
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
    }
  };

  const getSpecializationsFilteredUMT = () => {
    let range = document.getElementById("rangeumtax");
    if (range.value) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("");
      setIdLB("");
      setIdUMT(range.value);
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
    }
  };

  const getSpecializationsFilteredTA = () => {
    let range = document.getElementById("rangeta");
    if (range.value) {
      setIdFaculty("");
      setIdDomain("");
      setIdBranch("");
      setIdRegion("");
      setIdCity("");
      setIdUniversity("");
      setIdStatut("");
      setIdLB("");
      setIdTA(range.value);
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
    }
  };

  const buildRegionsChecks = () => {
    const regionsChecks = [];
    if (regions) {
      regions.forEach((regiune) => {
        regionsChecks.push(
          <ListGroup.Item className="d-flex align-items-baseline">
            <input
              type="checkbox"
              style={{ marginRight: "1rem" }}
              id={`${regiune.nume}`}
              onChange={() =>
                getSpecializationsFilteredRegions(`${regiune.nume}`)
              }
            />
            <p>{regiune.nume}</p>
          </ListGroup.Item>
        );
      });
    }
    return regionsChecks;
  };

  const buildUniversitiesChecks = () => {
    const universitiesChecks = [];
    if (universities) {
      universities.forEach((universitate) => {
        universitiesChecks.push(
          <ListGroup.Item className="d-flex align-items-baseline">
            <input
              type="checkbox"
              style={{ marginRight: "1rem" }}
              id={`${universitate.nume}`}
              onChange={() =>
                getSpecializationsFilteredUniversitate(`${universitate.nume}`)
              }
            />
            <p>{universitate.nume}</p>
          </ListGroup.Item>
        );
      });
    }
    return universitiesChecks;
  };

  const buildDomainsChecks = () => {
    const domainsChecks = [];
    if (domains) {
      domains.forEach((domeniu) => {
        domainsChecks.push(
          <ListGroup.Item className="d-flex align-items-baseline">
            <input
              type="checkbox"
              style={{ marginRight: "1rem" }}
              id={`${domeniu.nume}`}
              onChange={() =>
                getSpecializationsFilteredDomeniu(`${domeniu.nume}`)
              }
            />
            <p>{domeniu.nume}</p>
          </ListGroup.Item>
        );
      });
    }
    return domainsChecks;
  };

  const buildCitiesChecks = () => {
    const citiesChecks = [];
    if (cities) {
      cities.forEach((city) => {
        citiesChecks.push(
          <ListGroup.Item className="d-flex align-items-baseline">
            <input
              type="checkbox"
              style={{ marginRight: "1rem" }}
              id={`${city.nume}`}
              onChange={() => getSpecializationsFilteredCities(`${city.nume}`)}
            />
            <p>{city.nume}</p>
          </ListGroup.Item>
        );
      });
    }
    return citiesChecks;
  };

  const buildFacultiesChecks = () => {
    const facultiesChecks = [];
    if (faculties) {
      faculties.forEach((faculty) => {
        facultiesChecks.push(
          <ListGroup.Item className="d-flex align-items-baseline">
            <input
              type="checkbox"
              style={{ marginRight: "1rem" }}
              id={`${faculty.nume}`}
              onChange={() =>
                getSpecializationsFilteredFacultate(`${faculty.nume}`)
              }
            />
            <p>{faculty.nume}</p>
          </ListGroup.Item>
        );
      });
    }
    return facultiesChecks;
  };

  const buildBranchesChecks = () => {
    const branchesChecks = [];
    if (branches) {
      branches.forEach((branch) => {
        branchesChecks.push(
          <ListGroup.Item className="d-flex align-items-baseline">
            <input
              type="checkbox"
              style={{ marginRight: "1rem" }}
              id={`${branch.nume}`}
              onChange={() =>
                getSpecializationsFilteredRamura(`${branch.nume}`)
              }
            />
            <p>{branch.nume}</p>
          </ListGroup.Item>
        );
      });
    }
    return branchesChecks;
  };

  const getCommentsFilteredBySpecialization = (id) => {
    fetch(`http://localhost:8080/specialization/${id}/comments`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  };

  const getCommentsFilteredBySpecializationAndParent = (id, parent) => {
    fetch(
      `http://localhost:8080/specialization/${id}/parent/${parent}/comments`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCommentsResponse(data);
      });
  };

  const getCommentsFilteredBySpecializationAndParentLvl2 = (id, parent) => {
    fetch(
      `http://localhost:8080/specialization/${id}/parent/${parent}/comments`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCommentsResponseLvl2(data);
      });
  };

  const getCommentsResponseLvl2 = (id, parent) => {
    const result = [];
    if (commentsResponseLvl2) {
      commentsResponseLvl2.forEach((comment) => {
        if (comment.id_specializare === id && comment.parinte === parent) {
          result.push(
            <div className="mb-3 shadow-sm mt-3">
              <Card
                border="light"
                bg="light"
                style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              >
                <Card.Body>
                  <Card.Text className="p-2 d-flex gap-3 text-muted ">
                    <small>{comment.autor}</small>
                    <small> - </small>
                    <small>{comment.data}</small>
                  </Card.Text>
                  <Card.Text style={{ paddingLeft: "20px" }}>
                    <div>
                      <div>{comment.continut}</div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        }
      });
    }
    return result;
  };

  const getCommentsResponse = (id, parent) => {
    const result = [];
    if (commentsResponse) {
      commentsResponse.forEach((comment) => {
        if (comment.id_specializare === id && comment.parinte === parent) {
          result.push(
            <div className="mb-3 shadow-sm mt-3">
              <Card
                border="light"
                bg="light"
                style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              >
                <Card.Body>
                  <Card.Text className="p-2 d-flex gap-3 text-muted ">
                    <small>{comment.autor}</small>
                    <small> - </small>
                    <small>{comment.data}</small>
                  </Card.Text>
                  <Card.Text style={{ paddingLeft: "20px" }}>
                    <div>
                      <div>{comment.continut}</div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Accordion>
                <Accordion.Item eventKey={`${comment.id}`}>
                  <Accordion.Header
                    onClick={() => {
                      getCommentsFilteredBySpecializationAndParentLvl2(
                        comment.id_specializare,
                        comment.id
                      );
                    }}
                  >
                    Răspunde la acest comentariu
                  </Accordion.Header>
                  <Accordion.Body>
                    {currentUser ? (
                      <Form id={`form${comment.id}`}>
                        <Form.Group
                          controlId={`id${comment.id}`}
                          style={{ marginBottom: "2rem" }}
                        >
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder={`@${comment.autor}`}
                            defaultValue={`@${comment.autor}`}
                            value={commentResponse}
                            onChange={(e) =>
                              setCommentResponseLvl2(e.target.value)
                            }
                          />
                        </Form.Group>
                        {currentUser.email === "nodemailerpopescu@gmail.com" ? (
                          <Button
                            variant="primary"
                            className="btn btn-primary btn-sm"
                            style={{ width: "auto" }}
                            onClick={() => {
                              adaugaComentariuCopil(
                                comment.id_specializare,
                                "Admin",
                                commentResponseLvl2,
                                comment.id
                              );
                              toast.success(
                                "Comentariul tău urmează să fie validat de către un administrator. Vei fi notificat când acesta va fi vizibil pe site!",
                                {
                                  position: "bottom-right",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                }
                              );
                              document.getElementById(`id${comment.id}`).value =
                                "";
                              setCommentResponseLvl2("");
                            }}
                          >
                            Adaugă răspunsul
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            className="btn btn-primary btn-sm"
                            style={{ width: "auto" }}
                            onClick={() => {
                              adaugaComentariuCopil(
                                comment.id_specializare,
                                currentUser.email,
                                commentResponseLvl2,
                                comment.id
                              );
                              toast.success(
                                "Comentariul tău urmează să fie validat de către un administrator. Vei fi notificat când acesta va fi vizibil pe site!",
                                {
                                  position: "bottom-right",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                }
                              );
                              document.getElementById(`id${comment.id}`).value =
                                "";
                              setCommentResponseLvl2("");
                            }}
                          >
                            Adaugă răspunsul
                          </Button>
                        )}
                      </Form>
                    ) : (
                      <Form id={`form${comment.id}`}>
                        <Form.Group
                          controlId={`id${comment.id}`}
                          style={{ marginBottom: "2rem" }}
                        >
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder={`@${comment.autor}`}
                            defaultValue={`@${comment.autor}`}
                            value={commentResponse}
                            onChange={(e) =>
                              setCommentResponseLvl2(e.target.value)
                            }
                            disabled
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          className="btn btn-primary btn-sm"
                          style={{ width: "auto" }}
                          disabled
                          onClick={() => {
                            adaugaComentariuCopil(
                              comment.id_specializare,
                              currentUser.email,
                              commentResponseLvl2,
                              comment.id
                            );
                            toast.success(
                              "Comentariul tău urmează să fie validat de către un administrator. Vei fi notificat când acesta va fi vizibil pe site!",
                              {
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                            document.getElementById(`id${comment.id}`).value =
                              "";
                            setCommentResponseLvl2("");
                          }}
                        >
                          Adaugă răspunsul
                        </Button>
                      </Form>
                    )}
                    {getCommentsResponseLvl2(
                      comment.id_specializare,
                      comment.id
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        }
      });
    }
    return result;
  };

  const getComments = (id) => {
    const result = [];
    if (comments) {
      comments.forEach((comment) => {
        if (comment.id_specializare === id && comment.parinte === null) {
          result.push(
            <div className="mb-3 shadow-sm mt-3">
              <Card
                border="light"
                bg="light"
                style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
              >
                <Card.Body>
                  <Card.Text className="p-2 d-flex gap-3 text-muted ">
                    <small>{comment.autor}</small>
                    <small> - </small>
                    <small>{comment.data}</small>
                  </Card.Text>
                  <Card.Text style={{ paddingLeft: "20px" }}>
                    <div>
                      <div>{comment.continut}</div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Accordion>
                <Accordion.Item eventKey={`${comment.id}`}>
                  <Accordion.Header
                    onClick={() => {
                      getCommentsFilteredBySpecializationAndParent(
                        comment.id_specializare,
                        comment.id
                      );
                    }}
                  >
                    Răspunde la acest comentariu
                  </Accordion.Header>
                  <Accordion.Body>
                    {currentUser ? (
                      <Form id={`form${comment.id}`}>
                        <Form.Group
                          controlId={`id${comment.id}`}
                          style={{ marginBottom: "2rem" }}
                        >
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder={`@${comment.autor}`}
                            defaultValue={`@${comment.autor}`}
                            value={commentResponse}
                            onChange={(e) => setCommentResponse(e.target.value)}
                          />
                        </Form.Group>
                        {currentUser.email === "nodemailerpopescu@gmail.com" ? (
                          <Button
                            variant="primary"
                            className="btn btn-primary btn-sm"
                            style={{ width: "auto" }}
                            onClick={() => {
                              adaugaComentariuCopil(
                                comment.id_specializare,
                                "Admin",
                                commentResponse,
                                comment.id
                              );
                              toast.success(
                                "Comentariul tău urmează să fie validat de către un administrator. Vei fi notificat când acesta va fi vizibil pe site!",
                                {
                                  position: "bottom-right",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                }
                              );
                              document.getElementById(`id${comment.id}`).value =
                                "";
                              setCommentResponse("");
                            }}
                          >
                            Adaugă răspunsul
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            className="btn btn-primary btn-sm"
                            style={{ width: "auto" }}
                            onClick={() => {
                              adaugaComentariuCopil(
                                comment.id_specializare,
                                currentUser.email,
                                commentResponse,
                                comment.id
                              );
                              toast.success(
                                "Comentariul tău urmează să fie validat de către un administrator. Vei fi notificat când acesta va fi vizibil pe site!",
                                {
                                  position: "bottom-right",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                }
                              );
                              document.getElementById(`id${comment.id}`).value =
                                "";
                              setCommentResponse("");
                            }}
                          >
                            Adaugă răspunsul
                          </Button>
                        )}
                      </Form>
                    ) : (
                      <Form id={`form${comment.id}`}>
                        <Form.Group
                          controlId={`id${comment.id}`}
                          style={{ marginBottom: "2rem" }}
                        >
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder={`@${comment.autor}`}
                            defaultValue={`@${comment.autor}`}
                            value={commentResponse}
                            onChange={(e) => setCommentResponse(e.target.value)}
                            disabled
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          className="btn btn-primary btn-sm"
                          style={{ width: "auto" }}
                          disabled
                          onClick={() => {
                            adaugaComentariuCopil(
                              comment.id_specializare,
                              currentUser.email,
                              commentResponse,
                              comment.id
                            );
                            toast.success(
                              "Comentariul tău urmează să fie validat de către un administrator. Vei fi notificat când acesta va fi vizibil pe site!",
                              {
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                            document.getElementById(`id${comment.id}`).value =
                              "";
                            setCommentResponse("");
                          }}
                        >
                          Adaugă răspunsul
                        </Button>
                      </Form>
                    )}
                    {getCommentsResponse(comment.id_specializare, comment.id)}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        }
      });
    }
    return result;
  };

  const cards = () => {
    const cards = [];
    if (specializations) {
      specializations.forEach((specialization) => {
        if (matches) {
          cards.push(
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
                            - {specialization.numar_locuri_buget} locuri buget,{" "}
                            {specialization.numar_locuri_taxa} locuri taxă
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
                          <span> - {specialization.statut}</span>
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
              <Accordion>
                <Accordion.Item eventKey={`${specialization.id}`}>
                  <Accordion.Header
                    onClick={() => {
                      getCommentsFilteredBySpecialization(specialization.id);
                    }}
                  >
                    Comentarii
                  </Accordion.Header>
                  <Accordion.Body>
                    {currentUser ? (
                      <Form id={`form${specialization.id}`}>
                        <Form.Group
                          controlId={`id${specialization.id}`}
                          style={{ marginBottom: "2rem" }}
                        >
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder="Scrie comentariul tău aici..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          className="btn btn-primary btn-sm"
                          style={{ width: "auto" }}
                          onClick={() => {
                            adaugaComentariu(
                              specialization.id,
                              currentUser.email,
                              comment
                            );
                            toast.success(
                              "Comentariul tău urmează să fie validat de către un administrator. Vei fi notificat când acesta va fi vizibil pe site!",
                              {
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                            document.getElementById(
                              `id${specialization.id}`
                            ).value = "";
                            setComment("");
                          }}
                        >
                          Adaugă comentariul
                        </Button>
                      </Form>
                    ) : (
                      <Form id={`form${specialization.id}`}>
                        <Form.Group
                          controlId={`id${specialization.id}`}
                          style={{ marginBottom: "2rem" }}
                        >
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder="Scrie comentariul tau aici..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          className="btn btn-primary btn-sm"
                          style={{ width: "auto" }}
                          disabled
                          onClick={() => {
                            adaugaComentariu(
                              specialization.id,
                              currentUser.email,
                              comment
                            );
                            toast.success(
                              "Comentariul tău urmează să fie validat de către un administrator. Vei fi notificat când acesta va fi vizibil pe site!",
                              {
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                            document.getElementById(
                              `id${specialization.id}`
                            ).value = "";
                            setComment("");
                          }}
                        >
                          Adaugă comentariul
                        </Button>
                      </Form>
                    )}
                    {getComments(specialization.id)}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        } else {
          cards.push(
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
                            - {specialization.numar_locuri_buget} locuri buget,{" "}
                            {specialization.numar_locuri_taxa} locuri taxă
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
                          <span> - {specialization.statut}</span>
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
              <Accordion>
                <Accordion.Item eventKey={`${specialization.id}`}>
                  <Accordion.Header
                    onClick={() => {
                      getCommentsFilteredBySpecialization(specialization.id);
                    }}
                  >
                    Comentarii
                  </Accordion.Header>
                  <Accordion.Body>
                    {currentUser ? (
                      <Form id={`form${specialization.id}`}>
                        <Form.Group
                          controlId={`id${specialization.id}`}
                          style={{ marginBottom: "2rem" }}
                        >
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder="Scrie comentariul tau aici..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          className="btn btn-primary btn-sm"
                          style={{ width: "auto" }}
                          onClick={() => {
                            adaugaComentariu(
                              specialization.id,
                              currentUser.email,
                              comment
                            );
                            toast.success(
                              "Comentariul tău urmează să fie validat de către un administrator. Vei fi notificat când acesta va fi vizibil pe site!",
                              {
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                            document.getElementById(
                              `id${specialization.id}`
                            ).value = "";
                            setComment("");
                          }}
                        >
                          Adaugă comentariul
                        </Button>
                      </Form>
                    ) : (
                      <Form id={`form${specialization.id}`}>
                        <Form.Group
                          controlId={`id${specialization.id}`}
                          style={{ marginBottom: "2rem" }}
                        >
                          <Form.Control
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder="Scrie comentariul tau aici..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          className="btn btn-primary btn-sm"
                          style={{ width: "auto" }}
                          disabled
                          onClick={() => {
                            adaugaComentariu(
                              specialization.id,
                              currentUser.email,
                              comment
                            );
                            toast.success(
                              "Comentariul tău urmează să fie validat de către un administrator. Vei fi notificat când acesta va fi vizibil pe site!",
                              {
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                            document.getElementById(
                              `id${specialization.id}`
                            ).value = "";
                            setComment("");
                          }}
                        >
                          Adaugă comentariul
                        </Button>
                      </Form>
                    )}
                    {getComments(specialization.id)}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        }
      });
    }
    return cards;
  };

  const adaugaComentariu = (id_specializare, user_email, comment) => {
    const postData = {
      continut: comment,
      data: new Date().toLocaleString().replace(",", ""),
      status: "In asteptare",
      autor: user_email,
      parinte: null,
    };
    fetch(`http://localhost:8080/specialization/${id_specializare}/comments`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const adaugaComentariuCopil = (
    id_specializare,
    user_email,
    comment,
    parinte
  ) => {
    const postData = {
      continut: comment,
      data: new Date().toLocaleString().replace(",", ""),
      status: "In asteptare",
      autor: user_email,
      parinte: parinte,
    };
    fetch(`http://localhost:8080/specialization/${id_specializare}/comments`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  useEffect(() => {
    getRegions();
    getUniversities();
    getDomains();
    getCities();
    getFaculties();
    getBranches();
  }, []);

  useEffect(() => {
    // getSpecializations(filterString, filter, sortField, sortOrder, page);
    if ((idRegion && idCity) || idCity) {
      getSpecializationsCities(idCity, page);
    } else if (idRegion) {
      getSpecializationsRegions(idRegion, page);
    } else if ((idUniversity && idFaculty) || idFaculty) {
      getSpecializationsFaculties(idFaculty, page);
    } else if (idUniversity) {
      getSpecializationsUniversities(idUniversity, page);
    } else if ((idDomain && idBranch) || idBranch) {
      getSpecializationsBranches(idBranch, page);
    } else if (idDomain) {
      getSpecializationsDomains(idDomain, page);
    } else if (idStatut) {
      getSpecializationsStatut(idStatut, page);
    } else if (idLB) {
      getSpecializationsLB(idLB, page);
    } else if (idTA) {
      getSpecializationsTA(idTA, page);
    } else if (idLT) {
      getSpecializationsLT(idLT, page);
    } else if (idUMB) {
      getSpecializationsUMB(idUMB, page);
    } else if (idUMT) {
      getSpecializationsUMT(idUMT, page);
    } else {
      getSpecializations(filterString, filter, sortField, sortOrder, page);
    }
  }, [
    idCity,
    idRegion,
    idUniversity,
    idFaculty,
    idDomain,
    idBranch,
    idLB,
    idLT,
    idUMB,
    idUMT,
    idTA,
    idStatut,
    filterString,
    filter,
    sortField,
    sortOrder,
    page,
  ]);

  const handlePageClick = async (data) => {
    setPage(data.selected);
    setFirst(data.selected * 2);
    // let currentPage = data.selected;
    // const commentsFormServer = await fetchSpecializations(currentPage);
    // setSpecializations(commentsFormServer);
  };

  return (
    <>
      <div
        style={{
          gridTemplateColumns: "1fr 5fr",
          position: "relative",
          zIndex: "1",
          marginBottom: "100px",
          backgroundColor: "white",
        }}
        className="d-md-grid shadow-lg"
      >
        <div className="p-3" style={{ flexShrink: "2" }}>
          <Button
            variant="outline-dark"
            className="mb-2 w-100"
            onClick={() => {
              document
                .querySelectorAll("input[type=checkbox]")
                .forEach((el) => (el.checked = false));
              getSpecializations(
                filterString,
                filter,
                sortField,
                sortOrder,
                page
              );
            }}
          >
            Curăță toate filtrele
          </Button>
          {matches ? (
            <ListGroup>
              <ListGroup.Item>
                <h4>Regiune</h4>
                <ListGroup
                  style={{
                    maxHeight: "300px",
                    marginBottom: "10px",
                    overflow: "auto",
                  }}
                >
                  {buildRegionsChecks()}
                </ListGroup>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Oraș</h4>
                <ListGroup
                  style={{
                    maxHeight: "300px",
                    marginBottom: "10px",
                    overflow: "auto",
                  }}
                >
                  {buildCitiesChecks()}
                </ListGroup>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Universitate</h4>
                <ListGroup
                  style={{
                    maxHeight: "300px",
                    marginBottom: "10px",
                    overflow: "auto",
                  }}
                >
                  {buildUniversitiesChecks()}
                </ListGroup>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Facultate</h4>
                <ListGroup
                  style={{
                    maxHeight: "300px",
                    marginBottom: "10px",
                    overflow: "auto",
                  }}
                >
                  {buildFacultiesChecks()}
                </ListGroup>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Domeniu</h4>
                <ListGroup
                  style={{
                    maxHeight: "300px",
                    marginBottom: "10px",
                    overflow: "auto",
                  }}
                >
                  {buildDomainsChecks()}
                </ListGroup>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Ramură</h4>
                <ListGroup
                  style={{
                    maxHeight: "300px",
                    marginBottom: "10px",
                    overflow: "auto",
                  }}
                >
                  {buildBranchesChecks()}
                </ListGroup>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Statut</h4>
                <Form>
                  <div key="inline-checkbox" className="mb-3 mt-3">
                    <Form.Check
                      inline
                      label="Public"
                      name="group1"
                      type="checkbox"
                      id="inline-checkbox-1"
                      onChange={getSpecializationsFilteredStatut}
                    />
                    <Form.Check
                      inline
                      label="Privat"
                      name="group1"
                      type="checkbox"
                      id="inline-checkbox-2"
                      onChange={getSpecializationsFilteredStatut}
                    />
                  </div>
                </Form>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Număr locuri buget</h4>
                <div className="d-flex mt-3">
                  <p className="mr-1">0</p>
                  <div className="slider">
                    <Form.Range
                      min="0"
                      max="500"
                      defaultValue="0"
                      id="rangebug"
                      onChange={() => {
                        getSpecializationsFilteredLB();
                        document.getElementById("output1").innerHTML =
                          document.getElementById("rangebug").value;
                      }}
                    />
                  </div>
                  <p className="ml-1">500</p>
                  <p
                    style={{
                      marginLeft: "50px",
                    }}
                    id="output1"
                  ></p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Număr locuri taxă</h4>
                <div className="d-flex mt-3">
                  <p className="mr-1">0</p>
                  <div className="slider">
                    <Form.Range
                      min="0"
                      max="500"
                      defaultValue="0"
                      id="rangetax"
                      onChange={() => {
                        getSpecializationsFilteredLT();
                        document.getElementById("output2").innerHTML =
                          document.getElementById("rangetax").value;
                      }}
                    />
                  </div>
                  <p className="ml-1">500</p>
                  <p
                    style={{
                      marginLeft: "50px",
                    }}
                    id="output2"
                  ></p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Ultima medie buget</h4>
                <div className="d-flex mt-3">
                  <p className="mr-1">6</p>
                  <div className="slider">
                    <Form.Range
                      min="6"
                      max="10"
                      defaultValue="6"
                      step="0.1"
                      id="rangeumbug"
                      onChange={() => {
                        getSpecializationsFilteredUMB();
                        document.getElementById("output3").innerHTML =
                          document.getElementById("rangeumbug").value;
                      }}
                    />
                  </div>
                  <p className="ml-1">10</p>
                  <p
                    style={{
                      marginLeft: "50px",
                    }}
                    id="output3"
                  ></p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Ultima medie taxă</h4>
                <div className="d-flex mt-3">
                  <p className="mr-1">6</p>
                  <div className="slider">
                    <Form.Range
                      min="6"
                      max="10"
                      defaultValue="6"
                      step="0.1"
                      id="rangeumtax"
                      onChange={() => {
                        getSpecializationsFilteredUMT();
                        document.getElementById("output4").innerHTML =
                          document.getElementById("rangeumtax").value;
                      }}
                    />
                  </div>
                  <p className="ml-1">10</p>
                  <p
                    style={{
                      marginLeft: "50px",
                    }}
                    id="output4"
                  ></p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Taxă anuală</h4>
                <div className="d-flex mt-3">
                  <p className="mr-1">0</p>
                  <div className="slider">
                    <Form.Range
                      min="0"
                      max="10000"
                      defaultValue="0"
                      id="rangeta"
                      onChange={() => {
                        getSpecializationsFilteredTA();
                        document.getElementById("output5").innerHTML =
                          document.getElementById("rangeta").value;
                      }}
                    />
                  </div>
                  <p className="ml-1">10000</p>
                  <p
                    style={{
                      marginLeft: "50px",
                    }}
                    id="output5"
                  ></p>
                </div>
              </ListGroup.Item>
            </ListGroup>
          ) : (
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Regiune</Accordion.Header>
                <Accordion.Body>
                  <ListGroup
                    style={{
                      maxHeight: "300px",
                      marginBottom: "10px",
                      overflow: "auto",
                    }}
                  >
                    {buildRegionsChecks()}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Oraș</Accordion.Header>
                <Accordion.Body>
                  <ListGroup
                    style={{
                      maxHeight: "300px",
                      marginBottom: "10px",
                      overflow: "auto",
                    }}
                  >
                    {buildCitiesChecks()}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Universitate</Accordion.Header>
                <Accordion.Body>
                  <ListGroup
                    style={{
                      maxHeight: "300px",
                      marginBottom: "10px",
                      overflow: "auto",
                    }}
                  >
                    {buildUniversitiesChecks()}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Facultate</Accordion.Header>
                <Accordion.Body>
                  <ListGroup
                    style={{
                      maxHeight: "300px",
                      marginBottom: "10px",
                      overflow: "auto",
                    }}
                  >
                    {buildFacultiesChecks()}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>Domeniu</Accordion.Header>
                <Accordion.Body>
                  <ListGroup
                    style={{
                      maxHeight: "300px",
                      marginBottom: "10px",
                      overflow: "auto",
                    }}
                  >
                    {buildDomainsChecks()}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>Ramură</Accordion.Header>
                <Accordion.Body>
                  <ListGroup
                    style={{
                      maxHeight: "300px",
                      marginBottom: "10px",
                      overflow: "auto",
                    }}
                  >
                    {buildBranchesChecks()}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>Statut</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <div key="inline-checkbox" className="mb-3 mt-3">
                      <Form.Check
                        inline
                        label="Public"
                        name="group1"
                        type="checkbox"
                        id="inline-checkbox-1"
                        onChange={getSpecializationsFilteredStatut}
                      />
                      <Form.Check
                        inline
                        label="Privat"
                        name="group1"
                        type="checkbox"
                        id="inline-checkbox-2"
                        onChange={getSpecializationsFilteredStatut}
                      />
                    </div>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>Număr locuri buget</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex mt-3">
                    <p className="mr-1">0</p>
                    <Form.Range
                      min="0"
                      max="500"
                      defaultValue="0"
                      id="rangebug"
                      onChange={() => {
                        getSpecializationsFilteredLB();
                        document.getElementById("output1").innerHTML =
                          document.getElementById("rangebug").value;
                      }}
                    />
                    <p className="ml-1">500</p>
                    <p
                      style={{
                        marginLeft: "50px",
                      }}
                      id="output1"
                    ></p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8">
                <Accordion.Header>Număr locuri taxă</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex mt-3">
                    <p className="mr-1">0</p>
                    <Form.Range
                      min="0"
                      max="500"
                      defaultValue="0"
                      id="rangetax"
                      onChange={() => {
                        getSpecializationsFilteredLT();
                        document.getElementById("output3").innerHTML =
                          document.getElementById("rangetax").value;
                      }}
                    />
                    <p className="ml-1">500</p>
                    <p
                      style={{
                        marginLeft: "50px",
                      }}
                      id="output2"
                    ></p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="9">
                <Accordion.Header>Ultima medie buget</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex mt-3">
                    <p className="mr-1">6</p>
                    <Form.Range
                      min="6"
                      max="10"
                      defaultValue="6"
                      step="0.1"
                      id="rangeumbug"
                      onChange={() => {
                        getSpecializationsFilteredUMB();
                        document.getElementById("output3").innerHTML =
                          document.getElementById("rangeumbug").value;
                      }}
                    />
                    <p className="ml-1">10</p>
                    <p
                      style={{
                        marginLeft: "50px",
                      }}
                      id="output3"
                    ></p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="10">
                <Accordion.Header>Ultima medie taxă</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex mt-3">
                    <p className="mr-1">6</p>
                    <Form.Range
                      min="6"
                      max="10"
                      defaultValue="6"
                      step="0.1"
                      id="rangeumtax"
                      onChange={() => {
                        getSpecializationsFilteredUMT();
                        document.getElementById("output4").innerHTML =
                          document.getElementById("rangeumtax").value;
                      }}
                    />
                    <p className="ml-1">10</p>
                    <p
                      style={{
                        marginLeft: "50px",
                      }}
                      id="output4"
                    ></p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="11">
                <Accordion.Header>Taxă anuală</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex mt-3">
                    <p className="mr-1">0</p>
                    <Form.Range
                      min="0"
                      max="10000"
                      defaultValue="0"
                      id="rangeta"
                      onChange={() => {
                        getSpecializationsFilteredTA();
                        document.getElementById("output5").innerHTML =
                          document.getElementById("rangeta").value;
                      }}
                    />
                    <p className="ml-1">10000</p>
                    <p
                      style={{
                        marginLeft: "50px",
                      }}
                      id="output5"
                    ></p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
        </div>
        <div style={{ padding: "1rem" }}>
          <ToastContainer />
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <DropdownButton
                  as={ButtonGroup}
                  variant="outline-primary"
                  id="dropdown-item-button"
                  title="Sortează după"
                  style={{ width: "86%", marginBottom: "2rem" }}
                >
                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      variant="outline-primary"
                      drop="end"
                      title="Specializare"
                      className="mt-0"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("specializare");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("specializare");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      variant="outline-primary"
                      drop="end"
                      title="Facultate"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("facultate");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("facultate");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      variant="outline-primary"
                      drop="end"
                      title="Universitate"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("universitate");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("universitate");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      variant="outline-primary"
                      drop="end"
                      title="Domeniu"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("domeniu");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("domeniu");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      variant="outline-primary"
                      drop="end"
                      title="Ramură"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("ramura");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("ramura");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      variant="outline-primary"
                      drop="end"
                      title="Regiune"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("regiune");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("regiune");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      drop="end"
                      title="Oraș"
                      variant="outline-primary"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("oras");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("oras");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      drop="end"
                      title="Număr locuri buget"
                      variant="outline-primary"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("numar_locuri_buget");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("numar_locuri_buget");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      drop="end"
                      title="Număr locuri taxă"
                      variant="outline-primary"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("numar_locuri_taxa");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("numar_locuri_taxa");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      drop="end"
                      title="Ultima medie buget"
                      variant="outline-primary"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("ultima_medie_buget");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("ultima_medie_buget");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      drop="end"
                      title="Ultima medie taxă"
                      variant="outline-primary"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("ultima_medie_taxa");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("ultima_medie_taxa");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="m-1">
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-button-drop-end"
                      drop="end"
                      title="Taxă anuală"
                      variant="outline-primary"
                      className="mt-1"
                      style={{ width: "100%" }}
                    >
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(1);
                          setSortField("taxa_anuala");
                        }}
                      >
                        Ascendent <AiOutlineSortAscending />
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setSortOrder(-1);
                          setSortField("taxa_anuala");
                        }}
                      >
                        Descendent <AiOutlineSortDescending />
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </DropdownButton>
              </div>
              <div className="col-sm-6">
                <InputGroup
                  style={{
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "2rem",
                  }}
                >
                  <Form.Control
                    placeholder="Caută o specializare"
                    aria-label="Caută o specializare"
                    aria-describedby="basic-addon2"
                    className="rounded"
                    onChange={handleFilter}
                    value={filter}
                  />
                  <FcSearch
                    style={{
                      width: "30px",
                      height: "30px",
                      marginLeft: "1rem",
                    }}
                  />
                </InputGroup>
              </div>
            </div>
          </div>
          {cards()}
          <ReactPaginate
            previousLabel={<FcLeft />}
            nextLabel={<FcRight />}
            breakLabel={"..."}
            pageCount={count / 11}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            initialPage={first}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
}

export default Specializations;
