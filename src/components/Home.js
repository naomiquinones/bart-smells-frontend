import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import "./Input.css";
import "./Home.css";

// import Input from './Input';

import axios from "axios";

const Home = () => {
  const [selectedType, setSelectedType] = useState("");
  const [BARTRouteList, setBARTRouteList] = useState("");

  const onTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const onRouteSelect = (e) => {
    setBARTRouteList(e.target.value);
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
      .finally(() => console.log("finally"));
  }, []);

  useEffect(() => {
    getBARTRouteList();
  }, [getBARTRouteList]);

  return (
    <>
      <main>
        {/* <Input className="reportInput"
      name="test"
      type="text"
      value="report"
      onChange={(e) => console.log(e.target.value)} /> */}
        <h2>Make Report</h2>
        <form>
          <fieldset className="report-type-fieldset">
            <legend>Type of Issue</legend>
            <input
              type="radio"
              name="report-type"
              id="report-type-1"
              value="liquid"
              checked={selectedType === "liquid"}
              onChange={onTypeChange}
            />
            <label
              className="radio-button-label radio-type-select"
              htmlFor="report-type-1"
            >
              Liquid
            </label>
            <input
              type="radio"
              name="report-type"
              id="report-type-2"
              value="solid"
              checked={selectedType === "solid"}
              onChange={onTypeChange}
            />
            <label
              className="radio-button-label radio-type-select"
              htmlFor="report-type-2"
            >
              Solid
            </label>
            <input
              type="radio"
              name="report-type"
              id="report-type-3"
              value="other"
              checked={selectedType === "other"}
              onChange={onTypeChange}
            />
            <label
              className="radio-button-label radio-type-select"
              htmlFor="report-type-3"
            >
              Other
            </label>
            <input
              type="radio"
              name="report-type"
              id="report-type-4"
              value="crime"
              checked={selectedType === "crime"}
              onChange={onTypeChange}
            />
            <label
              className="radio-button-label radio-type-select"
              htmlFor="report-type-4"
            >
              Crime
            </label>
          </fieldset>
          <fieldset>
            <legend>Route and direction</legend>
            <label htmlFor="route">Select route</label>
            <div className="route-select">
              <select
                name="route"
                id="route"
                onChange={onRouteSelect}
                value={BARTRouteList}
              >
                <option value="liquid">Richmond</option>
              </select>
            </div>
          </fieldset>

          <label htmlFor="description" value="">
            Description
          </label>
          <textarea className="reportInput" name="description" />
          <label htmlFor="route"></label>
          <input name="route" type="text" className="reportInput" />
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
};

export default Home;
