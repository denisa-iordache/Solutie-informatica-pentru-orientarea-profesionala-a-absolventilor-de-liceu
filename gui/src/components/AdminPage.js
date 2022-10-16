import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Modal, ButtonGroup, Table } from "react-bootstrap";
import HeaderAdmin from "./HeaderAdmin";
import Footer from "./Footer";

export default function AdminPage() {
  const [content, setContent] = useState(
    <div>
      <img
        className="d-block w-100"
        src="undraw_software_engineer_re_tnjc.svg"
        alt="Forth slide"
      />
    </div>
  );
  const [comments, setComments] = useState(null);

  const [regions, setRegions] = useState(null);
  const nameRef = useRef();
  const nameRefAdd = useRef();
  const [region, setRegion] = useState(null);

  const [domains, setDomains] = useState(null);
  const nameRefDomain = useRef();
  const nameRefDomainAdd = useRef();
  const [domain, setDomain] = useState(null);

  const [universities, setUniversities] = useState(null);
  const nameRefUniversity = useRef();
  const nameRefUniversityAdd = useRef();
  const nameRefUniversityStatut = useRef();
  const nameRefUniversityStatutAdd = useRef();
  const [university, setUniversity] = useState(null);

  const [cities, setCities] = useState(null);
  const nameRefCity = useRef();
  const nameRefCityReg = useRef();
  const nameRefCityAdd = useRef();
  const nameRefCityAddReg = useRef();
  const [city, setCity] = useState(null);

  const [branches, setBranches] = useState(null);
  const nameRefBranch = useRef();
  const nameRefBranchDom = useRef();
  const nameRefBranchAdd = useRef();
  const nameRefBranchAddDom = useRef();
  const [branch, setBranch] = useState(null);

  const [faculties, setFaculties] = useState(null);
  const nameRefFaculty = useRef();
  const nameRefFacultyUniv = useRef();
  const nameRefFacultyCity = useRef();
  const nameRefFacultyAdd = useRef();
  const nameRefFacultyAddUniv = useRef();
  const nameRefFacultyAddCity = useRef();
  const nameRefFacultyLink = useRef();
  const nameRefFacultyLinkAdd = useRef();
  const nameRefFacultyTaxa = useRef();
  const nameRefFacultyTaxaAdd = useRef();
  const [faculty, setFaculty] = useState(null);

  const [specializationsTable, setSpecializationsTable] = useState(null);
  const nameRefSpecialization = useRef();
  const nameRefSpecializationFac = useRef();
  const nameRefSpecializationRam = useRef();
  const nameRefSpecializationAdd = useRef();
  const nameRefSpecializationFacAdd = useRef();
  const nameRefSpecializationRamAdd = useRef();
  const nameRefSpecializationUniv = useRef();
  const nameRefSpecializationUnivAdd = useRef();
  const nameRefSpecializationNB = useRef();
  const nameRefSpecializationNBAdd = useRef();
  const nameRefSpecializationNT = useRef();
  const nameRefSpecializationNTAdd = useRef();
  const nameRefSpecializationUMB = useRef();
  const nameRefSpecializationUMBAdd = useRef();
  const nameRefSpecializationUMT = useRef();
  const nameRefSpecializationUMTAdd = useRef();
  const [specialization, setSpecialization] = useState(null);

  const [reg, setReg] = useState(null);
  const [regUpdate, setRegUpdate] = useState(null);

  const [br, setBr] = useState(null);
  const [brUpdate, setBrUpdate] = useState(null);

  const [univ, setUniv] = useState(null);
  const [univUpdate, setUnivUpdate] = useState(null);

  const [cit, setCit] = useState(null);
  const [citUpdate, setCitUpdate] = useState(null);

  const [univS, setUnivS] = useState(null);
  const [univSUpdate, setUnivSUpdate] = useState(null);

  const [fac, setFac] = useState(null);
  const [facUpdate, setFacUpdate] = useState(null);

  const [ram, setRam] = useState(null);
  const [ramUpdate, setRamUpdate] = useState(null);

  const [showRegion, setShowRegion] = useState(false);
  const [showRegionAdd, setShowRegionAdd] = useState(false);
  const handleCloseRegion = () => setShowRegion(false);
  const handleShowRegion = () => setShowRegion(true);
  const handleCloseRegionAdd = () => setShowRegionAdd(false);
  const handleShowRegionAdd = () => setShowRegionAdd(true);

  const [showDomain, setShowDomain] = useState(false);
  const [showDomainAdd, setShowDomainAdd] = useState(false);
  const handleCloseDomain = () => setShowDomain(false);
  const handleShowDomain = () => setShowDomain(true);
  const handleCloseDomainAdd = () => setShowDomainAdd(false);
  const handleShowDomainAdd = () => setShowDomainAdd(true);

  const [showUniversity, setShowUniversity] = useState(false);
  const [showUniversityAdd, setShowUniversityAdd] = useState(false);
  const handleCloseUniversity = () => setShowUniversity(false);
  const handleShowUniversity = () => setShowUniversity(true);
  const handleCloseUniversityAdd = () => setShowUniversityAdd(false);
  const handleShowUniversityAdd = () => setShowUniversityAdd(true);

  const [showCity, setShowCity] = useState(false);
  const [showCityAdd, setShowCityAdd] = useState(false);
  const handleCloseCity = () => setShowCity(false);
  const handleShowUCity = () => setShowCity(true);
  const handleCloseCityAdd = () => setShowCityAdd(false);
  const handleShowCityAdd = () => setShowCityAdd(true);

  const [showBranch, setShowBranch] = useState(false);
  const [showBranchAdd, setShowBranchAdd] = useState(false);
  const handleCloseBranch = () => setShowBranch(false);
  const handleShowUBranch = () => setShowBranch(true);
  const handleCloseBranchAdd = () => setShowBranchAdd(false);
  const handleShowBranchAdd = () => setShowBranchAdd(true);

  const [showFaculty, setShowFaculty] = useState(false);
  const [showFacultyAdd, setShowFacultyAdd] = useState(false);
  const handleCloseFaculty = () => setShowFaculty(false);
  const handleShowUFaculty = () => setShowFaculty(true);
  const handleCloseFacultyAdd = () => setShowFacultyAdd(false);
  const handleShowFacultyAdd = () => setShowFacultyAdd(true);

  const [showSpecialization, setShowSpecialization] = useState(false);
  const [showSpecializationAdd, setShowSpecializationAdd] = useState(false);
  const handleCloseSpecialization = () => setShowSpecialization(false);
  const handleShowUSpecialization = () => setShowSpecialization(true);
  const handleCloseSpecializationAdd = () => setShowSpecializationAdd(false);
  const handleShowSpecializationAdd = () => setShowSpecializationAdd(true);

  const getComments = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/comments`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  };

  const getRegions = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/regions`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setRegions(data);
      });
  };

  const getRegion = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/regions/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setRegion(data);
      });
  };

  const putRegion = (id) => {
    const postData = {
      nume: nameRef.current.value,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/regions/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const postRegion = () => {
    const postData = {
      nume: nameRefAdd.current.value,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/regions`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const getDomains = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/domains`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDomains(data);
      });
  };

  const getDomain = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/domains/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDomain(data);
      });
  };

  const putDomain = (id) => {
    const postData = {
      nume: nameRefDomain.current.value,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/domains/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const postDomain = () => {
    const postData = {
      nume: nameRefDomainAdd.current.value,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/domains`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const getUniversities = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/universities`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUniversities(data);
      });
  };

  const getUniversity = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/universities/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUniversity(data);
      });
  };

  const putUniversity = (id) => {
    const postData = {
      nume: nameRefUniversity.current.value,
      statut: nameRefUniversityStatut.current.value,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/universities/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const postUniversity = () => {
    const postData = {
      nume: nameRefUniversityAdd.current.value,
      statut: nameRefUniversityStatutAdd.current.value,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/universities`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const getCities = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/citiesRegions`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      });
  };

  const getCity = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/citiesRegions/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCity(data);
      });
  };

  const putCity = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/regionsName/${nameRefCityReg.current.value}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setRegUpdate(data);
      });

    const postData = {
      nume: nameRefCity.current.value,
      id_regiune: regUpdate[0].id,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/citiesRegions/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const postCity = () => {
    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/regionsName/${nameRefCityAddReg.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setReg(data);
      });

    const postData = {
      nume: nameRefCityAdd.current.value,
      id_regiune: reg[0].id,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/citiesRegions`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const getBranches = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/branchesDomain`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBranches(data);
      });
  };

  const getBranch = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/branchesDomain/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBranch(data);
      });
  };

  const putBranch = (id) => {
    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/domainName/${nameRefBranchDom.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBrUpdate(data);
      });

    const postData = {
      nume: nameRefBranch.current.value,
      id_domeniu: brUpdate[0].id,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/branchesDomain/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const postBranch = () => {
    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/domainName/${nameRefBranchAddDom.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBr(data);
      });

    const postData = {
      nume: nameRefBranchAdd.current.value,
      id_domeniu: br[0].id,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/branchesDomain`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const getSpecializationsTable = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/specializationsFacRam`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setSpecializationsTable(data);
      });
  };

  const getSpecialization = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/specializationsFacRam/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setSpecialization(data);
      });
  };

  const putSpecialization = (id) => {
    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/universityName/${nameRefSpecializationUniv.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUnivSUpdate(data);
      });
    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/facultyName/${nameRefSpecializationFac.current.value}/${univSUpdate[0].id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFacUpdate(data);
      });

    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/branchName/${nameRefSpecializationRam.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRamUpdate(data);
      });

    const postData = {
      nume: nameRefSpecialization.current.value,
      numar_locuri_buget: nameRefSpecializationNB.current.value,
      numar_locuri_taxa: nameRefSpecializationNT.current.value,
      ultima_medie_buget: nameRefSpecializationUMB.current.value,
      ultima_medie_taxa: nameRefSpecializationUMT.current.value,
      id_facultate: facUpdate[0].id,
      id_ramura: ramUpdate[0].id,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/specializationsFacRam/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const postSpecialization = () => {
    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/universityName/${nameRefSpecializationUnivAdd.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUnivS(data);
      });
    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/facultyName/${nameRefSpecializationFacAdd.current.value}/${univS[0].id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFac(data);
      });

    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/branchName/${nameRefSpecializationRamAdd.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRam(data);
      });

    const postData = {
      nume: nameRefSpecializationAdd.current.value,
      numar_locuri_buget: nameRefSpecializationNBAdd.current.value,
      numar_locuri_taxa: nameRefSpecializationNTAdd.current.value,
      ultima_medie_buget: nameRefSpecializationUMBAdd.current.value,
      ultima_medie_taxa: nameRefSpecializationUMTAdd.current.value,
      id_facultate: fac[0].id,
      id_ramura: ram[0].id,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/specializationsFacRam`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const getFaculties = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/facultyUnivCity`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFaculties(data);
      });
  };

  const getFaculty = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/facultyUnivCity/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFaculty(data);
      });
  };

  const putFaculty = (id) => {
    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/universityName/${nameRefFacultyUniv.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUnivUpdate(data);
      });

    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/cityName/${nameRefFacultyCity.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCitUpdate(data);
      });

    const postData = {
      nume: nameRefFaculty.current.value,
      link: nameRefFacultyLink.current.value,
      taxa_anuala: nameRefFacultyTaxa.current.value,
      id_universitate: univUpdate[0].id,
      id_oras: citUpdate[0].id,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/facultyUnivCity/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const postFaculty = () => {
    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/universityName/${nameRefFacultyAddUniv.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUniv(data);
      });

    fetch(
      `${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/cityName/${nameRefFacultyAddCity.current.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCit(data);
      });

    const postData = {
      nume: nameRefFacultyAdd.current.value,
      link: nameRefFacultyLinkAdd.current.value,
      taxa_anuala: nameRefFacultyTaxaAdd.current.value,
      id_universitate: univ[0].id,
      id_oras: cit[0].id,
    };

    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/facultyUnivCity`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json());
  };

  const handleDelete = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/comments/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const handleDeleteRegions = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/regions/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const handleDeleteDomains = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/domains/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const handleDeleteUniversities = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/universities/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const handleDeleteCities = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/cities/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const handleDeleteBranches = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/branches/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const handleDeleteFaculties = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/facultyUnivCity/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const handleDeleteSpecializations = (id) => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/specializationsFacRam/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const handleAprove = (id) => {
    const postData = {
      status: "Aprobat",
    };
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/comments/${id}`, {
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
  };

  useEffect(() => {
    getComments();
    getRegions();
    getDomains();
    getUniversities();
    getCities();
    getBranches();
    getFaculties();
    getSpecializationsTable();
  }, []);

  const buildTableComments = () => {
    let result = [];
    if (comments) {
      for (let i = 0; i < comments.length; i++) {
        result.push(
          <tr>
            <td>{comments[i].id}</td>
            <td>{comments[i].continut}</td>
            <td>{comments[i].data}</td>
            <td>{comments[i].autor}</td>
            <td>{comments[i].specializare}</td>
            <td>{comments[i].parinte}</td>
            <td>{comments[i].status}</td>
            <td>
              <Button
                variant="outline-danger"
                className="mb-5 rounded"
                onClick={() => {
                  handleDelete(comments[i].id);
                  window.location.reload();
                }}
              >
                Șterge comentariu
              </Button>
              {comments[i].status === "In asteptare" && (
                <Button
                  variant="outline-success"
                  className="mb-5 rounded"
                  onClick={() => {
                    handleAprove(comments[i].id);
                    window.location.reload();
                  }}
                >
                  Aprobă comentariu
                </Button>
              )}
            </td>
          </tr>
        );
      }
      return result;
    }
  };

  const buildTableRegions = () => {
    let result = [];
    if (regions) {
      for (let i = 0; i < regions.length; i++) {
        result.push(
          <tr>
            <td>{regions[i].id}</td>
            <td>{regions[i].nume}</td>
            <td className="d-flex">
              <Button
                variant="outline-danger"
                className="m-1 rounded"
                onClick={() => {
                  handleDeleteRegions(regions[i].id);
                  window.location.reload();
                }}
              >
                Șterge regiune
              </Button>
              <Button
                variant="outline-success"
                className="m-1 rounded"
                onClick={() => {
                  handleShowRegion();
                  getRegion(regions[i].id);
                }}
              >
                Editează regiune
              </Button>
            </td>
          </tr>
        );
      }
    }
    return result;
  };

  const buildTableDomains = () => {
    let result = [];
    if (domains) {
      for (let i = 0; i < domains.length; i++) {
        result.push(
          <tr>
            <td>{domains[i].id}</td>
            <td>{domains[i].nume}</td>
            <td className="d-flex">
              <Button
                variant="outline-danger"
                className="m-1 rounded"
                onClick={() => {
                  handleDeleteDomains(domains[i].id);
                  window.location.reload();
                }}
              >
                Șterge domeniu
              </Button>
              <Button
                variant="outline-success"
                className="m-1 rounded"
                onClick={() => {
                  handleShowDomain();
                  getDomain(domains[i].id);
                }}
              >
                Editează domeniu
              </Button>
            </td>
          </tr>
        );
      }
    }
    return result;
  };

  const buildTableUniversities = () => {
    let result = [];
    if (universities) {
      for (let i = 0; i < universities.length; i++) {
        result.push(
          <tr>
            <td>{universities[i].id}</td>
            <td>{universities[i].nume}</td>
            <td>{universities[i].statut}</td>
            <td className="d-flex">
              <Button
                variant="outline-danger"
                className="m-1 rounded"
                onClick={() => {
                  handleDeleteUniversities(universities[i].id);
                  window.location.reload();
                }}
              >
                Șterge universitate
              </Button>
              <Button
                variant="outline-success"
                className="m-1 rounded"
                onClick={() => {
                  handleShowUniversity();
                  getUniversity(universities[i].id);
                }}
              >
                Editează universitate
              </Button>
            </td>
          </tr>
        );
      }
    }
    return result;
  };

  const buildTableCities = () => {
    let result = [];
    if (cities) {
      for (let i = 0; i < cities.length; i++) {
        result.push(
          <tr>
            <td>{cities[i].id}</td>
            <td>{cities[i].oras}</td>
            <td>{cities[i].regiune}</td>
            <td className="d-flex">
              <Button
                variant="outline-danger"
                className="m-1 rounded"
                onClick={() => {
                  handleDeleteCities(cities[i].id);
                  window.location.reload();
                }}
              >
                Șterge oraș
              </Button>
              <Button
                variant="outline-success"
                className="m-1 rounded"
                onClick={() => {
                  handleShowUCity();
                  getCity(cities[i].id);
                }}
              >
                Editează oraș
              </Button>
            </td>
          </tr>
        );
      }
    }
    return result;
  };

  const buildTableBranches = () => {
    let result = [];
    if (branches) {
      for (let i = 0; i < branches.length; i++) {
        result.push(
          <tr>
            <td>{branches[i].id}</td>
            <td>{branches[i].ramura}</td>
            <td>{branches[i].domeniu}</td>
            <td className="d-flex">
              <Button
                variant="outline-danger"
                className="m-1 rounded"
                onClick={() => {
                  handleDeleteBranches(branches[i].id);
                  window.location.reload();
                }}
              >
                Șterge ramură
              </Button>
              <Button
                variant="outline-success"
                className="m-1 rounded"
                onClick={() => {
                  handleShowUBranch();
                  getBranch(branches[i].id);
                }}
              >
                Editează ramură
              </Button>
            </td>
          </tr>
        );
      }
    }
    return result;
  };

  const buildTableFaculties = () => {
    let result = [];
    if (faculties) {
      for (let i = 0; i < faculties.length; i++) {
        result.push(
          <tr>
            <td>{faculties[i].id}</td>
            <td>{faculties[i].facultate}</td>
            <td>
              <a href={`${faculties[i].link}`}>{faculties[i].link}</a>
            </td>
            <td>{faculties[i].taxa_anuala}</td>
            <td>{faculties[i].universitate}</td>
            <td>{faculties[i].oras}</td>
            <td className="d-flex">
              <Button
                variant="outline-danger"
                className="m-1 rounded"
                onClick={() => {
                  handleDeleteFaculties(faculties[i].id);
                  window.location.reload();
                }}
              >
                Șterge facultate
              </Button>
              <Button
                variant="outline-success"
                className="m-1 rounded"
                onClick={() => {
                  handleShowUFaculty();
                  getFaculty(faculties[i].id);
                }}
              >
                Editează facultate
              </Button>
            </td>
          </tr>
        );
      }
    }
    return result;
  };

  const buildTableSpecializations = () => {
    let result = [];
    if (specializationsTable) {
      for (let i = 0; i < specializationsTable.length; i++) {
        result.push(
          <tr>
            <td>{specializationsTable[i].id}</td>
            <td>{specializationsTable[i].specializare}</td>
            <td>{specializationsTable[i].numar_locuri_buget}</td>
            <td>{specializationsTable[i].numar_locuri_taxa}</td>
            <td>{specializationsTable[i].ultima_medie_buget}</td>
            <td>{specializationsTable[i].ultima_medie_taxa}</td>
            <td>{specializationsTable[i].facultate}</td>
            <td>{specializationsTable[i].universitate}</td>
            <td>{specializationsTable[i].ramura}</td>
            <td className="d-flex flex-column">
              <Button
                variant="outline-danger"
                className="m-1 rounded"
                onClick={() => {
                  handleDeleteSpecializations(specializationsTable[i].id);
                  window.location.reload();
                }}
              >
                Șterge specializare
              </Button>
              <Button
                variant="outline-success"
                className="m-1 rounded"
                onClick={() => {
                  handleShowUSpecialization();
                  getSpecialization(specializationsTable[i].id);
                }}
              >
                Editează specializare
              </Button>
            </td>
          </tr>
        );
      }
    }
    return result;
  };

  return (
    <>
      <HeaderAdmin />
      <div
        className="d-md-grid shadow-lg"
        style={{
          gridTemplateColumns: "1fr 5fr",
          position: "relative",
          zIndex: "1",
          marginBottom: "100px",
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      >
        <Modal show={showRegion} onHide={handleCloseRegion} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Editează regiunea </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {region && (
              <Form.Group id="name">
                <Form.Label>Denumire regiune</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRef}
                  required
                  defaultValue={region.nume}
                ></Form.Control>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseRegion}
            >
              Anulează
            </Button>
            {region && (
              <Button
                className="btn btn-success w-25"
                onClick={() => {
                  putRegion(region.id);
                  window.location.reload();
                }}
              >
                Salvează
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal
          show={showRegionAdd}
          onHide={handleCloseRegionAdd}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adaugă o regiune </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="name1">
              <Form.Label>Denumire regiune</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefAdd}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseRegionAdd}
            >
              Anulează
            </Button>
            <Button
              className="btn btn-success w-25"
              onClick={() => {
                postRegion();
                window.location.reload();
              }}
            >
              Adaugă
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDomain} onHide={handleCloseDomain} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Editează domeniul </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {domain && (
              <Form.Group id="name2">
                <Form.Label>Denumire domeniu</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefDomain}
                  required
                  defaultValue={domain.nume}
                ></Form.Control>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseDomain}
            >
              Anulează
            </Button>
            {domain && (
              <Button
                className="btn btn-success w-25"
                onClick={() => {
                  putDomain(domain.id);
                  window.location.reload();
                }}
              >
                Salvează
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal
          show={showDomainAdd}
          onHide={handleCloseDomainAdd}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adaugă un domeniu </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="name3">
              <Form.Label>Denumire domeniu</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefDomainAdd}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseDomainAdd}
            >
              Anulează
            </Button>
            <Button
              className="btn btn-success w-25"
              onClick={() => {
                postDomain();
                window.location.reload();
              }}
            >
              Adaugă
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showUniversity}
          onHide={handleCloseUniversity}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editează universitatea </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {university && (
              <Form.Group id="name4">
                <Form.Label>Denumire universitate</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefUniversity}
                  required
                  defaultValue={university.nume}
                ></Form.Control>
                <Form.Label>Statut</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefUniversityStatut}
                  required
                  defaultValue={university.statut}
                ></Form.Control>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseUniversity}
            >
              Anulează
            </Button>
            {university && (
              <Button
                className="btn btn-success w-25"
                onClick={() => {
                  putUniversity(university.id);
                  window.location.reload();
                }}
              >
                Salvează
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal
          show={showUniversityAdd}
          onHide={handleCloseUniversityAdd}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adaugă o universitate </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="name5">
              <Form.Label>Denumire universitate</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefUniversityAdd}
              ></Form.Control>
              <Form.Label>Statut</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefUniversityStatutAdd}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseUniversityAdd}
            >
              Anulează
            </Button>
            <Button
              className="btn btn-success w-25"
              onClick={() => {
                postUniversity();
                window.location.reload();
              }}
            >
              Adaugă
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showCity} onHide={handleCloseCity} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Editează orașul </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {city && (
              <Form.Group id="name6">
                <Form.Label>Denumire oraș</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefCity}
                  required
                  defaultValue={city[0].oras}
                ></Form.Control>
                <Form.Label>Denumire regiune</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefCityReg}
                  required
                  defaultValue={city[0].regiune}
                ></Form.Control>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button className="btn btn-warning w-25" onClick={handleCloseCity}>
              Anulează
            </Button>
            {city && (
              <Button
                className="btn btn-success w-25"
                onClick={() => {
                  putCity(city[0].id);
                  window.location.reload();
                }}
              >
                Salvează
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal show={showCityAdd} onHide={handleCloseCityAdd} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Adaugă un oraș </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="name7">
              <Form.Label>Denumire oraș</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefCityAdd}
              ></Form.Control>
              <Form.Label>Denumire regiune</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefCityAddReg}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseCityAdd}
            >
              Anulează
            </Button>
            <Button
              className="btn btn-success w-25"
              onClick={() => {
                postCity();
                window.location.reload();
              }}
            >
              Adaugă
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showBranch} onHide={handleCloseBranch} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Editează ramura </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {branch && (
              <Form.Group id="name8">
                <Form.Label>Denumire ramură</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefBranch}
                  required
                  defaultValue={branch[0].ramura}
                ></Form.Control>
                <Form.Label>Denumire domeniu</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefBranchDom}
                  required
                  defaultValue={branch[0].domeniu}
                ></Form.Control>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseBranch}
            >
              Anulează
            </Button>
            {branch && (
              <Button
                className="btn btn-success w-25"
                onClick={() => {
                  putBranch(branch[0].id);
                  window.location.reload();
                }}
              >
                Salvează
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal
          show={showBranchAdd}
          onHide={handleCloseBranchAdd}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adaugă o ramură </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="name1">
              <Form.Label>Denumire ramură</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefBranchAdd}
              ></Form.Control>
              <Form.Label>Denumire domeniu</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefBranchAddDom}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseBranchAdd}
            >
              Anulează
            </Button>
            <Button
              className="btn btn-success w-25"
              onClick={() => {
                postBranch();
                window.location.reload();
              }}
            >
              Adaugă
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showFaculty} onHide={handleCloseFaculty} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Editează facultate </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {faculty && (
              <Form.Group id="name9">
                <Form.Label>Denumire facultate</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefFaculty}
                  required
                  defaultValue={faculty[0].facultate}
                ></Form.Control>
                <Form.Label>Link</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefFacultyLink}
                  required
                  defaultValue={faculty[0].link}
                ></Form.Control>
                <Form.Label>Taxa anuală</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefFacultyTaxa}
                  required
                  defaultValue={faculty[0].taxa_anuala}
                ></Form.Control>
                <Form.Label>Universitate</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefFacultyUniv}
                  required
                  defaultValue={faculty[0].universitate}
                ></Form.Control>
                <Form.Label>Oras</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefFacultyCity}
                  required
                  defaultValue={faculty[0].oras}
                ></Form.Control>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseFaculty}
            >
              Anulează
            </Button>
            {faculty && (
              <Button
                className="btn btn-success w-25"
                onClick={() => {
                  putFaculty(faculty[0].id);
                  window.location.reload();
                }}
              >
                Salvează
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal
          show={showFacultyAdd}
          onHide={handleCloseFacultyAdd}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adaugă o facultate </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="name1">
              <Form.Label>Denumire facultate</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefFacultyAdd}
              ></Form.Control>
              <Form.Label>Link</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefFacultyLinkAdd}
              ></Form.Control>
              <Form.Label>Taxa anuală</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefFacultyTaxaAdd}
              ></Form.Control>
              <Form.Label>Universitate</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefFacultyAddUniv}
              ></Form.Control>
              <Form.Label>Oras</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefFacultyAddCity}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseFacultyAdd}
            >
              Anulează
            </Button>
            <Button
              className="btn btn-success w-25"
              onClick={() => {
                postFaculty();
                window.location.reload();
              }}
            >
              Adaugă
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showSpecialization}
          onHide={handleCloseSpecialization}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editează specializare </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {specialization && (
              <Form.Group id="name9">
                <Form.Label>Denumire specializare</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefSpecialization}
                  required
                  defaultValue={specialization[0].specializare}
                ></Form.Control>
                <Form.Label>Număr locuri buget</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefSpecializationNB}
                  required
                  defaultValue={specialization[0].numar_locuri_buget}
                ></Form.Control>
                <Form.Label>Număr locuri taxă</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefSpecializationNT}
                  required
                  defaultValue={specialization[0].numar_locuri_taxa}
                ></Form.Control>
                <Form.Label>Ultima medie buget</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefSpecializationUMB}
                  required
                  defaultValue={specialization[0].ultima_medie_buget}
                ></Form.Control>
                <Form.Label>Ultima medie taxă</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefSpecializationUMT}
                  required
                  defaultValue={specialization[0].ultima_medie_taxa}
                ></Form.Control>
                <Form.Label>Facultate</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefSpecializationFac}
                  required
                  defaultValue={specialization[0].facultate}
                ></Form.Control>
                <Form.Label>Universitate</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefSpecializationUniv}
                  required
                  defaultValue={specialization[0].universitate}
                ></Form.Control>
                <Form.Label>Ramura</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="text"
                  ref={nameRefSpecializationRam}
                  required
                  defaultValue={specialization[0].ramura}
                ></Form.Control>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseSpecialization}
            >
              Anulează
            </Button>
            {specialization && (
              <Button
                className="btn btn-success w-25"
                onClick={() => {
                  putSpecialization(specialization[0].id);
                  window.location.reload();
                }}
              >
                Salvează
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        <Modal
          show={showSpecializationAdd}
          onHide={handleCloseSpecializationAdd}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adaugă o specializare </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="name9">
              <Form.Label>Denumire specializare</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefSpecializationAdd}
              ></Form.Control>
              <Form.Label>Număr locuri buget</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefSpecializationNBAdd}
              ></Form.Control>
              <Form.Label>Număr locuri taxă</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefSpecializationNTAdd}
              ></Form.Control>
              <Form.Label>Ultima medie buget</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefSpecializationUMBAdd}
              ></Form.Control>
              <Form.Label>Ultima medie taxă</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefSpecializationUMTAdd}
              ></Form.Control>
              <Form.Label>Facultate</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefSpecializationFacAdd}
              ></Form.Control>
              <Form.Label>Universitate</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefSpecializationUnivAdd}
              ></Form.Control>
              <Form.Label>Ramura</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                ref={nameRefSpecializationRamAdd}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button
              className="btn btn-warning w-25"
              onClick={handleCloseSpecializationAdd}
            >
              Anulează
            </Button>
            <Button
              className="btn btn-success w-25"
              onClick={() => {
                postSpecialization();
                window.location.reload();
              }}
            >
              Adaugă
            </Button>
          </Modal.Footer>
        </Modal>

        <div
          className="d-flex flex-column align-items-center border border-2"
          style={{
            background: "white",
          }}
        >
          <ButtonGroup vertical style={{ width: "90%" }}>
            <Button
              variant="outline-primary"
              className="mt-3 mb-5 rounded"
              onClick={() => {
                setContent(
                  <div>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id comentariu</th>
                          <th>Conținut</th>
                          <th>Data</th>
                          <th>Autor</th>
                          <th>Specializare</th>
                          <th>Comentariu părinte</th>
                          <th>Status</th>
                          <th>Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>{buildTableComments()}</tbody>
                    </Table>
                  </div>
                );
              }}
            >
              Comentarii
            </Button>
            <Button
              variant="outline-primary"
              className="mb-5 rounded"
              onClick={() => {
                setContent(
                  <div className="d-flex flex-column justify-content-center">
                    <Button
                      variant="outline-primary"
                      className="m-1 mb-3 rounded"
                      onClick={() => {
                        handleShowRegionAdd();
                      }}
                    >
                      Adaugă o regiune
                    </Button>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id regiune</th>
                          <th>Denumire regiune</th>
                          <th>Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>{buildTableRegions()}</tbody>
                    </Table>
                  </div>
                );
              }}
            >
              Regiuni
            </Button>
            <Button
              variant="outline-primary"
              className="mb-5 rounded"
              onClick={() => {
                setContent(
                  <div className="d-flex flex-column justify-content-center">
                    <Button
                      variant="outline-primary"
                      className="m-1 mb-3 rounded"
                      onClick={() => {
                        handleShowCityAdd();
                      }}
                    >
                      Adaugă un oraș
                    </Button>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id oraș</th>
                          <th>Denumire oraș</th>
                          <th>Denumire regiune</th>
                          <th>Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>{buildTableCities()}</tbody>
                    </Table>
                  </div>
                );
              }}
            >
              Orașe
            </Button>
            <Button
              variant="outline-primary"
              className="mb-5 rounded"
              onClick={() => {
                setContent(
                  <div className="d-flex flex-column justify-content-center">
                    <Button
                      variant="outline-primary"
                      className="m-1 mb-3 rounded"
                      onClick={() => {
                        handleShowDomainAdd();
                      }}
                    >
                      Adaugă un domeniu
                    </Button>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id domeniu</th>
                          <th>Denumire domeniu</th>
                          <th>Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>{buildTableDomains()}</tbody>
                    </Table>
                  </div>
                );
              }}
            >
              Domenii
            </Button>
            <Button
              variant="outline-primary"
              className="mb-5 rounded"
              onClick={() => {
                setContent(
                  <div className="d-flex flex-column justify-content-center">
                    <Button
                      variant="outline-primary"
                      className="m-1 mb-3 rounded"
                      onClick={() => {
                        handleShowBranchAdd();
                      }}
                    >
                      Adaugă o ramură
                    </Button>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id ramură</th>
                          <th>Denumire ramură</th>
                          <th>Denumire domeniu</th>
                          <th>Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>{buildTableBranches()}</tbody>
                    </Table>
                  </div>
                );
              }}
            >
              Ramuri
            </Button>
            <Button
              variant="outline-primary"
              className="mb-5 rounded"
              onClick={() => {
                setContent(
                  <div className="d-flex flex-column justify-content-center">
                    <Button
                      variant="outline-primary"
                      className="m-1 mb-3 rounded"
                      onClick={() => {
                        handleShowUniversityAdd();
                      }}
                    >
                      Adaugă o universitate
                    </Button>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id universitate</th>
                          <th>Denumire universitate</th>
                          <th>Statut</th>
                          <th>Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>{buildTableUniversities()}</tbody>
                    </Table>
                  </div>
                );
              }}
            >
              Universități
            </Button>
            <Button
              variant="outline-primary"
              className="mb-5 rounded"
              onClick={() => {
                setContent(
                  <div className="d-flex flex-column justify-content-center">
                    <Button
                      variant="outline-primary"
                      className="m-1 mb-3 rounded"
                      onClick={() => {
                        handleShowFacultyAdd();
                      }}
                    >
                      Adaugă o facultate
                    </Button>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id facultate</th>
                          <th>Denumire facultate</th>
                          <th>Link</th>
                          <th>Taxa anuală</th>
                          <th>Universitate</th>
                          <th>Oraș</th>
                          <th>Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>{buildTableFaculties()}</tbody>
                    </Table>
                  </div>
                );
              }}
            >
              Facultăți
            </Button>
            <Button
              variant="outline-primary"
              className="mb-5 rounded"
              onClick={() => {
                setContent(
                  <div className="d-flex flex-column justify-content-center">
                    <Button
                      variant="outline-primary"
                      className="m-1 mb-3 rounded"
                      onClick={() => {
                        handleShowSpecializationAdd();
                      }}
                    >
                      Adaugă o specializare
                    </Button>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Id specializare</th>
                          <th>Denumire specializare</th>
                          <th>Numar locuri buget</th>
                          <th>Numar locuri taxa</th>
                          <th>Ultima medie buget</th>
                          <th>Ultima medie buget</th>
                          <th>Facultate</th>
                          <th>Universitate</th>
                          <th>Ramură</th>
                          <th>Acțiuni</th>
                        </tr>
                      </thead>
                      <tbody>{buildTableSpecializations()}</tbody>
                    </Table>
                  </div>
                );
              }}
            >
              Specializări
            </Button>
          </ButtonGroup>
        </div>
        <div className="d-flex flex-column m-3">{content}</div>
      </div>
      <Footer />
    </>
  );
}
