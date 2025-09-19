import React, { useState, useEffect } from "react";
import "../App.css";

const Station = () => {
  const initialStations = () => {
    const stored = localStorage.getItem("stationData");
    return stored
      ? JSON.parse(stored)
      : [
        {
          name: "DN Fairytale",
          connectors: "1",
          status: [{ color: "green", count: 1 }],
          city: "Khorda",
          pincode: "752054",
          state: "Odisha",
          publish: "Yes",
          details: {
            mobile: "9876543210",
            tank: "30000",
            latitude: "20.2961",
            longitude: "85.8245",
            status: "Online",
            type: "Public",
            location: "Durgapur, Khorda Odisha 752054",
          },
        },
      ];
  };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir"
  ];

  const [stations, setStations] = useState(initialStations);
  const [filteredStations, setFilteredStations] = useState(initialStations);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("Chargers");
  const [selectedState, setSelectedState] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");


  const [newStation, setNewStation] = useState({
    name: "",
    connectors: "",
    city: "",
    pincode: "",
    state: "",
    publish: "",
    status: [{ color: "green", count: 0 }],
    details: {
      mobile: "",
      tank: "",
      latitude: "",
      longitude: "",
      status: "Online",
      type: "Public",
      location: "",
    },
  });

  useEffect(() => {
  localStorage.setItem("stationData", JSON.stringify(stations));
  applyFilter(selectedState, searchQuery);
}, [stations]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    applyFilter(state);
  };

  const applyFilter = (state, query = searchQuery) => {
  let result = stations;

  if (state !== "all") {
    result = result.filter((item) => item.state === state);
  }

  if (query.trim() !== "") {
    const lowerQuery = query.toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.city.toLowerCase().includes(lowerQuery)
    );
  }

  setFilteredStations(result);
};


  const handleAddStation = (e) => {
    e.preventDefault();
    setStations([...stations, newStation]);
    setNewStation({
      name: "",
      connectors: "",
      city: "",
      pincode: "",
      state: "",
      publish: "",
      status: [{ color: "green", count: 0 }],
      details: {
        mobile: "",
        tank: "",
        latitude: "",
        longitude: "",
        status: "Online",
        type: "Public",
        location: "",
      },
    });
    setShowAddForm(false);
  };

  const handleDeleteStation = () => {
    if (!selectedStation) return;
    setStations((prev) => prev.filter((s) => s.name !== selectedStation.name));
    setSelectedStation(null);
  };

  return (
    <div className="station-container">
      <div className="station-header">
        <h2>
          Stations
        </h2>
        <div className="filter-row">
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="action-btn outline"
          >
            <option value="all">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="station-header-actions">
          <div className="station-right">
            <input
              type="text"
              className="sation-data"
              placeholder="Search by station name or city"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                applyFilter(selectedState, e.target.value);
              }}
            />

          </div>
          <button className="station-add-btn" onClick={() => setShowAddForm(true)}>
            + Add
          </button>
          <span className="station-total">
            Total Stations: {filteredStations.length}
          </span>
        </div>
      </div>
      {/* Station Table */}
      <div className="station-table-wrapper">
        <table className="station-table">
          <thead>
            <tr>
              <th>Station Name</th>
              <th>Total Connectors</th>
              <th>Connector Status</th>
              <th>City</th>
              <th>Pincode</th>
              <th>State</th>
              <th>Publish</th>
            </tr>
          </thead>
          <tbody>
            {filteredStations.map((station, index) => (
              <tr
                key={index}
                onClick={() => setSelectedStation(station)}
                className="station-table-row"
              >
                <td>{station.name}</td>
                <td className="station-center">{station.connectors}</td>
                <td>
                  <div className="station-status-container">
                    {station.status.map((s, idx) => (
                      <span
                        key={idx}
                        className={`station-status-badge ${s.color}`}
                      >
                        <span className="station-dot"></span> {s.count}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{station.city}</td>
                <td>{station.pincode}</td>
                <td>{station.state}</td>
                <td>{station.publish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="station-modal">
          <div className="station-modal-content">
            <button
              className="station-close-btn"
              onClick={() => setShowAddForm(false)}
            >
              ✖
            </button>
            <h2>Add New Station</h2>
            <form onSubmit={handleAddStation} className="station-form">
              <input
                type="text"
                placeholder="Station Name"
                value={newStation.name}
                onChange={(e) =>
                  setNewStation({ ...newStation, name: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Total Connectors"
                value={newStation.connectors}
                onChange={(e) =>
                  setNewStation({ ...newStation, connectors: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="City"
                value={newStation.city}
                onChange={(e) =>
                  setNewStation({ ...newStation, city: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Pincode"
                value={newStation.pincode}
                onChange={(e) =>
                  setNewStation({ ...newStation, pincode: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="State"
                value={newStation.state}
                onChange={(e) =>
                  setNewStation({ ...newStation, state: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Publish (Yes/No)"
                value={newStation.publish}
                onChange={(e) =>
                  setNewStation({ ...newStation, publish: e.target.value })
                }
                required
              />
              {/* Details */}
              <input
                type="text"
                placeholder="Mobile"
                value={newStation.details.mobile}
                onChange={(e) =>
                  setNewStation({
                    ...newStation,
                    details: { ...newStation.details, mobile: e.target.value },
                  })
                }
              />
              <input
                type="number"
                placeholder="Tank Capacity (L)"
                value={newStation.details.tank}
                onChange={(e) =>
                  setNewStation({
                    ...newStation,
                    details: { ...newStation.details, tank: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="Latitude"
                value={newStation.details.latitude}
                onChange={(e) =>
                  setNewStation({
                    ...newStation,
                    details: {
                      ...newStation.details,
                      latitude: e.target.value,
                    },
                  })
                }
              />
              <input
                type="text"
                placeholder="Longitude"
                value={newStation.details.longitude}
                onChange={(e) =>
                  setNewStation({
                    ...newStation,
                    details: {
                      ...newStation.details,
                      longitude: e.target.value,
                    },
                  })
                }
              />
              <input
                type="text"
                placeholder="Location"
                value={newStation.details.location}
                onChange={(e) =>
                  setNewStation({
                    ...newStation,
                    details: {
                      ...newStation.details,
                      location: e.target.value,
                    },
                  })
                }
              />
              <button type="submit">Add Station</button>
            </form>
          </div>
        </div>
      )}

      {/* Slide Panel */}
      <div className={`station-slide-panel ${selectedStation ? "open" : ""}`}>
        <button
          className="station-close-btn"
          onClick={() => setSelectedStation(null)}
        >
          ✖
        </button>
        {selectedStation && (
          <>
            <div className="station-panel-content two-column-layout">
              {/* LEFT */}
              <div className="station-details-left">
                <p className="station-address">
                  {selectedStation.details?.location}
                </p>
                <div className="station-map-container">
                  {selectedStation && selectedStation.details && (
                    <iframe
                      title="station-map"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://maps.google.com/maps?q=${selectedStation.details.latitude},${selectedStation.details.longitude}&z=15&output=embed`}
                    />
                  )}
                </div>
                <div className="station-info-cards">
                  <div className="station-card">
                    <p>Status</p>
                    <h4>{selectedStation.details?.status || "Unknown"}</h4>
                  </div>
                  <div className="station-card">
                    <p>No. of Phases</p>
                    <h4>1</h4>
                  </div>
                  <div className="station-card">
                    <p>Tank Capacity</p>
                    <h4>{selectedStation.details?.tank}L</h4>
                  </div>
                  <div className="station-card">
                    <p>Geolocation</p>
                    <h4>
                      {selectedStation.details?.latitude},{" "}
                      {selectedStation.details?.longitude}
                    </h4>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="station-details-right">
                <div className="station-tab-header">
                  {["Chargers", "Station Statistics", "Tokens"].map((tab) => (
                    <span
                      key={tab}
                      className={activeTab === tab ? "active-tab" : "inactive-tab"}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
                {activeTab === "Chargers" && (
                  <table className="station-overview-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Station ID</th>
                        <th>Serial Number</th>
                        <th>Status</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{selectedStation.name}</td>
                        <td>0912f698</td>
                        <td>SI-072025/03</td>
                        <td>Bus Stand</td>
                        <td>Online</td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {activeTab === "Station Statistics" && (
                  <div className="station-statistics">
                    <div className="station-date-range">
                      <input type="date" />
                    </div>
                    <div className="station-stats-grid">
                      <div className="station-card">
                        <p>Revenue (excl.GST)</p>
                        <h4>₹1000</h4>
                      </div>
                      <div className="station-card">
                        <p>Total Sessions</p>
                        <h4>02</h4>
                      </div>
                      <div className="station-card">
                        <p>Total Capacity</p>
                        <h4>1000L</h4>
                      </div>
                      <div className="station-card">
                        <p>Capacity Used</p>
                        <h4>589L</h4>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Tokens" && <h2>Not ready................</h2>}
              </div>
            </div>
          </>
        )}
        <button className="station-delete-btn" onClick={handleDeleteStation}>
          Delete Station
        </button>
      </div>
    </div>
  );
};

export default Station;
