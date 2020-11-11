import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  // useeffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]); // now we run this everytime the list changes, instead of just once


  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
