import React, { useState } from "react";
import { CornerUpLeft, ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPicker({ onClick }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [displayDate, setDisplayDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDay = (year, month) => new Date(year, month, 1).getDay();

  const handlePrev = () =>
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1)
    );
  const handleNext = () =>
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1)
    );
  const handleDateClick = (day) =>
    setSelectedDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth(), day)
    );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const daysInMonth = getDaysInMonth(
    displayDate.getFullYear(),
    displayDate.getMonth()
  );
  const firstDay =
    (getFirstDay(displayDate.getFullYear(), displayDate.getMonth()) + 6) % 7;

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarCells.push(day);

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const styles = {
    container: {
      maxWidth: "100%",
      width: "320px",
      backgroundColor: "#f1f4f8",
      borderRadius: "12px",
      padding: "16px",
      fontFamily: "sans-serif",
      boxShadow: "0 2px 8px rgba(255, 103, 103, 0.5)",
    },
    header: {
      fontSize: "18px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    inputBox: {
      width: "100%",
      padding: "8px",
      fontSize: "14px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginBottom: "10px",
    },
    navRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },
    navButton: {
      border: "1px solid #ccc",
      borderRadius: "6px",
      padding: "4px 10px",
      backgroundColor: "#fff",
      cursor: "pointer",
      fontWeight: "bold",
    },
    gridHeader: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      fontSize: "12px",
      fontWeight: "bold",
      marginBottom: "4px",
    },
    calendarGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "4px",
    },
    cell: {
      height: "36px",
      width: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      cursor: "pointer",
    },
    selectedCell: {
      backgroundColor: "#FF6767",
      color: "#fff",
    },
    emptyCell: {
      height: "36px",
    },
  };

  return (
    <div className="position-relative d-flex justify-content-center">
      <div style={styles.container}>
        <div style={styles.header}>
          <h3>Calendar</h3>
          <button
            onClick={() => onClick(false)}
            className="btn btn-sm btn-outline-danger"
            style={{
              background: "transparent",
              border: "none",
              color: "#FF6767",
              cursor: "pointer",
            }}
          >
            <CornerUpLeft />
          </button>
        </div>

        <input
          type="text"
          readOnly
          value={formattedDate}
          style={styles.inputBox}
        />

        <div style={styles.navRow}>
          <button onClick={handlePrev} style={styles.navButton}>
            <ChevronLeft />
          </button>
          <span>
            <strong>
              {monthNames[displayDate.getMonth()]} {displayDate.getFullYear()}
            </strong>
          </span>
          <button onClick={handleNext} style={styles.navButton}>
            <ChevronRight />
          </button>
        </div>

        <div style={styles.gridHeader}>
          {dayLabels.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>

        <div style={styles.calendarGrid}>
          {calendarCells.map((day, i) =>
            day === null ? (
              <div key={i} style={styles.emptyCell}></div>
            ) : (
              <div
                key={i}
                style={{
                  ...styles.cell,
                  ...(selectedDate.getDate() === day &&
                  selectedDate.getMonth() === displayDate.getMonth() &&
                  selectedDate.getFullYear() === displayDate.getFullYear()
                    ? styles.selectedCell
                    : {}),
                }}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
