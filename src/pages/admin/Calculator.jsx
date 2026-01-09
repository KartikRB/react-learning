import Header from "../../components/admin/Header";
import React, { useState, useEffect } from "react";

const Inquiries = () => {
  const [input, setInput] = useState("");

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "C", "0", ".", "+",
    "=", "Remove"
  ];

  const isOperator = (char) => {
    return ["+", "-", "*", "/"].includes(char);
  };

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      return;
    }

    if (value === "=") {
      try {
        if(input === ""){
            return;
        }
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
      return;
    }

    const lastChar = input.slice(-1);

    if (value === "Remove") {
        setInput(prev => prev.slice(0, -1));
        return;
    }

    if (isOperator(value) && isOperator(lastChar)) return;

    if (value === ".") {
      const lastNumber = input.split(/[\+\-\*\/]/).pop();
      if (lastNumber.includes(".")) return;
    }

    setInput(input + value);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
  
      if (!isNaN(key)) {
        handleClick(key);
      }
  
      if (["+", "-", "*", "/"].includes(key)) {
        handleClick(key);
      }
  
      if (key === "Enter") {
        handleClick("=");
      }
  
      if (key === "Backspace") {
        handleClick("Remove");
      }
  
      if (key === "Escape") {
        handleClick("C");
      }
  
      if (key === ".") {
        handleClick(".");
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);  

  return (
    <div>
      <Header title="Calculator" />

      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="card bg-dark p-3" style={{ width: "500px" }}>

            <input
              type="text"
              className="form-control mb-3 text-end fs-1"
              style={{ height: "100px" }}
              value={input || "0"}
              readOnly
            />

            <div className="row g-2">
              {buttons.map((btn, index) => (
                <div className={(btn === "=" || btn === "Remove") ? 'col-6' : 'col-3'} key={index}>
                  <button
                    className={`btn w-100 fs-2 ${
                      (btn === "C" || btn === "Remove")
                        ? "btn-danger"
                        : btn === "="
                        ? "btn-success"
                        : isOperator(btn)
                        ? "btn-warning"
                        : "btn-secondary"
                    }`}
                    onClick={() => handleClick(btn)}
                    style={{ height: "75px"}}
                  >
                    {btn}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
