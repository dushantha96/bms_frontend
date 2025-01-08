import React, { useEffect, useState } from "react";

const AutoAlert = ({ title, message, type, duration = 2000, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); 
      onClose(); 
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration, onClose]);

  if (!show) return null; 

  return (
    <div style={alertStyles} className={`bg-${type} text-white`}>
        <div>
        <strong>{title}</strong>
        <p>{message}</p>
        </div>
    </div>
  );
};

const alertStyles = {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
    padding: "15px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "500px"
  };
  

export default AutoAlert;