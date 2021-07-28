import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import "./Input.css";
import "./Home.css";
import "./Option.css";

import Option from "./Option";
import Input from "./Input";

import axios from "axios";

const Home = () => {
  const [BARTRouteList, setBARTRouteList] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedRoute, setSelectedRoute] = useState({});
  const [showDirection, setShowDirection] = useState(false);
  const [carNum, setCarNum] = useState("");
  const [description, setDescription] = useState("");
  const reportTypes = ["liquid", "solid", "other", "crime"];

  const onTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const onRouteSelect = (e) => {
    let selected = BARTRouteList.find(
      (route) => route.number === e.target.value
    );
    setSelectedRoute(selected);
    setShowDirection(true);
  };

  const reportInputs = reportTypes.map((reportType, index) => (
    <Input
      key={index}
      reportType={reportType}
      onTypeChange={onTypeChange}
      selectedType={selectedType}
    />
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/reports`, {
        rider_id: Math.round(Math.random() * 3) + 1,
        type: selectedType,
        route: selectedRoute.abbr,
        car_number: carNum,
        description: description,
        direction: selectedRoute.direction,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally("Tried to handle submit");
  };

  const getBARTRouteList = useCallback(() => {
    axios
      .get(
        "http://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V&json=y"
      )
      .then((response) => {
        setBARTRouteList(response.data.root.routes.route);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => console.log("Tried to get BART routes"));
  }, []);

  useEffect(() => {
    getBARTRouteList();
  }, [getBARTRouteList]);

  return (
      <>
        <h2>Report an issue</h2>
        <small className="instructions">
          <span className="required">Required items</span> marked with an{" "}
          <span className="required">asterisk *</span>
        </small>
        <form onSubmit={handleSubmit}>
          <fieldset className="report-type-fieldset">
            <legend>
              Type of issue <span className="required">*</span>
            </legend>
            {reportInputs}
          </fieldset>
          <fieldset>
            <legend>Route and car number</legend>
            <label htmlFor="route">
              Route <span className="required">*</span>
            </label>
            <div className="route-selection">
              <select
                required
                name="route"
                id="route"
                onChange={onRouteSelect}
                value={selectedRoute.number}
              >
                <optgroup className="option-group" label="Select a route">
                  {BARTRouteList.map((route, index) => (
                    <Option key={index} {...route} />
                  ))}
                </optgroup>
              </select>
              <div className="route-selected">
                <p>Direction: </p>
                {showDirection && (
                  <p
                    className="direction-text"
                    style={{
                      backgroundColor: selectedRoute.hexcolor,
                      color:
                        selectedRoute.hexcolor === "#FFFF33" ||
                        selectedRoute.hexcolor === "#D5CFA3"
                          ? "var(--app-brown-dark)"
                          : "var(--app-white)",
                    }}
                  >
                    {selectedRoute.abbr} {selectedRoute.direction}
                  </p>
                )}
              </div>
            </div>
            <label htmlFor="car-num">Car Number</label>
            <input
              placeholder="Enter a car number (see above doors connecting cars)"
              maxLength="5"
              name="car-num"
              type="text"
              className="report-input car-num-input"
              value={carNum}
              onChange={(e) => setCarNum(e.target.value)}
            />
          </fieldset>

          <label htmlFor="description-text" value="">
            Description <span className="required">*</span>
          </label>
          <textarea
            required
            placeholder="Describe the issue"
            value={description}
            className="report-input"
            name="description-text"
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </>
  );
};

export default Home;
