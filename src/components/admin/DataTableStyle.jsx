const DataTableStyle = () => ({
  tableWrapper: {
    style: {
      overflow: "hidden",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
      border: "1px solid #dee2e6",
      backgroundColor: "#ffffff",
    },
  },

  headRow: {
    style: {
      backgroundColor: "#00d9ff30",
      minHeight: "56px",
    },
  },

  headCells: {
    style: {
      color: "#0b2e40",
      fontSize: "14px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      padding: "14px",
    },
  },

  rows: {
    style: {
      minHeight: "52px",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e9ecef",
      transition: "background-color 0.2s ease, transform 0.15s ease",
    },
    highlightOnHoverStyle: {
      backgroundColor: "#f8f9fa",
      transform: "scale(1.005)",
      cursor: "pointer",
    },
  },

  cells: {
    style: {
      padding: "14px",
      fontSize: "14px",
      color: "#212529",
    },
  },

  pagination: {
    style: {
      borderTop: "1px solid #dee2e6",
      padding: "12px",
    },
  },
});

export default DataTableStyle;