import { useEffect, useState } from "react";

import { ClassNameHandler, LastUpdatedHandler } from "../utils";
import Modal from "../utils/modal";
import Chart from "./Chart";

import "../styles/Main.css";

export default function({ cityData }) {
  const [comparisonData, setComparisonData] = useState([]);
  const [magnifyCity, setMagnifyCity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let fitleredCity;

    if (magnifyCity) {
      fitleredCity = cityData.filter((el2) => el2.city === magnifyCity);

      setComparisonData(fitleredCity);
      setShowModal(true);
    }
  }, [cityData, magnifyCity]);

  const handleCompareCities = (item) => {
    if (comparisonData.length === 0) setComparisonData([item]);
    else {
      let index = comparisonData.findIndex((el) => el.city === item.city),
        temp = [...comparisonData];

      if (index < 0) temp.push(item);
      else temp.splice(index, 1);

      setComparisonData([...temp]);
    }
  };

  const handleCityData = () => {
    if (!!cityData) {
      return cityData.map((item, i) => {
        return (
          <tr key={i} className={ClassNameHandler(item.aqi)}>
            <td>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginLeft: "4rem",
                }}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={comparisonData.some((el) => el.city === item.city)}
                    onChange={() => handleCompareCities(item)}
                  />
                  <span
                    className="city-list"
                    onClick={(e) => {
                      e.preventDefault();
                      setMagnifyCity(item.city);
                    }}
                  >
                    {item.city}
                  </span>
                </label>
              </div>
            </td>
            <td>{item.aqi.toFixed(2)}</td>
            <td>{LastUpdatedHandler(item.lastUpdated)}</td>
          </tr>
        );
      });
    }
  };

  const handleModal = () => {
    setShowModal(!showModal);

    if (magnifyCity) {
      setMagnifyCity(null);
      setComparisonData([]);
    }
  };

  const handleSelectAll = () => {
    if (comparisonData.length === cityData.length) setComparisonData([]);
    else setComparisonData([...cityData]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      {showModal && (
        <Modal trigger={handleModal}>
          <Chart data={comparisonData} />
        </Modal>
      )}
      <table>
        <thead>
          <tr>
            <th>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginLeft: "4rem",
                }}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={comparisonData.length === cityData.length}
                    onChange={() => handleSelectAll()}
                  />
                  <span style={{ marginLeft: "3rem" }}>City</span>
                </label>
              </div>
            </th>
            <th>Current AQI</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>{handleCityData()}</tbody>
      </table>
      <button
        onClick={() => handleModal()}
        disabled={comparisonData.length === 0}
      >
        Compare{" "}
        {comparisonData.length > 0 && !magnifyCity ? comparisonData.length : ""}
      </button>
    </div>
  );
}
