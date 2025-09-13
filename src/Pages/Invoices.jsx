import React, { useState } from "react";
import {
  FiFilter,
  FiCalendar,
  FiSearch,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

const initialInvoices = [
  {
    id: "IONCS-20250905-GF8STN",
    date: "2025-09-05",
    customer: "Tapas Rath",
    sessionCost: 328.79,
    kWh: 16.39,
    platformFee: 16.45,
    settlement: 312.33,
    type: "Prepaid",
  },
  {
    id: "IONCS-20250905-FUQOOV",
    date: "2025-09-05",
    customer: "Siddharth",
    sessionCost: 284.86,
    kWh: 14.2,
    platformFee: 14.25,
    settlement: 270.61,
    type: "Prepaid",
  },
];

const Invoice = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterInvoices(value, selectedDate);
  };

  const handleRefresh = () => {
    setSearch("");
    setSelectedDate(null);
    setInvoices(initialInvoices);
  };

  const handleDownload = () => {
    const data = invoices.map((item) => ({
      InvoiceID: item.id,
      Date: item.date,
      Customer: item.customer,
      SessionCost: item.sessionCost,
      PlatformFee: item.platformFee,
      SettlementAmount: item.settlement,
      Type: item.type,
    }));

    const csv = [
      Object.keys(data[0]).join(","),
      ...data.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoices.csv";
    a.click();
  };

  const filterInvoices = (searchValue, date) => {
    let filtered = [...initialInvoices];

    if (searchValue) {
      filtered = filtered.filter((item) =>
        item.customer.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.id.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      filtered = filtered.filter((item) => item.date === formattedDate);
    }

    setInvoices(filtered);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterInvoices(search, date);
  };

  return (
    <div className="invoice-container">
             <h2>Invoice</h2>
      <div className="summary-header">
        <span>
          Pending Settlements:{" "}
          <strong>
            ₹
            {invoices
              .reduce((total, item) => total + item.settlement, 0)
              .toFixed(2)}
          </strong>
        </span>
        <span>
          Pending Payment: <strong>₹0.00</strong>
        </span>
      </div>

      <div className="action-bar">
        <button className="action-btn outline">
          <FiFilter size={16} />
          <span>Filters</span>
        </button>

        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          placeholderText="Select Date"
          className="datepicker-input"
        />

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
          <FiSearch className="search-icon" />
        </div>

        <button className="action-btn filled" onClick={handleRefresh}>
          <FiRefreshCw size={16} />
        </button>

        <button className="action-btn outline" onClick={handleDownload}>
          <FiDownload size={16} />
        </button>
      </div>
      <div className="invoice-table">
        <div className="table-header">
          <div>Invoice ID</div>
          <div>Customer</div>
          <div>Session Cost</div>
          <div>Platform Fee</div>
          <div>Settlement</div>
          <div>Type</div>
        </div>

        {invoices.map((item) => (
          <div className="table-row" key={item.id}>
            <div>
              <div className="invoice-id">{item.id}</div>
              <div className="invoice-date">{item.date}</div>
            </div>
            <div>{item.customer}</div>
            <div>
              ₹{item.sessionCost}
              <br />
              <small>{item.kWh} kWh</small>
            </div>
            <div>₹{item.platformFee}</div>
            <div>₹{item.settlement}</div>
            <div>{item.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoice;
