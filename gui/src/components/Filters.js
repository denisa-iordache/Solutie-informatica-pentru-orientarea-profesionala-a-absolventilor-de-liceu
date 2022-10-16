import React from "react";
import { ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Filters() {
  const [regions, setRegions] = useState(null);
  const [cities, setCities] = useState(null);
  const [universities, setUniversities] = useState(null);
  const [domains, setDomains] = useState(null);
  const [faculties, setFaculties] = useState(null);
  const [branches, setBranches] = useState(null);

  const getRegions = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/regions`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setRegions(data);
      });
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

  const getDomains = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/domains`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDomains(data);
      });
  };

  const getCities = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/cities`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      });
  };

  const getFaculties = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/faculties`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFaculties(data);
      });
  };

  const getBranches = () => {
    fetch(`${`${window.location.protocol}//${window.location.hostname}:${window.location.port}`}/branches`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBranches(data);
      });
  };

  useEffect(() => {
    getRegions();
    getUniversities();
    getDomains();
    getCities();
    getFaculties();
    getBranches();
  }, []);

  const buildRegionsChecks = () => {
    const regionsChecks = [];
    if (regions) {
      regions.forEach((regiune) => {
        regionsChecks.push(
          <ListGroup.Item>
            <input type="checkbox" style={{ marginRight: "1rem" }} id={`${regiune.nume}`}/>
            {regiune.nume}
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
          <ListGroup.Item>
            <input type="checkbox" style={{ marginRight: "1rem" }} id={`${universitate.nume}`}/>
            {universitate.nume}
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
          <ListGroup.Item>
            <input type="checkbox" style={{ marginRight: "1rem" }} id={`${domeniu.nume}`}/>
            {domeniu.nume}
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
          <ListGroup.Item>
            <input type="checkbox" style={{ marginRight: "1rem" }} id={`${city.nume}`}/>
            {city.nume}
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
          <ListGroup.Item>
            <input type="checkbox" style={{ marginRight: "1rem" }} id={`${faculty.nume}`}/>
            {faculty.nume}
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
          <ListGroup.Item>
            <input
              type="checkbox"
              style={{ marginRight: "1rem" }}
              id={`${branch.nume}`}
            />
            {branch.nume}
          </ListGroup.Item>
        );
      });
    }
    return branchesChecks;
  };

  return (
    <div style={{ width: "33vw", minWidth: "200px", padding: "1rem" }}>
      <ListGroup>
        <ListGroup.Item>
          <h3>Regiune</h3>
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
          <h3>Oras</h3>
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
          <h3>Universitate</h3>
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
          <h3>Facultate</h3>
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
          <h3>Domeniu</h3>
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
          <h3>Ramura</h3>
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
      </ListGroup>
    </div>
  );
}
