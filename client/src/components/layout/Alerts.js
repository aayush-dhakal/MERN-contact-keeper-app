import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import AlertContext from "../../context/alert/AlertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert key={alert.id} variant={alert.type} className='mt-3'>
        <i className="fas fa-info-circle" /> {alert.msg}
      </Alert>
    ))
  );
};

export default Alerts;
