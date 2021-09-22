import React from "react";
import "./App.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

function App() {
  const [fetchData, setFetchData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  React.useState(async () => {
    try {
      var respond = await axios
        .get(`https://api.publicapis.org/categories`)
        .then((response) => {
          return response.data;
        });
      setFetchData(respond);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const dataContentElement = () => {
    if (search !== "") {
      var resultSearch = [];

      for (var i = 0; i < fetchData.length; i++) {
        if (fetchData[i].toLowerCase().includes(search.toLowerCase())) {
          resultSearch.push(fetchData[i]);
        }
      }
      if (resultSearch.length !== 0) {
        return (
          <>
            {resultSearch.map((item, index) => {
              index++;
              return (
                <>
                  <Row
                    key={`${index}RS`}
                    style={{
                      backgroundColor: index % 2 !== 0 ? "#E9E9E9" : "#adcfdb",
                    }}
                  >
                    <Col
                      key={`${+index + item}C1S`}
                      xs={3}
                      className="text-center"
                    >
                      {index}
                    </Col>
                    <Col key={`${+index + item}C2S`} xs className="text-center">
                      {item}
                    </Col>
                  </Row>
                </>
              );
            })}
          </>
        );
      } else {
        return (
          <p style={{ margin: "1rem" }}>
            Your search did not match any categories.
          </p>
        );
      }
    } else {
      return (
        <>
          {fetchData.map((item, index) => {
            index++;
            return (
              <>
                <Row
                  key={`${index}R`}
                  style={{
                    backgroundColor: index % 2 !== 0 ? "#E9E9E9" : "#adcfdb",
                  }}
                >
                  <Col
                    key={`${+index + item}C1`}
                    xs={3}
                    className="text-center"
                  >
                    {index}
                  </Col>
                  <Col key={`${+index + item}C2`} xs className="text-center">
                    {item}
                  </Col>
                </Row>
              </>
            );
          })}
        </>
      );
    }
  };

  return (
    <Row className="App">
      <Col xs className="d-flex justify-content-center align-items-center">
        <div className="Canvas">
          <Row className="dataSearch">
            <Col
              xs={10}
              className="searchBar d-flex justify-content-center align-items-center"
            >
              <input
                className="input"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col xs={2} className="searchIcon">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={30}
                  height={30}
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </Col>
          </Row>
          <Row className="dataTable">
            <Col xs>
              <Row className="mt-2 d-flex justify-content-center align-items-center">
                <Col xs className="dataHeader">
                  <Row>
                    <Col xs={3} className="text-center dataHeaderCell">
                      No.
                    </Col>
                    <Col xs className="text-center dataHeaderCell">
                      Categories
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs className="dataContent">
                  {dataContentElement()}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

export default App;
